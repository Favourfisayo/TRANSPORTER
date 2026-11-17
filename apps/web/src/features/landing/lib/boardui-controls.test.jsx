import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { DatePicker } from "@THE-TRANSPORTER/ui/components/base/date-picker/date-picker";
import { NumberField } from "@THE-TRANSPORTER/ui/components/base/number-field/number-field";

test("booking date picker exposes its purpose and empty state", () => {
  const html = renderToStaticMarkup(<DatePicker aria-label="Flight date" value={null} />);
  expect(html).toContain('aria-label="Flight date: Select date"');
});

test("passenger stepper exposes named increment and decrement controls", () => {
  const html = renderToStaticMarkup(
    <NumberField label="Passengers" layout="stepper" defaultValue={2} minValue={1} />,
  );
  expect(html).toContain('aria-label="Fewer passengers"');
  expect(html).toContain('aria-label="More passengers"');
});
