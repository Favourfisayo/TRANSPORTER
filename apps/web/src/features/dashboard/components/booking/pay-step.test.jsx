import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { PayStep } from "./pay-step";

test("review shows entered details and the selected vehicle's itemized demo total", () => {
  const html = renderToStaticMarkup(<PayStep flight={{ flight: "BA 75", date: "2026-12-01", time: "14:05" }} terminal="MMA2 Domestic Terminal" area="Ikeja" address="1 Airport Road" traveller="Ada Test" party={{ passengers: 2, largeBags: 1, cabinBags: 1 }} vehicle="suv" extras={{ meetAndGreet: true, childSeats: 0, extraStop: true }} onEditFlight={() => {}} onChangeVehicle={() => {}} />);
  for (const value of ["BA 75", "MMA2 Domestic Terminal", "1 Airport Road", "Ikeja", "Ada Test", "SUV", "2 pax", "1 large", "1 cabin", "56,000", "40,000", "2,500", "7,500", "6,000"]) expect(html).toContain(value);
  expect(html).toContain("Edit");
  expect(html).toContain("Change");
  expect(html).toContain("You’ll earn 560 points.");
  expect(html).toContain("Free cancellation until Mon 30 Nov · 14:05. You’ll get your ride phrase as soon as you confirm.");
  expect(html).not.toContain("Child seats ×");
});

test("review reflects a changed vehicle and extras without retaining the previous total", () => {
  const html = renderToStaticMarkup(<PayStep flight={{ flight: "BA 75", date: "2026-12-01", time: "14:05" }} terminal="GAT Domestic Terminal" area="Lekki" address="2 New Road" traveller="Ada Test" party={{ passengers: 1, largeBags: 1, cabinBags: 0 }} vehicle="sedan" extras={{ meetAndGreet: false, childSeats: 2, extraStop: false }} onEditFlight={() => {}} onChangeVehicle={() => {}} />);
  expect(html).toContain("GAT Domestic Terminal");
  expect(html).toContain("Sedan");
  expect(html).toContain("Child seats × 2");
  expect(html).toContain("37,500");
  expect(html).toContain("You’ll earn 375 points.");
  expect(html).not.toContain("56,000");
  expect(html).not.toContain("Meet &amp; greet in arrivals");
});
