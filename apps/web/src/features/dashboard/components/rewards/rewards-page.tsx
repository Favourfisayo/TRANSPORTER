"use client";

import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { FigmaIcon } from "@/components/figma-icon";
import { demoRewardsBalance } from "../../lib/rewards";
import { DashboardShell } from "../dashboard-shell";

const tiers = [
  { name: "Blue", multiplier: "×1", description: "Points on every trip", threshold: "Start" },
  { name: "Silver", multiplier: "×1.25", description: "Priority support line", threshold: "10,000+" },
  { name: "Gold", multiplier: "×1.5", description: "Free SUV upgrades when available", threshold: "25,000+" },
];
const offers = [
  { points: 500, title: "₦2,500 off a transfer", description: "Applies to any vehicle, any zone." },
  { points: 950, title: "₦5,000 off a transfer", description: "Applies to any vehicle, any zone." },
  { points: 1800, title: "Free upgrade to SUV", description: "Book an SUV and pay the sedan fare for one leg." },
  { points: 5000, title: "Free sedan transfer", description: "One sedan leg in Zones A or B, airport access included." },
  { points: 12000, title: "Free SUV transfer", description: "One SUV leg to anywhere we cover in Lagos." },
];
const history = [
  { title: "Earned on TT-JT7K29", date: "15 Nov 2026", points: 494 },
  { title: "Earned on TT-2PULBV", date: "12 Nov 2026", points: 641 },
  { title: "Earned on TT-763ME9", date: "9 Nov 2026", points: 964 },
  { title: "Earned on TT-2S7CL3", date: "7 Nov 2026", points: 261 },
  { title: "Welcome bonus", date: "19 Jul 2026", points: 500 },
];

export function RewardsPage() {
  const formattedBalance = demoRewardsBalance.toLocaleString("en-NG");
  return (
    <DashboardShell active="rewards">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 pb-16 sm:px-10 lg:pt-10">
        <h1 className="text-dashboard-page-title font-brand">Rewards</h1>
        <p className="text-dashboard-body text-text-secondary mt-1.5">Earn 1 point for every ₦100 you spend. Redeem for discounts and free transfers.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <section aria-label="Points balance" className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-5 sm:p-8">
            <div className="flex items-center justify-between gap-3"><span className="bg-dashboard-icon-surface text-accent-600 text-dashboard-label inline-flex items-center gap-1 rounded-full px-3 py-1"><FigmaIcon name="rewards-crown" className="size-3.5" />Blue member</span><span className="text-dashboard-detail text-text-secondary">×1 earning</span></div>
            <p className="text-dashboard-detail text-text-secondary mt-8">Points balance</p>
            <p className="text-rewards-balance font-brand">{formattedBalance}</p>
            <div className="text-dashboard-detail mt-8 flex flex-wrap justify-between gap-2"><span className="text-landing-label">{formattedBalance} lifetime points</span><span className="text-text-secondary">10,000 for Silver</span></div>
            <div role="progressbar" aria-label="Progress to Silver" aria-valuemin={0} aria-valuemax={10000} aria-valuenow={demoRewardsBalance} className="bg-landing-track mt-2 h-2 overflow-hidden rounded-full"><div className="bg-brand-primary h-full rounded-full" style={{ width: `${demoRewardsBalance / 100}%` }} /></div>
          </section>
          <section aria-labelledby="tiers-title" className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-5">
            <h2 id="tiers-title" className="text-dashboard-label text-text-secondary">Tiers</h2>
            <ul className="mt-3">{tiers.map((tier, index) => <li key={tier.name} className={index === 0 ? "bg-dashboard-icon-surface flex items-center justify-between gap-3 rounded-2xl p-3" : "flex items-center justify-between gap-3 p-3"}><div className="min-w-0"><p className="text-dashboard-route font-semibold"><span className={index === 0 ? "text-accent-600" : "text-text-primary"}>{tier.name}</span><span className="text-text-secondary font-normal"> · {tier.multiplier}</span></p><p className="text-trip-detail-caption text-text-secondary">{tier.description}</p></div><span className="text-trip-detail-caption text-text-secondary shrink-0 font-(family-name:--font-geist-mono)">{tier.threshold}</span></li>)}</ul>
          </section>
        </div>
        <section className="mt-8" aria-labelledby="redeem-title">
          <h2 id="redeem-title" className="text-dashboard-label text-text-secondary">Redeem points</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">{offers.map((offer) => {
            const available = offer.points <= demoRewardsBalance;
            return <li key={offer.points} className="bg-background-primary-default shadow-dashboard-card flex min-h-[216px] flex-col rounded-[28px] p-5">
              <div className="flex items-start justify-between gap-3"><span className="bg-dashboard-icon-surface text-accent-600 grid size-11 place-items-center rounded-2xl"><FigmaIcon name={available ? "rewards-gift" : "rewards-transfer"} className="size-5" /></span><span className="text-dashboard-detail text-landing-label font-(family-name:--font-geist-mono)">{offer.points.toLocaleString("en-NG")} pts</span></div>
              <h3 className="text-rewards-offer-title mt-5">{offer.title}</h3>
              <p className="text-rewards-offer-copy text-text-secondary mt-1 flex-1">{offer.description}</p>
              <Button type="button" disabled={!available} aria-label={available ? `Redeem ${offer.title} for ${offer.points.toLocaleString("en-NG")} points` : undefined} onClick={() => toast.info("Reward redemption is not connected yet. No points have been used.")} className={available ? "from-brand-primary to-brand-primary-deep text-brand-on mt-5 h-11 w-full rounded-full bg-linear-to-b shadow-none" : "text-dashboard-body text-text-primary mt-5 h-11 w-full rounded-full bg-transparent shadow-none disabled:bg-transparent disabled:text-text-primary disabled:opacity-45"}>{available ? "Redeem" : `${(offer.points - demoRewardsBalance).toLocaleString("en-NG")} more points needed`}</Button>
            </li>;
          })}</ul>
        </section>
        <section className="mt-8" aria-labelledby="history-title">
          <h2 id="history-title" className="text-dashboard-label text-text-secondary">Points history</h2>
          <ul className="bg-background-primary-default shadow-dashboard-card mt-3 divide-y divide-separator-border overflow-hidden rounded-[28px]">{history.map((item) => <li key={item.title} className="flex items-center justify-between gap-3 px-4 py-3.5"><div><p className="text-dashboard-route font-medium">{item.title}</p><p className="text-trip-detail-caption text-text-secondary">{item.date}</p></div><span className="text-dashboard-route text-dashboard-success-text shrink-0 font-medium">+{item.points.toLocaleString("en-NG")}</span></li>)}</ul>
        </section>
      </main>
    </DashboardShell>
  );
}
