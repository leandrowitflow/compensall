import crypto from "crypto";

export function verifyCmsWebhookAuth(
  rawBody: string,
  webhookSecret: string,
  headerSecret: string | null,
  signature: string | null,
): boolean {
  const secretOk = Boolean(headerSecret && headerSecret === webhookSecret);
  const sigOk = verifyCmsSignature(rawBody, webhookSecret, signature);
  return secretOk || sigOk;
}

function verifyCmsSignature(
  rawBody: string,
  webhookSecret: string,
  signature: string | null,
): boolean {
  if (!signature) {
    return false;
  }

  const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(signature, "utf8"));
  } catch {
    return false;
  }
}
