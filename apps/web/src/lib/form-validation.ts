import type { FormEvent } from "react";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { z } from "zod";

const required = z.string().trim().min(1, "Complete all required fields.");
const email = z.email("Enter a valid email address.");

export const formSchemas = {
  login: z.object({ email, password: required }),
  account: z.object({ name: required, email, password: required }),
  reset: z.object({ email }),
  profile: z.object({ name: required, email, phone: required }),
  place: z.object({ name: required.max(80), address: required.max(200) }),
};

export function submitDemoForm(event: FormEvent<HTMLFormElement>, schema: z.ZodType, message: string) {
  event.preventDefault();
  const result = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
  if (!result.success) {
    toast.error(result.error.issues[0]?.message ?? "Check the form and try again.");
    return;
  }
  toast.info(message);
}
