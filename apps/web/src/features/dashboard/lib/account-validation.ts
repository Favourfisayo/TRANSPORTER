import { z } from "zod";

const newPassword = z.object({
  password: z.string().min(8, "Use at least 8 characters."),
  confirmation: z.string(),
}).refine(({ password, confirmation }) => password === confirmation, {
  error: "The new passwords don’t match.",
  path: ["confirmation"],
});

export function validateNewPassword(password: string, confirmation: string): string {
  const result = newPassword.safeParse({ password, confirmation });
  return result.success ? "" : result.error.issues[0]?.message ?? "";
}
