import { FigmaIcon } from "@/components/figma-icon";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

const steps = [
  {
    title: "Add your flight",
    description:
      "Enter your flight details-fill in the airline, terminal and schedule, we also crosscheck from our airline database.",
    icon: "step-flight",
    background: "bg-step-neutral",
  },
  {
    title: "Choose your vehicle",
    description:
      "Sedan, SUV or bus, priced upfront for your passengers and luggage. No surprises at the parking lot.",
    icon: "step-vehicle",
    background: "bg-step-light",
  },
  {
    title: "Pay your way",
    description: "with a Card or via bank transfer.",
    icon: "step-pay",
    background: "bg-step-mid",
  },
  {
    title: "Meet your driver",
    description:
      "Your driver says your private phrase before you board. Then you’re on your way home.",
    icon: "step-driver",
    background: "bg-step-strong",
  },
];

export function BookingStepsSection() {
  return (
    <section
      aria-labelledby="booking-steps-heading"
      className="bg-landing-surface text-landing-text rounded-t-[30px]"
    >
      <div className="mx-auto flex max-w-312.5 flex-col px-6 pt-16 pb-12 md:px-9.25 md:pt-32 md:pb-16">
        <div className="border-separator-border order-2 mt-16 flex flex-col gap-6 border-b pb-8 md:mt-25 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2
            id="booking-steps-heading"
            className="max-w-105 text-[clamp(42px,4.8vw,60px)] leading-none font-medium tracking-[-0.04em] text-balance"
          >
            Booked in
            <br /> two minutes.
          </h2>
          <p className="text-landing-secondary max-w-md text-[15px] leading-relaxed text-balance md:pb-1 md:text-right">
            Everything happens in the app — booking, payment, live status and your receipt.
          </p>
        </div>
        <ol className="order-1 grid sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, description, icon, background }) => (
            <li key={title} className={cx(background, "text-step-text min-h-70.25 p-7")}>
              <div className="bg-step-icon-surface text-brand-primary grid size-11 place-items-center rounded-2xl">
                <FigmaIcon name={icon} className="size-5" />
              </div>
              <h3 className="text-title-3-semibold mt-8">{title}</h3>
              <p className="text-body-regular text-step-muted mt-2 leading-relaxed text-pretty">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
