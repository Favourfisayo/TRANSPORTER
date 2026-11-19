import { expect, test } from "bun:test";
import { calculateDemoEstimate, formatCancellationDeadline, formatFlightSummary, rewardPoints, validateDropoff, validateFlight, validateTraveller, showEstimate, vehicleFits } from "./dropoff-booking";

test("demo reward and cancellation examples follow the Figma values", () => {
  expect(rewardPoints(56000)).toBe(560);
  expect(rewardPoints(37500)).toBe(375);
  expect(formatCancellationDeadline("2026-11-19", "14:05:00")).toBe("Wed 18 Nov · 14:05");
  expect(formatCancellationDeadline("2027-01-01", "00:10")).toBe("Thu 31 Dec · 00:10");
  expect(formatCancellationDeadline("", "14:05")).toBe("");
  expect(formatCancellationDeadline("2026-02-30", "14:05")).toBe("");
});

test("vehicle totals include airport access and each selected extra once", () => {
  const extras = { meetAndGreet: true, childSeats: 0, extraStop: true };
  expect(calculateDemoEstimate(extras, "sedan")).toBe(41000);
  expect(calculateDemoEstimate(extras, "suv")).toBe(56000);
  expect(calculateDemoEstimate(extras, "bus")).toBe(76000);
  expect(calculateDemoEstimate({ ...extras, childSeats: 2 }, "suv")).toBe(66000);
});

test("vehicle capacity uses passengers and large bags, not cabin bags", () => {
  expect(vehicleFits("sedan", { passengers: 2, largeBags: 3, cabinBags: 99 })).toBe(true);
  expect(vehicleFits("sedan", { passengers: 3, largeBags: 3, cabinBags: 0 })).toBe(false);
  expect(vehicleFits("suv", { passengers: 3, largeBags: 6, cabinBags: 0 })).toBe(false);
  expect(vehicleFits("bus", { passengers: 14, largeBags: 14, cabinBags: 0 })).toBe(true);
  expect(vehicleFits("bus", { passengers: 15, largeBags: 0, cabinBags: 0 })).toBe(false);
  expect(vehicleFits("suv", { passengers: NaN, largeBags: 0, cabinBags: 0 })).toBe(false);
});

test("demo estimate adds only selected extras and safely handles seat counts", () => {
  const none = { meetAndGreet: false, childSeats: 0, extraStop: false };
  expect(calculateDemoEstimate(none)).toBe(27500);
  expect(calculateDemoEstimate({ ...none, meetAndGreet: true })).toBe(35000);
  expect(calculateDemoEstimate({ ...none, childSeats: 2 })).toBe(37500);
  expect(calculateDemoEstimate({ ...none, extraStop: true })).toBe(33500);
  expect(calculateDemoEstimate({ meetAndGreet: true, childSeats: 0, extraStop: true })).toBe(41000);
  expect(calculateDemoEstimate({ ...none, childSeats: NaN })).toBe(27500);
  expect(calculateDemoEstimate({ ...none, childSeats: -1 })).toBe(27500);
});

test("drop-off requires a non-blank area and street address", () => {
  expect(validateDropoff(" ", "")).toEqual({ area: true, address: true });
  expect(validateDropoff("Victoria Island", " 14 Admiralty Way ")).toEqual({ area: false, address: false });
});

test("flight summary reflects entered details without inventing missing values", () => {
  expect(formatFlightSummary(" ek 783 ", "2026-11-19", "14:05:00")).toBe("EK 783 · Thu 19 Nov · 14:05");
  expect(formatFlightSummary("", "", "")).toBe("");
  expect(formatFlightSummary("BA 75", "", "")).toBe("BA 75");
});

test("flight details require a flight number, date and time", () => {
  expect(validateFlight(" ", null, null)).toEqual({ flight: true, date: true, time: true });
  expect(validateFlight("BA 75", "2026-12-01", "14:00")).toEqual({ flight: false, date: false, time: false });
});

test("estimate appears only from the flight step when all flight details exist", () => {
  const complete = { flight: "BA 75", date: "2026-12-01", time: "14:00" };
  expect(showEstimate(0, complete)).toBe(false);
  expect(showEstimate(1, { ...complete, flight: " " })).toBe(false);
  expect(showEstimate(1, { ...complete, date: "" })).toBe(false);
  expect(showEstimate(1, { ...complete, time: "" })).toBe(false);
  expect(showEstimate(1, complete)).toBe(true);
  expect(showEstimate(2, complete)).toBe(true);
});

test("traveller contact requires a name and phone", () => {
  expect(validateTraveller(" ", "")).toEqual({ name: true, phone: true });
  expect(validateTraveller("Ada", "+234 800 000 0000")).toEqual({ name: false, phone: false });
});


test("flight validation rejects malformed dates and times", () => {
  expect(validateFlight("BA 75", "2026-02-30", "25:00")).toEqual({ flight: false, date: true, time: true });
  expect(validateFlight("BA 75", { year: 2026, month: 12, day: 1 }, { hour: 14, minute: 5 })).toEqual({ flight: false, date: false, time: false });
});
