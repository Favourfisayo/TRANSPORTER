import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { LoginForm } from "./login-form";

test("login form exposes labeled credential fields and account type", () => {
  const html = renderToStaticMarkup(<LoginForm />);
  expect(html).toContain('aria-label="Account type"');
  expect(html).toContain('type="email"');
  expect(html).toContain('type="password"');
  expect(html).toContain("Forgot password?");
  expect(html).toContain("Log in");
});
