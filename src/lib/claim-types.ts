export type ClaimEntryMode = "upload" | "manual";

export type FlightStatus = "Delayed" | "Cancelled" | "Denied boarding" | "Unknown";

export type ClaimFlightData = {
  passenger: string;
  flight: string;
  routeFrom: string;
  routeTo: string;
  date: string;
  status: FlightStatus;
  delay: string;
};

export type ClaimUploadMeta = {
  fileName: string;
  fileSize: string;
  previewUrl: string | null;
  mimeType: string;
};

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
  };
}
