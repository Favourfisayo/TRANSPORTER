"use client";

import { useState } from "react";
import styles from "./number-pop-in.module.css";

export function NumberPopIn({ value, label = "Estimate", announce = true }: { value: number; label?: string; announce?: boolean }) {
  const formatted = value.toLocaleString("en-NG");
  const [transition, setTransition] = useState({ current: formatted, previous: "" });

  if (formatted !== transition.current) {
    setTransition({ current: formatted, previous: transition.current });
  }

  const from = transition.previous;
  let same = 0;
  while (same < from.length && same < formatted.length && from[same] === formatted[same]) same++;

  return (
    <span aria-live={announce ? "polite" : undefined} aria-atomic={announce ? "true" : undefined}>
      <span className="sr-only">{label}: ₦{formatted}</span>
      <span aria-hidden="true" key={formatted} className={`${styles["t-digit-group"]} ${styles["is-animating"]}`}>
        {formatted.split("").map((character, index) => {
          if (index < same || !/\d/.test(character)) {
            return <span key={index} className={styles["t-digit"]} data-same="">{character}</span>;
          }
          const fromEnd = formatted.length - 1 - index;
          const old = from[from.length - (formatted.length - index)];
          return (
            <span key={index} className={styles["t-digit-slot"]} data-stagger={fromEnd === 1 ? "1" : fromEnd === 0 ? "2" : undefined}>
              {old && /\d/.test(old) && <span className={styles["t-digit-old"]}>{old}</span>}
              <span className={styles["t-digit"]}>{character}</span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
