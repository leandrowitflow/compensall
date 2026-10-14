/**
 * Vercel rejects claim uploads above about 4.5 MB with an HTML page.
 * Parsing that page as JSON produced the raw "Unexpected token" message.
 * Stay under 4 MB so the form can explain the problem instead.
 */
export const MAX_CLAIM_FILE_BYTES = 4 * 1024 * 1024;
export const MAX_CLAIM_REQUEST_BYTES = 4 * 1024 * 1024;

export type ClaimFailureCode =
  | "payload_too_large"
  | "file_too_large"
  | "unsupported_type"
  | "duplicate_claim"
  | "name_required"
  | "email_invalid"
  | "phone_invalid"
  | "signature_invalid"
  | "submit_failed";

export class ClaimSubmitError extends Error {
  readonly code: ClaimFailureCode;
  readonly names: string[];

  constructor(code: ClaimFailureCode, names: string[] = []) {
    super(code);
    this.name = "ClaimSubmitError";
    this.code = code;
    this.names = names;
  }
}

export function isClaimSubmitError(error: unknown): error is ClaimSubmitError {
  return error instanceof ClaimSubmitError || (error instanceof Error && error.name === "ClaimSubmitError");
}

type SizedFile = { name: string; size: number };

export function oversizedClaimFiles(files: SizedFile[]): SizedFile[] {
  const present = files.filter((file) => file.size > 0 && file.name.trim());
  const tooBig = present.filter((file) => file.size > MAX_CLAIM_FILE_BYTES);
  if (tooBig.length > 0) return tooBig;
  const total = present.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_CLAIM_REQUEST_BYTES) {
    return [...present].sort((left, right) => right.size - left.size);
  }
  return [];
}

export function claimFilesTotalBytes(files: SizedFile[]): number {
  return files.reduce((sum, file) => sum + (file.size > 0 ? file.size : 0), 0);
}

export async function readJsonSafe(response: Response): Promise<{
  status: number;
  ok: boolean;
  data: Record<string, unknown>;
  raw: string;
}> {
  const raw = await response.text();
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return { status: response.status, ok: response.ok, data: parsed as Record<string, unknown>, raw };
    }
  } catch {
    // HTML or plain text, often a platform size error.
  }
  return { status: response.status, ok: false, data: {}, raw };
}

export function classifyClaimFailure(status: number, body: string, apiError?: string): ClaimFailureCode {
  const error = (apiError ?? "").trim();
  if (error === "duplicate_claim") return "duplicate_claim";
  if (error === "file_too_large" || /too large/i.test(error)) return "file_too_large";
  if (error === "unsupported_type" || /unsupported/i.test(error)) return "unsupported_type";
  if (/email/i.test(error)) return "email_invalid";
  if (/phone/i.test(error)) return "phone_invalid";
  if (/signature/i.test(error)) return "signature_invalid";
  if (/signed name|name is required/i.test(error)) return "name_required";
  if (
    status === 413 ||
    /request entity too large|payload too large|function_payload_too_large/i.test(body) ||
    /request entity too large|payload too large/i.test(error)
  ) {
    return "payload_too_large";
  }
  return "submit_failed";
}
