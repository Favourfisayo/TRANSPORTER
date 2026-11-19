import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { VehicleStep } from "./vehicle-step";

const extras = { meetAndGreet: true, childSeats: 0, extraStop: true };

test("vehicle options show demo totals and the selected vehicle", () => {
  const html = renderToStaticMarkup(<VehicleStep party={{ passengers: 2, largeBags: 2, cabinBags: 0 }} extras={extras} selected="suv" onSelect={() => {}} onContinue={() => {}} />);
  for (const name of ["Sedan", "SUV", "Bus"]) expect(html).toContain(name);
  for (const amount of ["41,000", "56,000", "76,000"]) expect(html).toContain(amount);
  expect(html).toMatch(/<input(?=[^>]*value="suv")(?=[^>]*checked)[^>]*>/);
});

test("vehicles that cannot fit the party are disabled with an explanation", () => {
  const html = renderToStaticMarkup(<VehicleStep party={{ passengers: 15, largeBags: 0, cabinBags: 0 }} extras={extras} selected={null} onSelect={() => {}} onContinue={() => {}} />);
  for (const id of ["sedan", "suv", "bus"]) expect(html).toMatch(new RegExp(`<input(?=[^>]*value="${id}")(?=[^>]*disabled)[^>]*>`));
  expect(html).toContain("If none fits, return to Travellers to adjust it.");
});
