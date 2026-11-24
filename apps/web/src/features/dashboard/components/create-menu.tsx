"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { RiMore2Line } from "@remixicon/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@THE-TRANSPORTER/ui/components/dropdown-menu";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { DashboardIcon, type DashboardIconName } from "./dashboard-icon";

type MenuItem = { label: string; icon: DashboardIconName; href?: "/dashboard/book/pick-up" | "/dashboard/book/drop-off" | "/dashboard/business" | "/dashboard/account" | "/dashboard/rewards"; key?: string };
const bookingItems: MenuItem[] = [
  { label: "Airport pickup", icon: "pickup-white", href: "/dashboard/book/pick-up" },
  { label: "Airport drop-off", icon: "dropoff-white", href: "/dashboard/book/drop-off" },
  { label: "Day trip", icon: "repeat-white" },
];
const moreItems: MenuItem[] = [
  { label: "Rewards", icon: "business-rewards", key: "rewards", href: "/dashboard/rewards" },
  { label: "Business", icon: "business-company", key: "business", href: "/dashboard/business" },
  { label: "Account", icon: "business-account", key: "account", href: "/dashboard/account" },
];

// Bencho Create menu: the panel is one shape, so a goo filter would only damage its corners.
// The no-overshoot spring keeps the rounded surface from wobbling as it opens.
const surfaceSpring = { type: "spring", stiffness: 420, damping: 30, mass: 0.5 } as const;

export function CreateMenu({ kind, active }: { kind: "booking" | "more"; active?: string }) {
  const reduceMotion = useReducedMotion();
  const isBooking = kind === "booking";
  const moreActive = !isBooking && (active === "business" || active === "account" || active === "rewards");
  const items = isBooking ? bookingItems : moreItems;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={isBooking ? "Choose a ride" : "More navigation options"} className={cx("text-caption-1-medium flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl focus-visible:outline-2 focus-visible:outline-border-focus-ring", moreActive ? "text-accent-600" : "text-text-secondary")}>
        <motion.span whileTap={reduceMotion ? undefined : { scale: 0.94 }} transition={{ duration: 0.12 }} className={cx("grid place-items-center rounded-full", isBooking && "from-brand-primary to-brand-primary-deep text-brand-on -mt-7 size-14 bg-linear-to-b shadow-lg", moreActive && "bg-background-tertiary-default px-3 py-1")}>{isBooking ? <DashboardIcon name="mobile-add" /> : <RiMore2Line className="size-5" aria-hidden />}</motion.span>
        {!isBooking && <span>More</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align={isBooking ? "center" : "end"} sideOffset={12} className="relative w-56 overflow-visible rounded-3xl bg-transparent p-2 text-brand-on shadow-none ring-0 data-open:animate-none motion-reduce:data-closed:animate-none">
        {/* Keep the surface separate from text so the expanding shape never distorts glyphs. */}
        <motion.div aria-hidden className="from-brand-primary to-brand-primary-deep pointer-events-none absolute inset-0 origin-bottom rounded-3xl bg-linear-to-b shadow-lg" initial={reduceMotion ? false : { scaleX: 0.3, scaleY: 0.35 }} animate={{ scaleX: 1, scaleY: 1 }} transition={reduceMotion ? { duration: 0 } : surfaceSpring} />
        {items.map((item, index) => {
          const classes = "text-dashboard-route text-brand-on relative flex min-h-11 items-center gap-3 rounded-2xl px-3 font-medium focus:bg-brand-on/15 focus:text-brand-on";
          const content = <><DashboardIcon name={item.icon} />{item.label}</>;
          return <motion.div role="presentation" key={item.label} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16, delay: reduceMotion ? 0 : 0.03 + index * 0.022 }}>
            {item.href ? <DropdownMenuItem render={<Link href={{ pathname: item.href }} />} aria-current={item.key && item.key === active ? "page" : undefined} className={classes}>{content}</DropdownMenuItem> : <DropdownMenuItem onClick={() => toast.info(`${item.label} is coming soon.`)} className={classes}>{content}</DropdownMenuItem>}
          </motion.div>;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
