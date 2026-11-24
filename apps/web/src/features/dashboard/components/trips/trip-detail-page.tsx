"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { FigmaIcon } from "@/components/figma-icon";
import { DashboardShell } from "../dashboard-shell";
import { BookingProgress } from "../booking/booking-progress";
import type { getTripDetails } from "../../lib/trips";

type Booking = NonNullable<ReturnType<typeof getTripDetails>>;
const card = "bg-background-primary-default shadow-dashboard-card rounded-[28px] p-4 sm:p-6";
const statuses = ["Booked", "Assigned", "En route", "Arrived", "Done"];

export function TripDetailPage({ trip, details }: Booking) {
  const [showPhrase, setShowPhrase] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const pickup = details.type === "pickup";

  async function copyPhrase() {
    try {
      await navigator.clipboard.writeText(details.phrase.join(" "));
      toast.success("Ride phrase copied.");
    } catch {
      toast.error("Could not copy your ride phrase.");
    }
  }

  return (
    <DashboardShell active="trips">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 pb-16 sm:px-10 lg:pt-11">
        <Link
          href={{ pathname: "/dashboard/trips" }}
          className="text-dashboard-label text-text-secondary inline-flex items-center gap-1.5 rounded-md focus-visible:outline-2 focus-visible:outline-border-focus-ring"
        >
          <FigmaIcon name="trip-detail-back" className="size-4" /> My trips
        </Link>
        {showConfirmation && (
          <div
            role="status"
            className="bg-trip-confirmation-surface text-trip-confirmation-text mt-4 flex items-start gap-3 rounded-3xl p-4"
          >
            <FigmaIcon name="trip-detail-confirmed" className="mt-0.5 size-5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-dashboard-card-title">You’re booked.</p>
              <p className="text-dashboard-route mt-0.5 wrap-anywhere opacity-80">
                Confirmation sent to ada@demo.thetransporter.co and by SMS. You earned {details.points} points.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              aria-label="Dismiss confirmation"
              className="grid size-8 shrink-0 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-border-focus-ring"
            >
              <FigmaIcon name="trip-detail-close" className="size-4" />
            </button>
          </div>
        )}
        <header className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-dashboard-detail text-text-secondary font-(family-name:--font-geist-mono)">
              {trip.reference}
            </p>
            <h1 className="text-trip-detail-title text-text-primary mt-1">{trip.title}</h1>
            <p className="text-dashboard-body text-text-secondary mt-1">Thursday 19 November</p>
          </div>
          <span className="bg-dashboard-icon-surface text-accent-600 text-dashboard-label inline-flex items-center gap-1.5 rounded-full px-3 py-1">
            <span className="size-1.5 rounded-full bg-current" />
            {trip.status}
          </span>
        </header>
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1.44fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <section
              className="from-brand-primary-deep to-brand-primary text-brand-on rounded-[28px] bg-linear-[83deg] p-4 sm:p-6"
              aria-labelledby="ride-phrase-title"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <h2
                  id="ride-phrase-title"
                  className="text-trip-phrase-label text-brand-on/60 inline-flex items-center gap-2 font-(family-name:--font-geist-mono) uppercase"
                >
                  <FigmaIcon name="trip-detail-shield" className="text-trip-phrase-icon size-4" />{" "}
                  Your ride phrase
                </h2>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPhrase(!showPhrase)}
                    aria-pressed={showPhrase}
                    className="text-dashboard-label text-brand-on h-9 rounded-full bg-transparent px-3 shadow-none hover:bg-transparent hover:text-brand-on active:bg-transparent [&>span]:gap-1.5 [&>span]:px-0"
                  >
                    <span className="inline-flex items-center gap-1">
                      <FigmaIcon
                        name={showPhrase ? "trip-detail-hide" : "trip-detail-reveal"}
                        className="size-4"
                      />
                      <span className="text-brand-on/80">{showPhrase ? "Hide" : "Reveal"}</span>
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={copyPhrase}
                    className="text-dashboard-label text-brand-on h-9 rounded-full bg-transparent px-3 shadow-none hover:bg-transparent hover:text-brand-on active:bg-transparent [&>span]:gap-1.5 [&>span]:px-0"
                  >
                    <span className="inline-flex items-center gap-1">
                      <FigmaIcon name="trip-detail-copy" className="size-4" />{" "}
                      <span className="text-brand-on/80">Copy</span>
                    </span>
                  </Button>
                </div>
              </div>
              <div
                className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
                aria-label={showPhrase ? "Ride phrase" : "Ride phrase hidden"}
              >
                {details.phrase.map((word, index) => (
                  <span
                    key={index}
                    className="bg-brand-on/[0.06] text-trip-phrase-word flex h-[54px] items-center justify-center rounded-2xl px-2 text-center font-(family-name:--font-geist-mono)"
                  >
                    {showPhrase ? word : "••••••"}
                  </span>
                ))}
              </div>
              <p className="text-trip-phrase-note text-brand-on/65 mt-8 sm:mt-[42px]">
                Your driver says this phrase before you get in. If they can’t, don’t board — call us
                on{" "}
                <button
                  type="button"
                  onClick={() => toast.info("Support calling is not connected yet.")}
                  className="text-brand-on rounded-sm font-medium underline focus-visible:outline-2 focus-visible:outline-border-focus-ring"
                >
                  +234 700 000 0000
                </button>
                .
              </p>
            </section>
            <section className={card}>
              <h2 className="text-dashboard-section-title">Status</h2>
              <div className="mt-5">
                <BookingProgress
                  current={0}
                  labels={statuses}
                  timestamps={["22:23", "", "", "", ""]}
                  ariaLabel="Trip status"
                />
              </div>
            </section>
            <section className={card}>
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                  <h2 className="text-dashboard-label text-text-secondary">
                    {pickup ? "Pickup at the airport" : "Drop-off at the airport"}
                  </h2>
                  <p className="text-trip-leg-flight mt-1">
                    <strong className="font-(family-name:--font-geist-mono) font-semibold">
                      {trip.flight}
                    </strong>
                    <span className="text-text-secondary"> · {details.flightDescription}</span>
                  </p>
                  <p className="text-dashboard-detail text-text-secondary">{details.flightRoute}</p>
                </div>
                <div className="shrink-0 text-end">
                  <p className="text-trip-detail-caption text-text-secondary">Pickup</p>
                  <p className="text-trip-leg-time">{details.pickupTime}</p>
                  <p className="text-trip-detail-caption text-text-secondary mt-1">Thu 19 Nov</p>
                </div>
              </div>
              <ol className="mt-5 space-y-5">
                <li className="relative ps-7 before:border-trip-route-line before:absolute before:start-[7px] before:top-[11px] before:bottom-[-31px] before:border-s before:border-dashed after:bg-brand-primary after:ring-dashboard-icon-surface after:absolute after:start-0 after:top-1 after:size-[15px] after:rounded-full after:ring-4">
                  <p className="text-trip-detail-caption text-text-secondary">From</p>
                  <p className="text-booking-option">{details.origin}</p>
                </li>
                <li className="relative ps-7 before:border-brand-primary before:bg-background-primary-default before:absolute before:start-0 before:top-1 before:size-[15px] before:rounded-full before:border-2">
                  <p className="text-trip-detail-caption text-text-secondary">To</p>
                  <p className="text-booking-option">{details.destination}</p>
                </li>
              </ol>
              {pickup && (
                <p className="bg-account-select-surface text-dashboard-detail text-landing-label mt-5 flex gap-2.5 rounded-2xl px-4 py-3">
                  <FigmaIcon
                    name="trip-detail-meeting"
                    className="text-accent-600 mt-0.5 size-4 shrink-0"
                  />
                  Arrivals hall exit — look for the TheTransporter sign by the pillars outside the
                  main doors.
                </p>
              )}
              <p className="text-dashboard-detail text-text-secondary mt-2 flex gap-2.5 px-1">
                <FigmaIcon
                  name={pickup ? "trip-detail-wait" : "trip-detail-driver"}
                  className="size-4 shrink-0"
                />
                {pickup
                  ? "60 minutes of free waiting after landing. We track the flight for delays."
                  : "Your driver arrives 5 minutes early and calls when outside."}
              </p>
            </section>
            <section className={card}>
              <h2 className="text-dashboard-section-title">Details</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ["Traveller", details.traveller, "trip-detail-traveller"],
                  ["Party", details.party, "trip-detail-party"],
                  ["Vehicle", details.vehicle, "trip-detail-vehicle"],
                  ...(details.extras !== "—"
                    ? [["Extras", details.extras, "trip-detail-extras"]]
                    : []),
                ].map(([label, value, icon]) => (
                  <div key={label} className="flex min-w-0 gap-3">
                    <FigmaIcon name={icon} className="text-text-secondary mt-0.5 size-4 shrink-0" />
                    <div className="min-w-0">
                      <dt className="text-trip-detail-caption text-text-secondary">{label}</dt>
                      <dd className="text-dashboard-route mt-0.5 wrap-break-word">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          </div>
          <aside className="space-y-5">
            <section className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-5">
              <h2 className="text-dashboard-label text-text-secondary">Your driver</h2>
              <p className="text-trip-driver-copy text-text-secondary mt-3">
                {pickup
                  ? "We assign your driver and SUV on the day of pickup."
                  : "We assign your driver and sedan by the day before pickup."}{" "}
                You’ll get their name, photo and plate by SMS and WhatsApp.
              </p>
            </section>
            <section className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-dashboard-label text-text-secondary">Payment</h2>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => toast.info("Receipts are coming soon.")}
                  className="text-dashboard-label text-accent-600 h-auto rounded-full bg-transparent px-2 py-1 shadow-none hover:bg-transparent active:bg-transparent [&>span]:px-0"
                >
                  <span className="inline-flex items-center gap-1">
                    <FigmaIcon name="trip-detail-receipt" className="size-4" /> Receipt
                  </span>
                </Button>
              </div>
              <p className="text-trip-detail-payment mt-2 font-(family-name:--font-geist-sans)">
                {trip.fare}
              </p>
              <p className="text-dashboard-detail text-text-secondary">Paystack · Bank transfer</p>
              <p className="text-dashboard-detail text-landing-label mt-3">
                +{details.points} points earned
              </p>
            </section>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => toast.info("Cancellation is not connected yet.")}
                className="text-booking-option text-text-error-primary h-11 rounded-full bg-transparent px-5 shadow-none hover:bg-transparent active:bg-transparent"
              >
                Cancel this transfer
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => toast.info("Support calling is not connected yet.")}
                className="text-body-medium text-landing-label h-11 rounded-full bg-transparent shadow-none hover:bg-transparent active:bg-transparent"
              >
                <span className="inline-flex items-center justify-center gap-2 text-center">
                  <FigmaIcon name="trip-detail-phone" className="size-4 shrink-0" />
                  <span>Call support · +234 700 000 0000</span>
                </span>
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </DashboardShell>
  );
}
