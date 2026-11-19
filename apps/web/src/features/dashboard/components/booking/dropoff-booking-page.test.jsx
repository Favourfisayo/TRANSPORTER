import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { DropoffBookingPage } from "./dropoff-booking-page";

test("drop-off booking exposes its first step and summary", () => {
  const html = renderToStaticMarkup(<DropoffBookingPage />);
  expect(html).toContain("Book an airport drop-off");
  expect(html).toContain('aria-label="Booking progress"');
  expect(html).toContain('aria-current="step"');
  expect(html).toContain("Street address");
  expect(html).toContain("Your transfer");
  expect(html).toMatch(/>Estimate<\/span>\s*<span[^>]*>—<\/span>/);
  expect(html).not.toContain("27,500");
  expect(html).toContain("Book a drop-off");
  expect(html).not.toContain("Example estimate; pricing is not connected yet.");
  expect(html).toContain("Continue to flight");
  expect(html).toContain("Flight number");
  expect(html).toContain("Scheduled landing");
  expect(html).toContain("Attach PDF or photo");
  expect(html).toContain("Who’s travelling?");
  expect(html).toContain("Phone on the day");
  expect(html).toContain("Passengers and luggage");
  expect(html).toContain("Meet &amp; greet in arrivals");
  expect(html).toContain("Note for your driver");
});
