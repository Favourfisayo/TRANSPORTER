"use client";

import { DashboardShell } from "../dashboard-shell";
import { BookingOptions } from "./booking-options";
import { UpcomingTrip } from "./upcoming-trip";
import { RecentTrips } from "./recent-trips";

export function DashboardHome() {
  return (
    <DashboardShell active="home">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 sm:px-10 lg:pt-10">
        <div>
          <p className="font-landing text-dashboard-body text-text-secondary">Good evening,</p>
          <h1 className="font-landing text-dashboard-greeting">Womo</h1>
        </div>
        <BookingOptions />
        <UpcomingTrip />
        <RecentTrips />
      </main>
    </DashboardShell>
  );
}
