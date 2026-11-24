import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { RadioGroup } from "@THE-TRANSPORTER/ui/components/base/radio/radio";
import { RadioCard } from "@THE-TRANSPORTER/ui/components/base/radio/radio-card";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { FigmaIcon } from "@/components/figma-icon";
import {
  calculateDemoEstimate,
  formatCancellationDeadline,
  formatFlightSummary,
  rewardPoints,
  vehicles,
  type BookingExtras,
  type Vehicle,
} from "../../lib/dropoff-booking";
import type { Party } from "./travellers-step";
import { PriceBreakdown } from "./price-breakdown";

export function PayStep({
  tripType,
  flight,
  terminal,
  area,
  address,
  traveller,
  party,
  vehicle,
  extras,
  onEditFlight,
  onChangeVehicle,
  business = false,
  paymentMethod,
  onPaymentMethodChange,
}: {
  tripType: "pickup" | "dropoff";
  flight: { flight: string; date: string; time: string };
  terminal: string;
  area: string;
  address: string;
  traveller: string;
  party: Party;
  vehicle: Vehicle;
  extras: BookingExtras;
  onEditFlight: () => void;
  onChangeVehicle: () => void;
  business?: boolean;
  paymentMethod: "invoice" | "now";
  onPaymentMethodChange: (value: "invoice" | "now") => void;
}) {
  const points = rewardPoints(calculateDemoEstimate(extras, vehicle, business));
  const deadline = formatCancellationDeadline(flight.date, flight.time);
  return (
    <div className="space-y-4">
      <section className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-4 sm:p-6">
        <h2 className="text-dashboard-section-title tracking-[-0.17px]">
          Check your transfer
        </h2>
        <div className="bg-account-select-surface mt-5 flex items-start gap-3 rounded-2xl p-3.5">
          <span className="bg-dashboard-icon-surface text-accent-600 grid size-10 shrink-0 place-items-center rounded-xl">
            <FigmaIcon name="booking-review-flight" className="size-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-body-semibold wrap-break-word">
              {tripType === "pickup" ? `${flight.flight.trim().toUpperCase()} · pickup ${formatFlightSummary("", flight.date, flight.time)}` : formatFlightSummary(flight.flight, flight.date, flight.time)}
            </p>
            <p className="text-dashboard-route text-text-secondary mt-0.5 wrap-break-word">
              {tripType === "pickup" ? `${terminal} → ${address}${area ? `, ${area}` : ""}` : `${address}${area ? `, ${area}` : ""} → ${terminal}`}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onEditFlight}
            className="text-dashboard-label text-accent-600 h-7 shrink-0 rounded-full px-2.5"
          >
            Edit
          </Button>
        </div>
        <dl className="text-dashboard-route mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <dt className="text-text-secondary">Vehicle</dt>
            <dd className="flex flex-wrap items-center gap-1">
              <span className="font-medium">{vehicles[vehicle].name}</span>
              <Button
                variant="ghost"
                onClick={onChangeVehicle}
                className="text-dashboard-label text-accent-600 h-7 rounded-full px-2.5"
              >
                Change
              </Button>
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">Party</dt>
            <dd className="font-medium">
              {party.passengers} pax · {party.largeBags} large ·{" "}
              {party.cabinBags} cabin
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">Traveller</dt>
            <dd className="font-medium wrap-break-word">
              {traveller}
              {party.passengers > 1 ? ` +${party.passengers - 1}` : ""}
            </dd>
          </div>
        </dl>
      </section>
      <section className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-4 sm:p-6">
        <h2 className="text-dashboard-section-title tracking-[-0.17px]">
          Price
        </h2>
        <div className="mt-5">
          <PriceBreakdown vehicle={vehicle} extras={extras} area={area} business={business} />
        </div>
        <p className="text-dashboard-detail text-text-secondary mt-4 flex items-center gap-2">
          <FigmaIcon name="booking-review-rewards" className="size-4" />
          You’ll earn {points.toLocaleString("en-NG")} points.
        </p>
        {business && <div className="mt-5">
          <h3 className="text-dashboard-label text-text-primary">Payment</h3>
          <RadioGroup aria-label="Payment method" value={paymentMethod} onChange={(value) => onPaymentMethodChange(value as "invoice" | "now")} className="bg-account-select-surface mt-2 grid grid-cols-1 gap-1 rounded-2xl p-1 min-[400px]:grid-cols-2">
            {([
              ["invoice", "Company invoice", "business-invoice"],
              ["now", "Pay now", "business-pay-now"],
            ] as const).map(([value, label, icon]) => <RadioCard key={value} value={value} className="text-text-primary data-[selected]:bg-brand-primary data-[selected]:text-brand-on h-11 min-w-0 flex-1 justify-center gap-2 rounded-xl border-0 bg-transparent px-2 py-0">
              <FigmaIcon name={icon} className="size-4" /><span className="text-dashboard-route font-medium">{label}</span>
            </RadioCard>)}
          </RadioGroup>
          <p className="text-dashboard-detail text-text-secondary mt-2">{paymentMethod === "invoice" ? "Added to Kora Energy Ltd’s monthly statement. ₦1,763,925 of credit left this month." : "Pay for this transfer when you confirm."}</p>
        </div>}
        {deadline && (
          <p className={cx("text-dashboard-detail text-text-secondary flex items-start gap-2", business ? "mt-5" : "mt-12")}>
            <FigmaIcon name="booking-review-policy" className="mt-0.5 size-4" />
            <span>
              Free cancellation until {deadline}. You’ll get your ride phrase as
              soon as you confirm.
            </span>
          </p>
        )}
      </section>
    </div>
  );
}
