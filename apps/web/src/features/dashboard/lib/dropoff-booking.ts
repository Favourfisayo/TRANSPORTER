import { z } from "zod";

const requiredText = z.string().trim().min(1);
const flightDate = z.union([z.iso.date(), z.object({ year: z.number(), month: z.number(), day: z.number() })]);
const flightTime = z.union([z.iso.time(), z.object({ hour: z.number(), minute: z.number() })]);

export function validateDropoff(area: string, address: string) {
  return { area: !requiredText.safeParse(area).success, address: !requiredText.safeParse(address).success };
}

export function validateFlight(flight: string, date: unknown, time: unknown) {
  return { flight: !requiredText.safeParse(flight).success, date: !flightDate.safeParse(date).success, time: !flightTime.safeParse(time).success };
}

export function validateTraveller(name: string, phone: string) {
  return { name: !requiredText.safeParse(name).success, phone: !requiredText.safeParse(phone).success };
}

export type BookingExtras = { meetAndGreet: boolean; childSeats: number; extraStop: boolean };
export const terminals = { mmia: "MMIA International Terminal", mma2: "MMA2 Domestic Terminal", gat: "GAT Domestic Terminal" } as const;
export type Terminal = keyof typeof terminals;

export const demoPrices = { base: 27500, airport: 2500, meetAndGreet: 7500, childSeat: 5000, extraStop: 6000 };

export const vehicles = {
  sedan: { name: "Sedan", description: "Toyota Camry, Lexus ES or similar", passengers: 2, largeBags: 3, fare: 25000, image: "/assets/dashboard-icons/vehicle-sedan.png" },
  suv: { name: "SUV", description: "Honda CR-V, Benz ML350 or similar", passengers: 3, largeBags: 5, fare: 40000, image: "/assets/dashboard-icons/vehicle-suv.png" },
  bus: { name: "Bus", description: "Toyota Hiace, Mercedes-Benz Sprinter or similar", passengers: 14, largeBags: 14, fare: 60000, image: "/assets/dashboard-icons/vehicle-bus.png" },
} as const;

export type Vehicle = keyof typeof vehicles;

export function vehicleFits(vehicle: Vehicle, party: { passengers: number; largeBags: number; cabinBags: number }) {
  return z.object({ passengers: z.number().min(1).max(vehicles[vehicle].passengers), largeBags: z.number().min(0).max(vehicles[vehicle].largeBags) }).safeParse(party).success;
}

export function calculateDemoEstimate(extras: BookingExtras, vehicle: Vehicle = "sedan") {
  const seats = Number.isFinite(extras.childSeats) ? Math.max(0, Math.floor(extras.childSeats)) : 0;
  return vehicles[vehicle].fare + demoPrices.airport + (extras.meetAndGreet ? demoPrices.meetAndGreet : 0) + seats * demoPrices.childSeat + (extras.extraStop ? demoPrices.extraStop : 0);
}

export function rewardPoints(total: number) {
  return Math.floor(total / 100);
}

export function formatCancellationDeadline(date: string, time: string) {
  if (!z.iso.date().safeParse(date).success || !z.iso.time().safeParse(time).success) return "";
  const deadline = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(deadline.getTime()) || deadline.toISOString().slice(0, 10) !== date) return "";
  deadline.setUTCDate(deadline.getUTCDate() - 1);
  const formattedDate = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(deadline);
  return `${formattedDate} · ${time.slice(0, 5)}`;
}

export function showEstimate(step: number, flight: { flight: string; date: string; time: string }) {
  const errors = validateFlight(flight.flight, flight.date, flight.time);
  return step > 0 && !errors.flight && !errors.date && !errors.time;
}

export function formatFlightSummary(flight: string, date: string, time: string) {
  const formattedDate = date ? new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)) : "";
  return [flight.trim().toUpperCase(), formattedDate, time.slice(0, 5)].filter(Boolean).join(" · ");
}
