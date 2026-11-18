"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DashboardSidebar } from "@THE-TRANSPORTER/ui/components/application/dashboard/dashboard-sidebar";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardIcon } from "./dashboard-icon";

type Destination = "home" | "trips";
const nav = [
  { label: "Home", icon: "nav-home", activeIcon: "nav-home-active", key: "home", href: "/dashboard" },
  {
    label: "My trips",
    icon: "nav-trips",
    activeIcon: "nav-trips-active",
    key: "trips",
    href: "/dashboard/trips",
  },
  { label: "Rewards", icon: "nav-rewards" },
  { label: "Account", icon: "nav-account" },
] as const;
const mobileNav = [
  { label: "Home", icon: "mobile-home", key: "home", href: "/dashboard" },
  { label: "My trips", icon: "mobile-trips", key: "trips", href: "/dashboard/trips" },
  { label: "Book a ride", icon: "mobile-add" },
  { label: "Wallet", icon: "mobile-wallet" },
  { label: "Account", icon: "mobile-account" },
] as const;
const themeClass =
  "border-transparent bg-transparent text-text-secondary px-2 shadow-none backdrop-blur-none hover:bg-background-secondary-default [&_svg]:text-text-secondary";

function unavailable(label: string) {
  toast.info(`${label} is coming soon.`);
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="The Transporter home"
      className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
    >
      <Image src="/assets/logo-mark.svg" width={32} height={32} alt="" />
      <span className={cx("text-body-semibold whitespace-nowrap", compact && "sr-only")}>
        TheTransporter<span className="text-brand-primary">.co</span>
      </span>
    </Link>
  );
}

export function DashboardShell({ active, children }: { active: Destination; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const header = (
    <div className={cx("flex items-center justify-between gap-2", collapsed && "flex-col")}>
      <Brand compact={collapsed} />
      <ModeToggle className={themeClass} icon={<DashboardIcon name="theme" />} />
    </div>
  );
  const navigation = nav.map(({ label, icon, ...item }) => {
    const selected = "key" in item && item.key === active;
    const classes = cx(
      "font-landing text-dashboard-body flex h-11 items-center gap-3 rounded-xl px-3 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus-ring",
      collapsed && "justify-center px-0",
      selected
        ? "bg-dashboard-icon-surface text-accent-600 font-medium"
        : "text-landing-label hover:bg-background-secondary-default",
    );
    const content = (
      <>
        <DashboardIcon name={selected && "activeIcon" in item ? item.activeIcon : icon} />
        {!collapsed && label}
      </>
    );
    return "href" in item ? (
      <Link
        key={label}
        href={{ pathname: item.href }}
        aria-label={label}
        aria-current={selected ? "page" : undefined}
        title={collapsed ? label : undefined}
        className={classes}
      >
        {content}
      </Link>
    ) : (
      <button
        key={label}
        type="button"
        aria-label={label}
        title={collapsed ? label : undefined}
        onClick={() => unavailable(label)}
        className={classes}
      >
        {content}
      </button>
    );
  });
  const footer = (
    <>
      {!collapsed && (
        <div className="bg-background-secondary-default rounded-2xl p-3">
          <p className="text-caption-1-regular text-text-secondary">Loyalty points</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-body-semibold font-mono">6,384</span>
            <span className="bg-background-tertiary-default h-2 flex-1 overflow-hidden rounded-full">
              <span className="bg-brand-primary block h-full w-2/3 rounded-full" />
            </span>
          </div>
        </div>
      )}
      <div
        className={cx(
          "flex items-center gap-3 px-2",
          collapsed && "flex-col justify-center gap-1 px-0",
        )}
      >
        <span className="bg-background-tertiary-default text-brand-primary grid size-10 shrink-0 place-items-center rounded-2xl">
          <DashboardIcon name="avatar" className={collapsed ? "translate-x-[2.75px]" : undefined} />
        </span>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-body-semibold">Womo Justin</p>
            <p className="text-caption-1-regular text-text-secondary">Individual account</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => unavailable("Sign out")}
          aria-label="Sign out"
          className="text-text-secondary rounded-lg p-2 hover:bg-background-secondary-default focus-visible:outline-2 focus-visible:outline-border-focus-ring"
        >
          <DashboardIcon name="logout" />
        </button>
      </div>
    </>
  );
  return (
    <div className="bg-background-secondary-default text-text-primary min-h-screen lg:flex">
      <DashboardSidebar
        header={header}
        navigation={navigation}
        footer={footer}
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
        action={
          <Button
            aria-label={collapsed ? "Book a ride" : undefined}
            title={collapsed ? "Book a ride" : undefined}
            className="from-brand-primary to-brand-primary-deep text-brand-on h-11 rounded-full bg-linear-to-b hover:brightness-110"
            onClick={() => unavailable("Booking")}
          >
            <span className="flex items-center gap-2"><DashboardIcon name="book" />{!collapsed && "Book a ride"}</span>
          </Button>
        }
      />
      <div className="min-w-0 flex-1 pb-28 lg:pb-16">
        <header className="bg-background-primary-default border-border-button-default flex items-center justify-between border-b px-5 py-4 lg:hidden">
          <Brand />
          <ModeToggle className={themeClass} icon={<DashboardIcon name="theme" />} />
        </header>
        {children}
      </div>
      <nav
        aria-label="Mobile dashboard navigation"
        className="bg-background-primary-default border-border-button-default fixed inset-x-0 bottom-0 z-40 border-t px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-lg lg:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 items-end">
          {mobileNav.map(({ label, icon, ...item }, index) => {
            const selected = "key" in item && item.key === active;
            const classes = cx(
              "text-caption-1-medium flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-border-focus-ring motion-reduce:transition-none",
              selected ? "text-accent-600" : "text-text-secondary",
            );
            const content = (
              <>
                <span
                  className={cx(
                    "grid place-items-center rounded-full transition-colors duration-150 motion-reduce:transition-none",
                    selected && "bg-background-tertiary-default px-3 py-1",
                    index === 2 &&
                      "from-brand-primary to-brand-primary-deep text-brand-on -mt-7 size-14 bg-linear-to-b shadow-lg",
                  )}
                >
                  <DashboardIcon name={icon} />
                </span>
                {index !== 2 && <span className="truncate">{label}</span>}
              </>
            );
            return "href" in item ? (
              <Link
                key={label}
                href={{ pathname: item.href }}
                aria-label={label}
                aria-current={selected ? "page" : undefined}
                className={classes}
              >
                {content}
              </Link>
            ) : (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => unavailable(index === 2 ? "Booking" : label)}
                className={classes}
              >
                {content}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
