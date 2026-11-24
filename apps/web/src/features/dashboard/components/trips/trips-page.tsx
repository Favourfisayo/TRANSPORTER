"use client";

import { useState } from "react";
import Link from "next/link";
import { Chip } from "@THE-TRANSPORTER/ui/components/base/badges/chip";
import { SearchField } from "@THE-TRANSPORTER/ui/components/base/search-field/search-field";
import { Tab, TabList, TabPanel, Tabs } from "@THE-TRANSPORTER/ui/components/base/tabs/tabs";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { filterTrips, getTripDetails, tripCounts, trips, type Trip, type TripCategory } from "../../lib/trips";
import { DashboardShell } from "../dashboard-shell";
import { DashboardIcon, DashboardSearchIcon } from "../dashboard-icon";

const categories: { id: TripCategory; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "cancelled", label: "Cancelled" },
];

function TripCard({ trip }: { trip: Trip }) {
  const icon =
    trip.title === "Airport pickup"
      ? "pickup"
      : trip.title === "Airport drop-off"
        ? "dropoff"
        : "day-ride";
  const chipClass =
    trip.category === "cancelled"
      ? "bg-dashboard-danger-surface text-text-error-primary"
      : trip.category === "past"
        ? "bg-dashboard-success-surface text-dashboard-success-text"
        : "bg-dashboard-icon-surface text-accent-600";
  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="bg-dashboard-icon-surface text-brand-primary grid size-10 shrink-0 place-items-center rounded-2xl">
            <DashboardIcon name={icon} />
          </span>
          <div className="min-w-0">
            <h3 className="text-dashboard-card-title">{trip.title}</h3>
            <p className="text-dashboard-detail text-text-secondary">{trip.date}</p>
          </div>
        </div>
        <Chip variant="caption" className={cx("gap-1.5 rounded-full px-2.5", chipClass)}>
          <span className="size-1.5 rounded-full bg-current" />
          {trip.status}
        </Chip>
      </div>
      <p className="text-dashboard-route text-landing-label mt-4 flex flex-wrap items-center gap-2">
        <span>{trip.origin}</span>
        {trip.destination && (
          <>
            <span className="sr-only">to</span>
            <DashboardIcon name="route-arrow" />
            <span>{trip.destination}</span>
          </>
        )}
      </p>
      <div className="border-border-button-default text-dashboard-detail mt-3 flex items-center justify-between gap-2 border-t pt-3">
        <span className="text-text-secondary">
          <span className="font-mono">{trip.flight}</span> · {trip.vehicle}
        </span>
        <span className="text-dashboard-label font-mono"><span className="font-sans text-[0.9em]">₦</span>{trip.fare.slice(1)}</span>
      </div>
    </>
  );
  const className = "bg-background-primary-default shadow-dashboard-card block w-full rounded-3xl p-5 text-start transition-colors duration-150 hover:bg-background-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus-ring motion-reduce:transition-none";
  return getTripDetails(trip.reference) ? <Link href={{ pathname: `/dashboard/trips/${encodeURIComponent(trip.reference)}` }} className={className}>{content}</Link> : <button type="button" onClick={() => toast.info("Trip details are coming soon.")} className={className}>{content}</button>;
}

export function TripResults({ category, query }: { category: TripCategory; query: string }) {
  const results = filterTrips(trips, category, query);
  if (!results.length) {
    const title = query.trim()
      ? "No matching trips"
      : category === "cancelled"
        ? "No cancelled trips"
        : category === "past"
          ? "No past trips"
          : "No upcoming trips";
    const description = query.trim()
      ? "Try a different booking reference or flight."
      : category === "cancelled"
        ? "Cancelled bookings and their refunds show up here."
        : "Your trips will show up here.";
    return (
      <div className="font-landing bg-background-primary-default shadow-dashboard-card flex flex-col items-center rounded-[28px] px-6 py-12 text-center">
        <span className="bg-landing-track text-brand-primary grid size-14 place-items-center rounded-2xl">
          <DashboardIcon name="empty" />
        </span>
        <h2 className="text-dashboard-empty-title mt-4">{title}</h2>
        <p className="text-body-regular text-text-secondary mt-1">{description}</p>
      </div>
    );
  }
  const months = [...new Set(results.map((trip) => trip.month))];
  return (
    <div className="flex flex-col gap-6">
      {months.map((month) => (
        <section key={month} aria-label={month}>
          <h2 className="font-landing text-dashboard-label text-text-secondary mb-3">{month}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {results
              .filter((trip) => trip.month === month)
              .map((trip) => (
                <TripCard key={trip.reference} trip={trip} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function TripsPage() {
  const [category, setCategory] = useState<TripCategory>("upcoming");
  const [query, setQuery] = useState("");
  const counts = tripCounts(trips);
  return (
    <DashboardShell active="trips">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 sm:px-10 lg:pt-10">
        <h1 className="font-landing text-dashboard-page-title">My trips</h1>
        <p className="font-landing text-dashboard-body text-text-secondary mt-1.5">
          Every transfer you’ve booked, with receipts and ride phrases.
        </p>
        <DirectionProvider locale="en-NG">
          <Tabs
            selectedKey={category}
            onSelectionChange={(key) => setCategory(key as TripCategory)}
            className="mt-8 gap-6"
          >
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:max-w-105">
                <TabList
                  aria-label="Trip status"
                  hideIndicator
                  className="font-landing bg-landing-track border-dashboard-tab-border gap-1 rounded-2xl border p-1"
                >
                  {categories.map(({ id, label }) => (
                    <Tab
                      id={id}
                      key={id}
                      className={({ isSelected }) =>
                        cx(
                          "h-11 min-w-0 justify-center rounded-xl px-1 sm:px-2.5 [&>span]:text-body-medium",
                          isSelected ? "flex-[134.672_1_0%]" : "flex-[114.672_1_0%]",
                          isSelected && "bg-brand-primary shadow-dashboard-card [&>span]:text-brand-on",
                        )
                      }
                    >
                      {label} · {counts[id]}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <SearchField
                aria-label="Search reference or flight"
                placeholder="Search ref or flight"
                value={query}
                onChange={setQuery}
                shape="rounded"
                icon={DashboardSearchIcon}
                className="sm:max-w-72"
                fieldClassName="font-landing h-12 rounded-xl border border-border-button-default bg-account-select-surface [&_input]:text-dashboard-body"
              />
            </div>
            {categories.map(({ id }) => (
              <TabPanel id={id} key={id}>
                <TripResults category={id} query={query} />
              </TabPanel>
            ))}
          </Tabs>
        </DirectionProvider>
      </main>
    </DashboardShell>
  );
}
