import { revalidatePath, revalidateTag } from "next/cache";
import { routing } from "@/i18n/routing";
import { CMS_BLOG_TAG } from "@/lib/cms-blog-store";
import { publishDailyDisruptionDigest } from "@/lib/disruptions/publish-daily";

export const dynamic = "force-dynamic";
export const maxDuration = 180;

function isAuthorizedCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  const authorization = request.headers.get("authorization");
  if (secret && authorization === `Bearer ${secret}`) {
    return true;
  }
  return (
    request.headers.get("x-vercel-cron") === "1" ||
    Boolean(request.headers.get("x-vercel-cron-schedule"))
  );
}

function revalidateDisruptionPaths(slug: string): void {
  revalidateTag(CMS_BLOG_TAG, "max");

  for (const locale of routing.locales) {
    revalidatePath(`/${locale}/disruptions`, "page");
    revalidatePath(`/${locale}/disruptions/${slug}`, "page");
    revalidatePath(`/${locale}/blog`, "page");
  }
}

export async function GET(request: Request) {
  if (!isAuthorizedCron(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await publishDailyDisruptionDigest();
    if (result.status === "published") {
      revalidateDisruptionPaths(result.slug);
    }
    return Response.json({ ok: result.status === "published", ...result });
  } catch (error) {
    console.error("[disruption-digest] cron failed:", error instanceof Error ? error.message : error);
    return Response.json({ error: "Could not check flight disruptions." }, { status: 500 });
  }
}
