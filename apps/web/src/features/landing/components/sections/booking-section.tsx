import { BookingForm } from "../booking-form";

export function BookingSection() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="bg-landing-surface text-landing-text scroll-mt-4"
    >
      <div className="mx-auto grid max-w-[1250px] gap-10 px-6 py-16 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-[68px] lg:py-[93px]">
        <div className="flex flex-col items-start">
          <h2
            id="booking-heading"
            className="font-landing max-w-[413px] text-[clamp(36px,4.16vw,52px)] leading-[0.92] font-medium tracking-[-0.035em] text-balance"
          >
            Getting to and from the airport should be the easiest part of your journey.
          </h2>
          <p className="font-landing text-landing-muted mt-8 max-w-[466px] text-[24px] leading-[1.1] tracking-[-0.06em] italic lg:mt-[120px]">
            We watch your flight, so <br className="hidden lg:block" />
            you don’t watch the clock.
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
