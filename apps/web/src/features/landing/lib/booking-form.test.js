import { describe, expect, test } from "bun:test";

import { validateBookingFields } from "./booking-form";

describe("booking form validation", () => {
  test("requires a non-blank location, flight date, and flight time", () => {
    expect(validateBookingFields({ location: "  ", date: "", time: "" })).toEqual({
      location: "Enter a location in Lagos.",
      date: "Choose a flight date.",
      time: "Choose a flight time.",
    });
  });

  test("accepts completed local fields", () => {
    expect(
      validateBookingFields({ location: "Lekki Phase 1", date: "2027-02-12", time: "14:30" }),
    ).toEqual({});
  });
});
