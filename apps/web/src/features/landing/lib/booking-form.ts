import { z } from "zod";

const bookingFields = z.object({
  location: z.string().trim().min(1, "Enter a location in Lagos."),
  date: z.iso.date("Choose a flight date."),
  time: z.iso.time("Choose a flight time."),
});

export function validateBookingFields(fields: { location: string; date: string; time: string }) {
  const result = bookingFields.safeParse(fields);
  if (result.success) return {};
  return Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])) as Partial<Record<keyof typeof fields, string>>;
}
