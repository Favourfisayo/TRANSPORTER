import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { NumberPopIn } from "./number-pop-in";

test("animated estimate exposes one complete formatted value to assistive technology", () => {
  const html = renderToStaticMarkup(<NumberPopIn value={41000} />);
  expect(html).toContain('aria-live="polite"');
  expect(html).toContain("Estimate: ₦41,000");
  expect(html).toContain('aria-hidden="true"');
});
