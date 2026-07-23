export type ClaimEntryMode = "upload" | "manual";

export type FlightStatus = "Delayed" | "Cancelled" | "Denied boarding" | "Unknown";

export type ClaimStatus =
  | "submitted"
  | "under_review"
  | "airline_contacted"
  | "compensated"
  | "closed";

export type ClaimVerificationResult = "pass" | "needs_review" | "fail";

export type ClaimVerification = {
  result: ClaimVerificationResult;
  summary: string;
  mismatches: Array<{
    field: string;
    documentValue: string | null;
    confirmedValue: string;
  }>;
};

export type CompensationEstimate = {
  distanceKm: number;
  amount: number;
  amountLabel: string;
  currency: "GBP" | "EUR";
  regulation: "UK261" | "EC261";
  band: "short" | "medium" | "long";
  fromIata: string;
  toIata: string;
};

export type ClaimFlightData = {
  passenger: string;
  flight: string;
  routeFrom: string;
  routeTo: string;
  date: string;
  status: FlightStatus;
  delay: string;
  /** Distance-based UK261 / EC261 estimate; stored for tracking + emails. */
  compensationEstimate?: CompensationEstimate | null;
};

export type ClaimDocumentSignature = {
  documentId: string;
  signedAt: string;
  token: string;
  signatureHash: string;
};

export type ClaimAuditTrail = {
  ipAddress: string | null;
  userAgent: string | null;
};

export type ClaimUploadMeta = {
  fileName: string;
  fileSize: string;
  previewUrl: string | null;
  mimeType: string;
  previewKind: "image" | "pdf" | "file" | "none";
};

export type ClaimRecord = {
  trackingNumber: string;
  status: ClaimStatus;
  entryMode: ClaimEntryMode;
  flight: ClaimFlightData;
  signedName: string;
  contactEmail: string;
  acceptedDocuments: string[];
  documentSignatures: ClaimDocumentSignature[];
  auditTrail: ClaimAuditTrail;
  verification: ClaimVerification;
  createdAt: string;
  updatedAt?: string | null;
  statusUpdatedAt?: string | null;
  odooLeadId?: number | null;
  odooLeadName?: string | null;
  odooTicketId?: number | null;
  odooTicketName?: string | null;
  locale?: string | null;
};

export const CLAIM_STATUS_MESSAGES: Record<ClaimStatus, string> = {
  submitted: "Your claim is in our queue. We will review it shortly.",
  under_review: "Our team is reviewing your claim and preparing the next steps.",
  airline_contacted: "We’ve contacted the airline and are waiting for their response.",
  compensated: "Compensation has been accepted. We’ll keep you updated on payment.",
  closed: "This claim is closed. Contact us if you need anything else.",
};

export type ClaimSubmitResponse = {
  trackingNumber: string;
  status: ClaimStatus;
};

export const CLAIM_STATUS_LABELS: Record<ClaimStatus, string> = {
  submitted: "Submitted",
  under_review: "Under review",
  airline_contacted: "Airline contacted",
  compensated: "Compensated",
  closed: "Closed",
};

export const CLAIM_STATUS_ORDER: ClaimStatus[] = [
  "submitted",
  "under_review",
  "airline_contacted",
  "compensated",
  "closed",
];

export const EMPTY_FLIGHT: ClaimFlightData = {
  passenger: "",
  flight: "",
  routeFrom: "",
  routeTo: "",
  date: "",
  status: "Unknown",
  delay: "",
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function normalizeCompensationEstimate(
  value: ClaimFlightData["compensationEstimate"],
): CompensationEstimate | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const amount = Number(value.amount);
  const distanceKm = Number(value.distanceKm);
  if (!Number.isFinite(amount) || !Number.isFinite(distanceKm)) {
    return null;
  }

  if (value.currency !== "GBP" && value.currency !== "EUR") {
    return null;
  }
  if (value.regulation !== "UK261" && value.regulation !== "EC261") {
    return null;
  }
  if (value.band !== "short" && value.band !== "medium" && value.band !== "long") {
    return null;
  }

  const amountLabel = typeof value.amountLabel === "string" ? value.amountLabel.trim() : "";
  const fromIata = typeof value.fromIata === "string" ? value.fromIata.trim().toUpperCase() : "";
  const toIata = typeof value.toIata === "string" ? value.toIata.trim().toUpperCase() : "";
  if (!amountLabel || fromIata.length !== 3 || toIata.length !== 3) {
    return null;
  }

  return {
    distanceKm: Math.round(distanceKm),
    amount,
    amountLabel,
    currency: value.currency,
    regulation: value.regulation,
    band: value.band,
    fromIata,
    toIata,
  };
}

export function normalizeFlightData(
  partial: Partial<ClaimFlightData> | null | undefined,
): ClaimFlightData {
  return {
    passenger: partial?.passenger?.trim() || "",
    flight: partial?.flight?.trim() || "",
    routeFrom: partial?.routeFrom?.trim() || "",
    routeTo: partial?.routeTo?.trim() || "",
    date: partial?.date?.trim() || "",
    status: partial?.status ?? "Unknown",
    delay: partial?.delay?.trim() || "",
    compensationEstimate: normalizeCompensationEstimate(partial?.compensationEstimate),
  };
}
