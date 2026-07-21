import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import {
  CMS_BLOG_TAG,
  deleteCmsBlogPost,
  isDeleteEvent,
  isUpsertEvent,
  upsertCmsBlogPost,
} from "@/lib/cms-blog-store";
import type { CmsWebhookPayload } from "@/lib/cms-webhook/types";
import { verifyCmsWebhookAuth } from "@/lib/cms-webhook/verify-auth";

const WEBHOOK_SECRET = process.env.CMS_WEBHOOK_SECRET;

function revalidateBlogPaths(slug: string): void {
  revalidateTag(CMS_BLOG_TAG, "max");

  for (const locale of routing.locales) {
    revalidatePath(`/${locale}/blog`, "page");
    revalidatePath(`/${locale}/blog/${slug}`, "page");
  }
}

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET?.trim()) {
    return NextResponse.json(
      { error: "CMS_WEBHOOK_SECRET not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const headerSecret = req.headers.get("x-webhook-secret");
  const signature = req.headers.get("x-cms-signature");

  if (!verifyCmsWebhookAuth(rawBody, WEBHOOK_SECRET, headerSecret, signature)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: CmsWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as CmsWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const configuredSiteId = process.env.CMS_SITE_ID?.trim();
  if (configuredSiteId && payload.siteId && payload.siteId !== configuredSiteId) {
    return NextResponse.json({ error: "Site ID mismatch" }, { status: 403 });
  }

  const event = payload.event ?? req.headers.get("x-cms-event") ?? "";
  const slug = payload.post?.slug;

  if (!slug) {
    return NextResponse.json({ error: "Missing post slug" }, { status: 400 });
  }

  try {
    if (isDeleteEvent(event)) {
      await deleteCmsBlogPost(slug);
    } else if (isUpsertEvent(event)) {
      await upsertCmsBlogPost(payload);
    } else {
      return NextResponse.json({ error: `Unsupported event: ${event}` }, { status: 400 });
    }

    revalidateBlogPaths(slug);

    return NextResponse.json({ ok: true, event, slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handler failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
