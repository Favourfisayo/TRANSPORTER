import { calculateDemoEstimate, demoPrices, vehicles, type BookingExtras, type Vehicle } from "../../lib/dropoff-booking";
import { NumberPopIn } from "./number-pop-in";

export function PriceBreakdown({ vehicle, extras, area }: { vehicle: Vehicle; extras: BookingExtras; area?: string }) {
  const total = calculateDemoEstimate(extras, vehicle);
  return (
    <dl className="text-dashboard-route grid gap-2.5 [&_dd]:font-[family-name:var(--font-geist-mono)]">
      <div className="flex justify-between gap-3"><dt>{vehicles[vehicle].name} fare{area ? ` · ${area}` : ""}</dt><dd><span aria-hidden="true" className="font-sans text-[0.9em]">₦</span><NumberPopIn value={vehicles[vehicle].fare} label="Vehicle fare" announce={false} /></dd></div>
      <div className="flex justify-between gap-3"><dt>Airport access &amp; parking</dt><dd><span className="font-sans text-[0.9em]">₦</span>{demoPrices.airport.toLocaleString("en-NG")}</dd></div>
      {extras.meetAndGreet && <div className="flex justify-between gap-3"><dt>Meet &amp; greet in arrivals</dt><dd><span className="font-sans text-[0.9em]">₦</span>{demoPrices.meetAndGreet.toLocaleString("en-NG")}</dd></div>}
      {extras.childSeats > 0 && <div className="flex justify-between gap-3"><dt>Child seats × {extras.childSeats}</dt><dd><span aria-hidden="true" className="font-sans text-[0.9em]">₦</span><NumberPopIn value={extras.childSeats * demoPrices.childSeat} label="Child seats total" announce={false} /></dd></div>}
      {extras.extraStop && <div className="flex justify-between gap-3"><dt>Extra stop on the way</dt><dd><span className="font-sans text-[0.9em]">₦</span>{demoPrices.extraStop.toLocaleString("en-NG")}</dd></div>}
      <div className="border-separator-border flex justify-between gap-3 border-t border-dashed pt-3"><dt className="text-body-semibold">Total</dt><dd className="text-[18px] leading-7 font-semibold"><span aria-hidden="true" className="font-sans text-[0.9em]">₦</span><NumberPopIn value={total} label="Total" announce={false} /></dd></div>
    </dl>
  );
}
