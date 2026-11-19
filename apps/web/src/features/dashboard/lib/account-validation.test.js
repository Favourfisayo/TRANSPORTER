import { expect, test } from "bun:test";
import { validateNewPassword } from "./account-validation";

test("password confirmation requires a long enough matching password", () => {
  expect(validateNewPassword("short", "short")).toBe("Use at least 8 characters.");
  expect(validateNewPassword("long-enough", "different")).toBe("The new passwords don’t match.");
  expect(validateNewPassword("long-enough", "long-enough")).toBe("");
});
