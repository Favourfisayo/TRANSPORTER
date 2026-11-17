"use client";

import { motion, useReducedMotion } from "motion/react";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

const words = ["The", "Transporter.co"];

export function FooterWordmark({ inView }: { inView: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="font-landing text-footer-wordmark -mb-[0.1em] flex flex-col items-start overflow-hidden whitespace-nowrap text-[14vw] leading-[0.9] font-medium tracking-[-0.055em] select-none md:flex-row md:items-baseline md:justify-center md:text-[10.2vw] md:leading-none"
    >
      {words.map((word, wordIndex) => (
        <span key={word} className={cx("flex", wordIndex === 0 && "md:me-[0.18em]")}>
          {Array.from(word).map((letter, index) => {
            const order = index + (wordIndex === 0 ? 0 : 3);
            return (
              <motion.span
                key={index}
                className={cx(
                  "motion-reduce:transform-none! motion-reduce:opacity-100! motion-reduce:filter-none!",
                  letter === "."
                    ? "text-footer-dot"
                    : order > 14
                      ? "text-footer-domain"
                      : undefined,
                )}
                initial={false}
                animate={
                  reducedMotion || inView
                    ? { transform: "translateY(0%)", opacity: 1, filter: "blur(0px)" }
                    : { transform: "translateY(40%)", opacity: 0, filter: "blur(10px)" }
                }
                transition={
                  inView
                    ? { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: order * 0.045 }
                    : { duration: 0 }
                }
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
