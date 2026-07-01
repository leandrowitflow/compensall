import type { ClaimFlightData } from "@/lib/claim-types";
import { FIELD_INPUT, FIELD_LABEL } from "@/components/claim/claim-ui";

type FlightDetailsFormProps = {
  flight: ClaimFlightData;
  onChange: (flight: ClaimFlightData) => void;
  idPrefix?: string;
};

export default function FlightDetailsForm({ flight, onChange, idPrefix = "flight" }: FlightDetailsFormProps) {
  const update = (patch: Partial<ClaimFlightData>) => onChange({ ...flight, ...patch });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="sm:col-span-2">
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-passenger`}>
          Passenger
        </label>
        <input
          id={`${idPrefix}-passenger`}
          className={FIELD_INPUT}
          value={flight.passenger}
          onChange={(e) => update({ passenger: e.target.value })}
          placeholder="Full name as on boarding pass"
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-flight`}>
          Flight number
        </label>
        <input
          id={`${idPrefix}-flight`}
          className={FIELD_INPUT}
          value={flight.flight}
          onChange={(e) => update({ flight: e.target.value })}
          placeholder="e.g. BA1234"
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-date`}>
          Date
        </label>
        <input
          id={`${idPrefix}-date`}
          className={FIELD_INPUT}
          value={flight.date}
          onChange={(e) => update({ date: e.target.value })}
          placeholder="e.g. 14 May 2026"
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-from`}>
          Departure
        </label>
        <input
          id={`${idPrefix}-from`}
          className={FIELD_INPUT}
          value={flight.routeFrom}
          onChange={(e) => update({ routeFrom: e.target.value })}
          placeholder="e.g. London (LHR)"
        />
      </div>
      <div>
        <label className={FIELD_LABEL} htmlFor={`${idPrefix}-to`}>
          Arrival
        </label>
        <input
          id={`${idPrefix}-to`}
          className={FIELD_INPUT}
          value={flight.routeTo}
          onChange={(e) => update({ routeTo: e.target.value })}
          placeholder="e.g. Rome (FCO)"
        />
      </div>
    </div>
  );
}
