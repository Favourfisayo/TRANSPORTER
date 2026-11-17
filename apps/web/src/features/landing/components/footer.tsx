"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import Link from "next/link";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

import { ComingSoonButton } from "./coming-soon-button";
import { FooterWordmark } from "./footer-wordmark";

const linkClass =
  "text-landing-text text-body-regular inline-block rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { amount: 0.01 });

  return (
    <footer
      ref={footerRef}
      className="bg-landing-surface text-landing-text overflow-hidden"
      aria-label="Footer"
    >
      <div className="mx-auto grid max-w-[1250px] gap-12 px-6 pt-20 pb-28 md:grid-cols-[minmax(0,444px)_1fr] md:gap-12 md:px-[37px] md:pt-[117px] md:pb-[180px]">
        <div>
          <Link
            href="/"
            aria-label="The Transporter home"
            className="font-brand text-[17px] font-semibold tracking-[-0.025em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
          >
            TheTransporter<span className="text-brand-primary font-medium">.co</span>
          </Link>
          <address className="text-body-regular mt-8 grid gap-2 not-italic">
            <span>+234 700 000 0000</span>
            <span>hello@thetransporter.co</span>
            <span>Ikeja GRA, Lagos · Open 24 hours</span>
          </address>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="font-landing text-caption-2-regular tracking-[0.16em] uppercase">
              Solutions
            </h2>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a className={linkClass} href="#booking">
                  Airport pickups
                </a>
              </li>
              <li>
                <a className={linkClass} href="#booking">
                  Airport drop-offs
                </a>
              </li>
              <li>
                <a className={linkClass} href="#booking">
                  Round trips
                </a>
              </li>
              <li>
                <a className={linkClass} href="#fleet">
                  Our fleet
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-landing text-caption-2-regular tracking-[0.16em] uppercase">
              Company
            </h2>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a className={linkClass} href="#business">
                  Business accounts
                </a>
              </li>
              <li>
                <ComingSoonButton
                  feature="Coverage and prices"
                  className={cx(linkClass, "h-auto bg-transparent p-0 shadow-none")}
                >
                  Coverage &amp; prices
                </ComingSoonButton>
              </li>
              <li>
                <ComingSoonButton
                  feature="Questions"
                  className={cx(linkClass, "h-auto bg-transparent p-0 shadow-none")}
                >
                  Questions
                </ComingSoonButton>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <FooterWordmark inView={inView} />
    </footer>
  );
}
