export type Step2Field =
  | "passenger"
  | "flight"
  | "routeFrom"
  | "routeTo"
  | "date"
  | "connecting"
  | "connectingAirport"
  | "connectingFlight"
  | "disruptionType"
  | "delay"
  | "notice"
  | "reason"
  | "ineligible";

export type Step2Issue = {
  field: Step2Field;
  message: string;
};

export const STEP2_FIELD_ELEMENT: Record<Exclude<Step2Field, "ineligible">, string> = {
  passenger: "edit-passenger",
  flight: "edit-flight",
  routeFrom: "edit-from",
  routeTo: "edit-to",
  date: "edit-date",
  connecting: "had-connecting-flight",
  connectingAirport: "connecting-airport-0",
  connectingFlight: "connecting-flight-0",
  disruptionType: "disruption-type",
  delay: "delay-duration",
  notice: "cancellation-notice",
  reason: "disruption-reason",
};

export type ContactIssue = {
  field: string;
  message: string;
};
