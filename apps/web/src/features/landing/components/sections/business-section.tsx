import Image from "next/image";
import { FigmaIcon } from "@/components/figma-icon";

import { ComingSoonButton } from "../coming-soon-button";

const benefits = [
  "Book for anyone on your team",
  "Monthly invoicing on credit, or a shared company wallet",
];

export function BusinessSection() {
  return (
    <div className="bg-landing-surface">
      <section
        id="business"
        aria-labelledby="business-heading"
        className="bg-business-surface text-brand-on overflow-hidden rounded-t-[36px]"
      >
        <div className="grid md:grid-cols-[47.04%_1fr]">
          <div className="relative min-h-[320px] md:h-[610px]">
            <Image
              src="/assets/business-travel.jpg"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 47vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start px-6 py-10 md:p-12">
            <p className="font-landing text-business-accent flex items-center gap-2 text-[11px] leading-[16.5px] tracking-[0.18em] uppercase">
              <FigmaIcon name="business" className="size-3.5" /> For business
            </p>
            <h2
              id="business-heading"
              className="font-landing mt-6 max-w-[492px] text-[clamp(36px,3.84vw,48px)] leading-[1.02] font-medium tracking-[-0.04em] text-balance"
            >
              Ground transport your finance team will thank you for.
            </h2>
            <p className="font-landing text-business-muted mt-5 max-w-[492px] text-base leading-[1.625] text-pretty">
              Visiting executives, crews and new hires — booked by your team, billed to your
              company, tracked in one place.
            </p>
            <ul className="text-brand-logo mt-10 grid gap-3 text-[15px] leading-[1.5] md:mt-[62px]">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <FigmaIcon name="check" className="text-brand-primary mt-0.5 size-4" />
                  {benefit}
                </li>
              ))}
            </ul>
            <ComingSoonButton
              feature="Business account signup"
              className="font-landing border-brand-action-border from-brand-primary to-brand-primary-deep text-brand-on mt-12 h-11 rounded-full border bg-linear-[192deg] from-[29.89%] to-[73.56%] px-3.5 text-[15px] font-medium hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            >
              Open a business account
            </ComingSoonButton>
          </div>
        </div>
      </section>
    </div>
  );
}
