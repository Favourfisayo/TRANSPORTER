"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@THE-TRANSPORTER/ui/components/application/dashboard/dashboard-sidebar";
import { buttonStyles } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardIcon } from "./dashboard-icon";
import { setDemoRole, useBusinessDemo } from "../lib/demo-role";
import { demoRewardsBalance } from "../lib/rewards";
import { CreateMenu } from "./create-menu";

type Destination = "home" | "trips" | "account" | "wallet" | "business" | "rewards";
const nav = [
  { label: "Home", icon: "nav-home", activeIcon: "nav-home-active", key: "home", href: "/dashboard" },
  {
    label: "My trips",
    icon: "nav-trips",
    activeIcon: "nav-trips-active",
    key: "trips",
    href: "/dashboard/trips",
  },
  { label: "Rewards", icon: "nav-rewards", key: "rewards", href: "/dashboard/rewards" },
  { label: "Account", icon: "nav-account", activeIcon: "nav-account-active", key: "account", href: "/dashboard/account" },
] as const;
const businessNav = [
  { label: "Home", icon: "business-home", key: "home", href: "/dashboard" },
  { label: "Trips", icon: "business-trips", key: "trips", href: "/dashboard/trips" },
  { label: "Wallet", icon: "business-wallet", key: "wallet", href: "/dashboard/wallet" },
  { label: "Rewards", icon: "business-rewards", key: "rewards", href: "/dashboard/rewards" },
  { label: "Business", icon: "business-company", key: "business", href: "/dashboard/business" },
  { label: "Account", icon: "business-account", key: "account", href: "/dashboard/account" },
] as const;
const mobileNav = [
  { label: "Home", icon: "mobile-home", key: "home", href: "/dashboard" },
  { label: "My trips", icon: "mobile-trips", key: "trips", href: "/dashboard/trips" },
  { label: "Book a ride", icon: "mobile-add", href: "/dashboard/book/drop-off" },
  { label: "Rewards", icon: "nav-rewards", key: "rewards", href: "/dashboard/rewards" },
  { label: "Account", icon: "mobile-account", key: "account", href: "/dashboard/account" },
] as const;
const businessMobileNav = [
  { label: "Home", icon: "business-home", key: "home", href: "/dashboard" },
  { label: "Trips", icon: "business-trips", key: "trips", href: "/dashboard/trips" },
  { label: "Book a ride", icon: "mobile-add", href: "/dashboard/book/drop-off" },
  { label: "Wallet", icon: "business-wallet", key: "wallet", href: "/dashboard/wallet" },
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
  const router = useRouter();
  const business = useBusinessDemo();
  const header = (
    <div className={cx("flex items-center justify-between gap-2", collapsed && "flex-col")}>
      <Brand compact={collapsed} />
      <ModeToggle className={themeClass} icon={<DashboardIcon name="theme" />} />
    </div>
  );
  const navigation = (business ? businessNav : nav).map(({ label, icon, ...item }) => {
    const selected = "key" in item && item.key === active;
    const classes = cx(
      "font-landing text-dashboard-body flex h-11 items-center gap-3 rounded-xl px-3 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus-ring",
      business && "font-(family-name:--font-geist-sans)",
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
      {!collapsed && (business ? (
        <div className="grid grid-cols-2 gap-2">
          <Link href={{ pathname: "/dashboard/wallet" }} className="bg-background-secondary-default rounded-2xl p-3 focus-visible:outline-2 focus-visible:outline-border-focus-ring">
            <p className="text-caption-1-regular text-text-secondary">Wallet</p>
            <p className="text-body-semibold mt-1">₦250,000</p>
          </Link>
          <Link href={{ pathname: "/dashboard/rewards" }} className="bg-background-secondary-default rounded-2xl p-3 focus-visible:outline-2 focus-visible:outline-border-focus-ring">
            <p className="text-caption-1-regular text-text-secondary">Points</p>
            <p className="text-body-semibold mt-1">{demoRewardsBalance.toLocaleString("en-NG")}</p>
          </Link>
        </div>
      ) : (
        <div className="bg-background-secondary-default rounded-2xl p-3">
          <p className="text-caption-1-regular text-text-secondary">Loyalty points</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-body-semibold font-mono">{demoRewardsBalance.toLocaleString("en-NG")}</span>
            <span className="bg-background-tertiary-default h-2 flex-1 overflow-hidden rounded-full">
              <span className="bg-brand-primary block h-full rounded-full" style={{ width: `${demoRewardsBalance / 100}%` }} />
            </span>
          </div>
        </div>
      ))}
      <div
        className={cx(
          "flex items-center gap-3 px-2",
          collapsed && "flex-col justify-center gap-1 px-0",
        )}
      >
        <span className={cx("bg-background-tertiary-default text-brand-primary grid size-10 shrink-0 place-items-center rounded-2xl", business && "bg-dashboard-icon-surface rounded-full")}>
          <DashboardIcon name={business ? "business-avatar" : "avatar"} className={business || collapsed ? "translate-x-[2.75px]" : undefined} />
        </span>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-body-semibold">{business ? "Tunde Adetope" : "Womo Justin"}</p>
            <p className="text-caption-1-regular text-text-secondary">{business ? "Kora Energy Ltd" : "Individual account"}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => { try { setDemoRole(null); } catch {} router.push("/login"); }}
          aria-label="Sign out"
          className="text-text-secondary rounded-lg p-2 hover:bg-background-secondary-default focus-visible:outline-2 focus-visible:outline-border-focus-ring"
        >
          <DashboardIcon name={business ? "business-logout" : "logout"} />
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
          <Link
            aria-label={collapsed ? "Book a ride" : undefined}
            title={collapsed ? "Book a ride" : undefined}
            className={cx(buttonStyles.base, buttonStyles.size.medium, buttonStyles.variant.primary, "from-brand-primary to-brand-primary-deep text-brand-on h-11 rounded-full bg-linear-to-b shadow-none hover:brightness-110")}
            href={{ pathname: "/dashboard/book/drop-off" }}
          >
            <span className={buttonStyles.label.medium}><span className="flex items-center gap-2"><DashboardIcon name="book" />{!collapsed && "Book a ride"}</span></span>
          </Link>
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
          {(business ? businessMobileNav : mobileNav).map(({ label, icon, ...item }) => {
            const isBook = label === "Book a ride";
            if (isBook) return <CreateMenu key={label} kind="booking" />;
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
                  )}
                >
                  <DashboardIcon name={icon} />
                </span>
                <span className="max-w-full truncate">{label}</span>
              </>
            );
            return "href" in item && typeof item.href === "string" ? (
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
                onClick={() => unavailable(label)}
                className={classes}
              >
                {content}
              </button>
            );
          })}
          {business && <CreateMenu kind="more" active={active} />}
        </div>
      </nav>
    </div>
  );
}
