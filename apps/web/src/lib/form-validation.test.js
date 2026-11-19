import { expect, test } from "bun:test";
import { formSchemas } from "./form-validation";

test("form schemas reject blank required fields and invalid emails", () => {
  expect(formSchemas.login.safeParse({ email: "bad", password: "pass" }).success).toBe(false);
  expect(formSchemas.account.safeParse({ name: "  ", email: "ada@example.com", password: "pass" }).success).toBe(false);
  expect(formSchemas.profile.safeParse({ name: "Ada", email: "ada@example.com", phone: "+234 800" }).success).toBe(true);
  expect(formSchemas.place.safeParse({ name: "Home", address: "  " }).success).toBe(false);
});
