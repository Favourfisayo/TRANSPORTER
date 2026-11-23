"use client";

import Image from "next/image";
import Link from "next/link";
import { unavailable } from "./home-trip-parts";
import { DashboardIcon } from "../dashboard-icon";

const rides = [
  { title: "Airport pickups", image: "/assets/dashboard-pickup.png", icon: "pickup-white" },
  { title: "Airport drop-offs", image: "/assets/dashboard-dropoff.png", icon: "dropoff-white" },
  { title: "Day trip", image: "/assets/dashboard-day-trip.png", icon: "repeat-white" },
] as const;

export function BookingOptions() {
  return (
    <section aria-labelledby="book-title" className="mt-8">
      <h2 id="book-title" className="font-landing text-dashboard-label text-text-secondary">
        Book a ride
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {rides.map(({ title, image, icon }) => {
          const className = "group text-brand-on relative h-48 overflow-hidden rounded-[26px] text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus-ring sm:h-[233.0625px]";
          const content = (
            <>
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
            <span className="from-hero-overlay/80 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
            <span className="bg-brand-on/15 absolute start-3 top-3 grid size-9 place-items-center rounded-full backdrop-blur-md">
              <DashboardIcon name={icon} />
            </span>
            <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2">
              <span className="text-dashboard-ride-title">{title}</span>
              <span className="bg-brand-on text-hero-overlay grid size-8 place-items-center rounded-full">
                <DashboardIcon name="arrow-up" />
              </span>
            </span>
            </>
          );
          return title !== "Day trip" ? (
            <Link key={title} href={{ pathname: title === "Airport pickups" ? "/dashboard/book/pick-up" : "/dashboard/book/drop-off" }} className={className}>{content}</Link>
          ) : (
            <button key={title} type="button" onClick={() => unavailable("Booking")} className={className}>{content}</button>
          );
        })}
      </div>
    </section>
  );
}
