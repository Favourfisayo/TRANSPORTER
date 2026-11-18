"use client";

import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { cardClass, Status, TripIcon, unavailable } from "./home-trip-parts";
import { DashboardIcon } from "../dashboard-icon";

export function UpcomingTrip() {
  return (
    <section aria-labelledby="upcoming-title" className="mt-10">
      <h2 id="upcoming-title" className="font-landing text-dashboard-label text-text-secondary">
        Coming up
      </h2>
      <div className={cx(cardClass, "mt-3 w-full overflow-hidden md:w-[calc((100%-0.75rem)/2)]")}>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <TripIcon icon="dropoff" />
              <div>
                <h3 className="text-dashboard-card-title">Airport drop-off</h3>
                <p className="text-dashboard-label text-text-secondary flex items-center gap-2">
                  <DashboardIcon name="calendar" />
                  Thu 19 Nov · 17:50
                </p>
              </div>
            </div>
            <Status status="Confirmed" />
          </div>
          <div className="text-dashboard-route mt-4 flex items-center justify-between gap-4">
            <span className="text-landing-label">
              Ikoyi <DashboardIcon name="route-arrow" className="mx-1" />{" "}
              International
            </span>
            <span className="text-dashboard-label font-mono">₦44,500</span>
          </div>
          <div className="bg-account-select-surface mt-11 flex items-center gap-3 rounded-2xl p-3">
            <TripIcon icon="avatar" />
            <div>
              <p className="text-body-semibold">Driver assigned</p>
              <p className="text-dashboard-detail text-text-secondary">
                Honda CR-V · Black SUV · EK 784
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => unavailable("Trip details")}
          className="from-brand-primary-deep to-brand-primary text-brand-on text-dashboard-route flex w-full items-center gap-2.5 bg-linear-[83deg] px-6 py-4 text-start hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus-ring"
        >
          <DashboardIcon name="shield-white" />
          <span className="flex-1">Ride phrase ready — open trip to reveal</span>
          <DashboardIcon name="arrow-white" />
        </button>
      </div>
    </section>
  );
}
