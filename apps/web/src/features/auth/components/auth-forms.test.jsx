import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AccountForm, ResetPasswordForm } from "./auth-forms";

test("account creation has labeled name, email and password fields", () => {
  const html = renderToStaticMarkup(<AccountForm />);
  expect(html).toContain("Full name");
  expect(html).toContain('type="email"');
  expect(html).toContain('autoComplete="new-password"');
  expect(html).toContain("Create account");
});

test("password reset asks for an email without a password", () => {
  const html = renderToStaticMarkup(<ResetPasswordForm />);
  expect(html).toContain('type="email"');
  expect(html).not.toContain('type="password"');
  expect(html).toContain("Send reset link");
});
