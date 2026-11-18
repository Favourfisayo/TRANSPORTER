import { describe, expect, test } from "bun:test";
import { filterTrips, tripCounts, trips } from "./trips";

describe("trip filters", () => {
  test("counts match the trip categories", () => {
    const fixture = [
      { ...trips[0], category: "upcoming" },
      { ...trips[0], category: "past" },
      { ...trips[0], category: "cancelled" },
    ];
    expect(tripCounts(fixture)).toEqual({ upcoming: 1, past: 1, cancelled: 1 });
  });

  test("searches flight and reference without case or surrounding spaces", () => {
    expect(filterTrips(trips, "upcoming", " ba 75 ").map((trip) => trip.flight)).toEqual(["BA 75"]);
    expect(filterTrips(trips, "upcoming", " tr-1002 ").map((trip) => trip.flight)).toEqual([
      "EK 784",
    ]);
    expect(filterTrips(trips, "past", "missing")).toEqual([]);
  });
});
