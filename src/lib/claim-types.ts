export type ClaimEntryMode = "upload" | "manual";

export type FlightStatus = "Delayed" | "Cancelled" | "Denied boarding" | "Unknown";

export type DelayDurationOption = "more_than_3" | "less_than_3" | "";

export type CancellationNoticeOption = "14 days or more" | "Less than 14 days" | "";

export type DisruptionReasonOption =
  | "technical"
  | "weather"
  | "strike"
  | "crew"
  | "airport"
  | "other"
  | "";

export type ClaimPassenger = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ClaimStatus =
  | "received"
  | "needs_documents"
  | "with_airline"
  | "following_up"
  | "payment_processing"
  | "awaiting_fee"
  | "paid"
  | "closed_ntd"
  | "paused"
  | "closed_declined"
  /** @deprecated legacy values still present on older claims */
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
  /** User-selected delay band for Odoo (`more_than_3` / `less_than_3`). */
  delayDuration?: DelayDurationOption;
  /** Whether the itinerary included a connecting flight (delay cases). */
  hadConnectingFlight?: boolean | null;
  /** Cancellation notice window (cancellation cases). */
  cancellationNotice?: CancellationNoticeOption;
  /** Short disruption reason code for Odoo `x_studio_reason_detail`. */
  disruptionReason?: DisruptionReasonOption;
  /** PNR / booking reference when extracted from the boarding pass. */
  bookingReference?: string | null;
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
  contactPhone?: string | null;
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
  received:
    "We've received your claim and our team is reviewing it. We'll update you here as soon as there's news.",
  needs_documents:
    "We need a few more documents to move your claim forward. Please check your email for details, or message us on +351 928370420. We're happy to help!",
  with_airline:
    "Your claim has been submitted to the airline. We're waiting for their response and will update you as soon as we hear back.",
  following_up:
    "The airline has responded, and we're following up on your behalf. We'll keep you informed of any developments.",
  payment_processing:
    "Great news — the airline has approved your compensation! We're now processing your payment and will update you shortly.",
  awaiting_fee:
    "Congratulations, your claim was successful! Please complete payment of our service fee so we can close your case.",
  paid: "Your payment has been completed! Thank you for trusting us with your claim. If you have any questions, we're always here to help.",
  closed_ntd:
    "Unfortunately, we're unable to pursue your claim further and your case has been closed. If you have questions, please don't hesitate to contact us.",
  paused:
    "Your case has been paused as we haven't received a response from you. Please get in touch on +351 928370420 if you'd like to reactivate it.",
  closed_declined:
    "Unfortunately, the airline has declined your claim and we're unable to take it further. Your case has been closed — contact us if you'd like to discuss the outcome.",
  // Legacy fallbacks
  submitted:
    "We've received your claim and our team is reviewing it. We'll update you here as soon as there's news.",
  under_review:
    "We've received your claim and our team is reviewing it. We'll update you here as soon as there's news.",
  airline_contacted:
    "Your claim has been submitted to the airline. We're waiting for their response and will update you as soon as we hear back.",
  compensated:
    "Your payment has been completed! Thank you for trusting us with your claim. If you have any questions, we're always here to help.",
  closed:
    "Unfortunately, the airline has declined your claim and we're unable to take it further. Your case has been closed — contact us if you'd like to discuss the outcome.",
};

export type ClaimSubmitResponse = {
  trackingNumber: string;
  status: ClaimStatus;
};

export const CLAIM_STATUS_LABELS: Record<ClaimStatus, string> = {
  received: "Received",
  needs_documents: "Documents needed",
  with_airline: "With the airline",
  following_up: "Following up",
  payment_processing: "Payment processing",
  awaiting_fee: "Service fee",
  paid: "Paid",
  closed_ntd: "Closed",
  paused: "Paused",
  closed_declined: "Closed",
  submitted: "Received",
  under_review: "Received",
  airline_contacted: "With the airline",
  compensated: "Paid",
  closed: "Closed",
};

/** Happy-path timeline shown on the track page (branch outcomes render as the current step). */
export const CLAIM_STATUS_ORDER: ClaimStatus[] = [
  "received",
  "needs_documents",
  "with_airline",
  "following_up",
  "payment_processing",
  "awaiting_fee",
  "paid",
];

export function normalizeClaimStatus(status: string | null | undefined): ClaimStatus {
  switch (status) {
    case "received":
    case "needs_documents":
    case "with_airline":
    case "following_up":
    case "payment_processing":
    case "awaiting_fee":
    case "paid":
    case "closed_ntd":
    case "paused":
    case "closed_declined":
      return status;
    case "submitted":
    case "under_review":
      return "received";
    case "airline_contacted":
      return "with_airline";
    case "compensated":
      return "paid";
    case "closed":
      return "closed_declined";
    default:
      return "received";
  }
}

export const EMPTY_FLIGHT: ClaimFlightData = {
  passenger: "",
  flight: "",
  routeFrom: "",
  routeTo: "",
  date: "",
  status: "Unknown",
  delay: "",
  delayDuration: "",
  hadConnectingFlight: null,
  cancellationNotice: "",
  disruptionReason: "",
};

export const EMPTY_PASSENGER: ClaimPassenger = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
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

function normalizeDelayDuration(value: unknown): DelayDurationOption {
  if (value === "more_than_3" || value === "less_than_3") return value;
  return "";
}

function normalizeCancellationNotice(value: unknown): CancellationNoticeOption {
  if (value === "14 days or more" || value === "Less than 14 days") return value;
  return "";
}

function normalizeDisruptionReason(value: unknown): DisruptionReasonOption {
  switch (value) {
    case "technical":
    case "weather":
    case "strike":
    case "crew":
    case "airport":
    case "other":
      return value;
    default:
      return "";
  }
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
    delayDuration: normalizeDelayDuration(partial?.delayDuration),
    hadConnectingFlight:
      typeof partial?.hadConnectingFlight === "boolean" ? partial.hadConnectingFlight : null,
    cancellationNotice: normalizeCancellationNotice(partial?.cancellationNotice),
    disruptionReason: normalizeDisruptionReason(partial?.disruptionReason),
    bookingReference: partial?.bookingReference?.trim() || null,
    compensationEstimate: normalizeCompensationEstimate(partial?.compensationEstimate),
  };
}
