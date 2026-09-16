import { sendPendingResumeClaimEmails } from "@/lib/claim-resume-email";

export const dynamic = "force-dynamic";

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

export async function GET(request: Request) {
  if (!isAuthorizedCron(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.compensall.com";
    const result = await sendPendingResumeClaimEmails(siteUrl);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    console.error("Claim resume email cron failed:", error);
    return Response.json({ error: "Could not send pending resume emails." }, { status: 500 });
  }
}
