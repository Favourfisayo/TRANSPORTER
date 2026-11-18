import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { TripResults, TripsPage } from "./trips-page";

test("trips page exposes navigation, filtering and example bookings", () => {
  const html = renderToStaticMarkup(<TripsPage />);
  expect(html).toContain('aria-label="Trip status"');
  expect(html).toContain('aria-label="Search reference or flight"');
  expect(html).toContain("Airport pickup");
  expect(html).toContain("November 2026");
  expect(html).toContain('href="/dashboard"');
  expect(html).toContain('href="/dashboard/trips"');
});

test("empty cancelled trips use the Figma ticket and copy", () => {
  const html = renderToStaticMarkup(<TripResults category="cancelled" query="" />);
  expect(html).toContain("No cancelled trips");
  expect(html).toContain("Cancelled bookings and their refunds show up here.");
  expect(html).toContain("/assets/dashboard-icons/empty.svg");
  expect(html).toContain("py-12");
});
