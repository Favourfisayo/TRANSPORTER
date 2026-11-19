"use client";

import { motion, useReducedMotion } from "motion/react";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

const steps = ["Trip", "Flight", "Travellers", "Vehicle", "Pay"];
const spring = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.8,
} as const;

export function BookingProgress({ current }: { current: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <nav aria-label="Booking progress" className="max-w-[458px]">
      <ol className="flex w-full items-center">
        {steps.map((label, index) => (
          <li
            key={label}
            className={cx(
              "flex items-center",
              index < steps.length - 1 && "flex-1",
            )}
          >
            <span
              aria-current={index === current ? "step" : undefined}
              className={cx(
                "text-body-2-medium relative grid size-8 shrink-0 place-items-center rounded-full",
                index < current
                  ? "bg-booking-progress-complete text-brand-on"
                  : index === current
                    ? "text-brand-on"
                    : "bg-booking-progress-pending text-booking-progress-pending-text",
              )}
            >
              {index === current && (
                <motion.span
                  layoutId="booking-progress-current"
                  className="bg-booking-progress-current absolute inset-0 rounded-full"
                  transition={reducedMotion ? { duration: 0 } : spring}
                />
              )}
              <span className="relative">
                {index + 1}
                <span className="sr-only">: {label}</span>
              </span>
            </span>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="bg-booking-progress-line relative h-0.5 min-w-2 flex-1 overflow-hidden"
              >
                <motion.span
                  className="bg-booking-progress-complete absolute inset-0 origin-left"
                  initial={false}
                  animate={{ scaleX: index < current ? 1 : 0 }}
                  transition={reducedMotion ? { duration: 0 } : spring}
                />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
