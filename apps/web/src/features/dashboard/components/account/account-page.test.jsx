import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AccountPage } from "./account-page";

test("account page exposes its navigation, settings and labelled controls", () => {
  const html = renderToStaticMarkup(<AccountPage />);
  for (const section of ["Profile", "Account type", "Appearance", "Saved places", "Notifications", "Security", "App"]) {
    expect(html).toContain(`aria-label="${section}"`);
  }
  expect(html).toContain('href="/dashboard/account"');
  expect(html).toContain('aria-label="SMS"');
  for (const name of ["SMS", "WhatsApp", "Email"]) {
    expect(html).toMatch(new RegExp(`<input(?=[^>]*aria-label="${name}")(?=[^>]*checked)[^>]*>`));
  }
  expect(html).toMatch(/<input(?=[^>]*aria-label="Offers")(?![^>]*checked)[^>]*>/);
  expect(html).toContain("Changes aren’t saved or applied to notifications yet.");
  expect(html).toContain('aria-label="Remove Home"');
  expect(html).toContain("Save changes");
});
