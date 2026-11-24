export type TripCategory = "upcoming" | "past" | "cancelled";
export type Trip = {
  category: TripCategory;
  reference: string;
  title: string;
  date: string;
  month: string;
  origin: string;
  destination?: string;
  flight: string;
  vehicle: string;
  fare: string;
  status: string;
};

// shortcut: example trips only, replace with the signed-in customer's bookings when the API is ready.
export const trips: Trip[] = [
  {
    category: "upcoming",
    reference: "TR-1001",
    title: "Airport pickup",
    date: "Thu 19 Nov · 14:05",
    month: "November 2026",
    origin: "MMIA International Terminal",
    destination: "Maryland",
    flight: "EK 783",
    vehicle: "SUV",
    fare: "₦56,000",
    status: "Confirmed",
  },
  {
    category: "upcoming",
    reference: "TR-1002",
    title: "Airport drop-off",
    date: "Thu 19 Nov · 11:10",
    month: "November 2026",
    origin: "Victoria Island",
    destination: "MMIA International Terminal",
    flight: "EA 1406",
    vehicle: "Sedan",
    fare: "₦44,500",
    status: "Confirmed",
  },
  {
    category: "past",
    reference: "TR-1003",
    title: "Airport drop-off",
    date: "Thu 5 Nov · 04:20",
    month: "November 2026",
    origin: "Lekki Phase 1",
    destination: "GAT",
    flight: "P4 7120",
    vehicle: "Sedan",
    fare: "₦50,800",
    status: "Completed",
  },
  {
    category: "past",
    reference: "TR-1004",
    title: "Day Ride",
    date: "Thu 15 Oct · 13:30 · 2 legs",
    month: "October 2026",
    origin: "From Dolphin Estate",
    flight: "QR 1405",
    vehicle: "SUV",
    fare: "₦125,100",
    status: "Completed",
  },
];

// shortcut: two illustrative bookings only; replace with booking data when the API is available.
export const tripDetails = {
  "TR-1001": {
    type: "pickup", phrase: ["HARMATTAN", "EMBER", "CROSS", "TITAN"],
    origin: "MMIA International Terminal", destination: "1415 Adetokunbo Ademola Street, Maryland",
    flightDescription: "Emirates", flightRoute: "From Dubai (DXB) · scheduled 14:05", pickupTime: "14:05",
    traveller: "Womo Justin · +234 802 555 0147", party: "2 passengers · 2 large · 1 cabin bags",
    vehicle: "SUV", extras: "Meet & greet · Extra stop", points: 560,
  },
  "TR-1002": {
    type: "dropoff", phrase: ["TOPAZ", "WILLOW", "BAT", "COIN"],
    origin: "1415 Adetokunbo Ademola Street, Victoria Island", destination: "MMIA International Terminal",
    flightDescription: "Enugu Air", flightRoute: "To Enugu · scheduled 15:20", pickupTime: "11:10",
    traveller: "Adaeze Okafor · +234 802 555 0147", party: "1 passenger · 1 large · 1 cabin bag",
    vehicle: "Sedan · Toyota Camry, Lexus ES or similar", extras: "—", points: 445,
  },
} as const;

export function getTripDetails(reference: string) {
  if (!Object.hasOwn(tripDetails, reference)) return undefined;
  const trip = trips.find((item) => item.reference === reference);
  return trip ? { trip, details: tripDetails[reference as keyof typeof tripDetails] } : undefined;
}

export function filterTrips(items: Trip[], category: TripCategory, query: string) {
  const search = query.trim().toLocaleLowerCase();
  return items.filter(
    (trip) =>
      trip.category === category &&
      (!search ||
        trip.flight.toLocaleLowerCase().includes(search) ||
        trip.reference.toLocaleLowerCase().includes(search)),
  );
}

export function tripCounts(items: Trip[]): Record<TripCategory, number> {
  return {
    upcoming: items.filter((trip) => trip.category === "upcoming").length,
    past: items.filter((trip) => trip.category === "past").length,
    cancelled: items.filter((trip) => trip.category === "cancelled").length,
  };
}
