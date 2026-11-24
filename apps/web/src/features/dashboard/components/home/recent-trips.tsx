"use client";

import Link from "next/link";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { cardClass, Status, TripIcon } from "./home-trip-parts";
import { DashboardIcon } from "../dashboard-icon";

const trips = [
  {
    title: "Airport drop-off",
    date: "Thu 5 Nov · 04:20",
    origin: "Lekki Phase 1",
    destination: "GAT",
    flight: "P4 7120",
    vehicle: "Sedan",
    fare: "₦50,800",
    status: "Completed",
    icon: "dropoff",
  },
  {
    title: "Airport pickup",
    date: "Wed 28 Oct · 18:30",
    origin: "International",
    destination: "Ikeja GRA",
    flight: "KL 587",
    vehicle: "Sedan",
    fare: "₦27,500",
    status: "Cancelled",
    icon: "pickup",
  },
  {
    title: "Day Ride",
    date: "Thu 15 Oct · 13:30 · 2 legs",
    origin: "From Dolphin Estate",
    destination: undefined,
    flight: "QR 1405",
    vehicle: "SUV",
    fare: "₦125,100",
    status: "Completed",
    icon: "day-ride",
  },
] as const;

export function RecentTrips() {
  return (
    <section aria-labelledby="trips-title" className="mt-10">
      <div className="flex items-center justify-between">
        <h2 id="trips-title" className="font-landing text-dashboard-label text-text-secondary">
          Recent trips
        </h2>
        <Link
          href={{ pathname: "/dashboard/trips" }}
          className="text-dashboard-label text-accent-600 rounded hover:underline focus-visible:outline-2 focus-visible:outline-border-focus-ring"
        >
          See all trips
        </Link>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {trips.map(({ title, date, origin, destination, flight, vehicle, fare, status, icon }) => (
          <article key={flight} className={cx(cardClass, "p-5")}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <TripIcon icon={icon} />
                <div className="min-w-0">
                  <h3 className="text-dashboard-card-title">{title}</h3>
                  <p className="text-dashboard-detail text-text-secondary">{date}</p>
                </div>
              </div>
              <Status status={status} />
            </div>
            <p className="text-dashboard-route text-landing-label mt-4 flex flex-wrap items-center gap-2">
              {origin}
              {destination && (
                <>
                  <span className="sr-only">to</span>
                  <DashboardIcon name="route-arrow" />
                  {destination}
                </>
              )}
            </p>
            <div className="border-border-button-default text-dashboard-detail mt-3 flex items-center justify-between gap-2 border-t pt-3">
              <span className="text-text-secondary">
                <span className="font-mono">{flight}</span> · {vehicle}
              </span>
              <span className="text-dashboard-label font-mono"><span className="font-sans text-[0.9em]">₦</span>{fare.slice(1)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
