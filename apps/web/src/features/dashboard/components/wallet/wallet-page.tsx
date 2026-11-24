"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { FigmaIcon } from "@/components/figma-icon";
import { DashboardShell } from "../dashboard-shell";
import { setDemoRole } from "../../lib/demo-role";

export function WalletPage() {
  useEffect(() => {
    try { setDemoRole("business"); } catch { toast.error("Enable browser storage to use the business demo."); }
  }, []);
  return (
    <DashboardShell active="wallet">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 pb-16 sm:px-10 lg:pt-10">
        <h1 className="font-landing text-dashboard-page-title">Company wallet</h1>
        <p className="text-dashboard-body text-text-secondary mt-1.5">Pay for rides in one tap. Refunds to your wallet arrive instantly.</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.74fr)_minmax(0,1fr)]">
          <section aria-label="Available balance" className="bg-wallet-balance shadow-wallet-balance text-brand-on relative flex min-h-[301px] flex-col overflow-hidden rounded-[30px] p-6 sm:p-8">
            <span aria-hidden className="bg-brand-on/10 pointer-events-none absolute -top-20 -right-6 size-48 rounded-full blur-[40px]" />
            <p className="text-trip-phrase-label text-brand-on/75 font-(family-name:--font-geist-mono) tracking-[0.18em] uppercase">Available balance</p>
            <p className="text-wallet-balance mt-12 text-[clamp(2.5rem,10vw,3.5rem)] font-(family-name:--font-geist-sans) font-semibold">₦250,000</p>
            <p className="text-dashboard-route text-brand-on/75 mt-3">Kora Energy Ltd</p>
            <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-8">
              <Button type="button" variant="secondary" onClick={() => toast.info("Wallet top-up is coming soon.")} className="text-dashboard-body bg-brand-on text-wallet-topup-text h-11 rounded-full border-0 px-5 shadow-none hover:bg-brand-on/90 [&>span]:gap-2 [&>span]:px-0">
                <FigmaIcon name="wallet-add" className="size-4" /> Top up
              </Button>
              <Link href={{ pathname: "/dashboard/book/drop-off" }} className="text-dashboard-body bg-brand-on/10 text-brand-on inline-flex h-11 items-center rounded-full px-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus-ring">Book a transfer</Link>
            </div>
            <Image src="/assets/wallet-card.png" alt="" width={47} height={44} className="pointer-events-none absolute right-6 bottom-5 hidden h-11 w-[47px] rounded-xl object-cover sm:block" />
          </section>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {["Spent this month", "Refunded to wallet"].map((label) => (
              <section key={label} className="bg-background-primary-default shadow-dashboard-card min-h-32 rounded-[20px] p-5">
                <h2 className="text-dashboard-detail text-text-secondary">{label}</h2>
                <p className="text-wallet-stat mt-1">₦0</p>
              </section>
            ))}
          </div>
        </div>

        <section className="mt-8" aria-labelledby="wallet-activity-title">
          <h2 id="wallet-activity-title" className="text-dashboard-label text-text-secondary">Activity</h2>
          <h3 className="text-trip-detail-caption text-text-secondary mt-3 px-1 font-medium">October 2026</h3>
          <div className="bg-background-primary-default shadow-dashboard-card mt-2 flex flex-wrap items-center gap-3 rounded-[21px] px-4 py-3.5 sm:flex-nowrap">
            <span className="bg-booking-fit-surface text-dashboard-success-text grid size-10 shrink-0 place-items-center rounded-2xl"><FigmaIcon name="wallet-activity" className="size-[18px]" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-dashboard-route font-medium">Wallet top-up · Paystack</p>
              <p className="text-trip-detail-caption text-text-secondary">18 Oct 2026 · 11:40 <span className="font-(family-name:--font-geist-mono)">· T922665311337</span></p>
            </div>
            <p className="text-dashboard-body text-dashboard-success-text ms-auto font-semibold">+₦250,000</p>
          </div>
        </section>
      </main>
    </DashboardShell>
  );
}
