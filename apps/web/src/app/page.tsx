import Image from "next/image";
import { Urbanist } from "next/font/google";

import { Header } from "@/features/landing/components/header";
import { BookingSection } from "@/features/landing/components/booking-section";
import { FleetSection } from "@/features/landing/components/fleet-section";
import { BookingStepsSection } from "@/features/landing/components/booking-steps-section";
import { BusinessSection } from "@/features/landing/components/business-section";
import { Footer } from "@/features/landing/components/footer";

const urbanist = Urbanist({ subsets: ["latin"], style: "italic", variable: "--font-urbanist" });

export default function Home() {
  return (
    <>
      <main className={urbanist.variable}>
        <div className="relative isolate min-h-[880px] overflow-hidden bg-hero-overlay text-white max-[600px]:min-h-svh">
          <Image
            src="/assets/airport-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 -scale-x-100 object-cover"
          />
          <div
            className="from-hero-overlay/30 via-hero-overlay/85 to-hero-overlay absolute inset-0 -z-10 bg-linear-to-b via-50%"
            aria-hidden="true"
          />
          <Header />
          <section
            className="flex flex-col items-center px-6 pt-[216px] pb-20 max-[600px]:pt-[180px] max-[600px]:pb-24"
            aria-labelledby="hero-title"
          >
            <h1
              id="hero-title"
              className="font-landing text-center text-[clamp(42px,6.272vw,78.4px)] leading-[0.78125] font-medium tracking-[-0.036em] text-balance max-[600px]:max-w-[500px] max-[600px]:leading-[1.05]"
            >
              Your next landing, sorted.
            </h1>
            <p className="font-landing-accent mt-[54px] w-full max-w-[289px] text-[15px] leading-[24.375px] italic max-[600px]:mt-9">
              From airport arrivals to timely departures, enjoy seamless rides with{" "}
              <strong className="font-semibold">The Transporter!</strong>
            </p>
            <a
              href="#booking"
              className="font-landing border-brand-action-border from-brand-primary to-brand-primary-deep mt-16 inline-flex min-h-9 items-center justify-center rounded-full border bg-linear-[199deg] from-[29.89%] to-[73.56%] px-3.5 text-base font-medium text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white max-[600px]:mt-12"
            >
              Book a ride
            </a>
          </section>
        </div>
        <BookingSection />
        <FleetSection />
        <div className="bg-landing-subtle">
          <BookingStepsSection />
        </div>
        <BusinessSection />
      </main>
      <Footer />
    </>
  );
}
