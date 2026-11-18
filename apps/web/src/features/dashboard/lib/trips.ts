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
    date: "Thu 19 Nov · 17:50",
    month: "November 2026",
    origin: "International",
    destination: "Lekki Phase 1",
    flight: "BA 75",
    vehicle: "SUV",
    fare: "₦75,000",
    status: "Driver assigned",
  },
  {
    category: "upcoming",
    reference: "TR-1002",
    title: "Airport drop-off",
    date: "Thu 26 Nov · 12:30",
    month: "November 2026",
    origin: "Ikoyi",
    destination: "International",
    flight: "EK 784",
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
