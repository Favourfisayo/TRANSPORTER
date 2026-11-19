import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { TravellersStep } from "./travellers-step";

const extras = { meetAndGreet: false, childSeats: 0, extraStop: false };

function renderParty(party) {
  return renderToStaticMarkup(<TravellersStep hidden={false} name="" onNameChange={() => {}} party={party} extras={extras} onPartyChange={() => {}} onExtrasChange={() => {}} onContinue={() => {}} />);
}

test("fit badges follow the same passenger and large-bag limits as vehicle selection", () => {
  const both = renderParty({ passengers: 1, largeBags: 2, cabinBags: 1 });
  expect(both).toContain("Sedan fits</span>");
  expect(both).toContain("SUV fits</span>");

  const suvOnly = renderParty({ passengers: 3, largeBags: 2, cabinBags: 0 });
  expect(suvOnly).not.toContain("Sedan fits</span>");
  expect(suvOnly).toContain("SUV fits</span>");

  const neither = renderParty({ passengers: 4, largeBags: 0, cabinBags: 0 });
  expect(neither).not.toContain("Sedan fits</span>");
  expect(neither).not.toContain("SUV fits</span>");
  expect(neither).toContain("Neither sedan nor SUV fits your party.");
});
