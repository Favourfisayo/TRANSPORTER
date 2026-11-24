"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { FigmaIcon } from "@/components/figma-icon";
import { DashboardShell } from "../dashboard-shell";

const card = "bg-background-primary-default shadow-dashboard-card rounded-[28px] p-5 sm:p-6";
const field = "h-12 rounded-xl border border-border-button-default bg-account-select-surface px-3.5 shadow-none";
const rows = [
  { name: "Chiamaka Eze", flight: "QR 1405", detail: "15 Nov 2026 · Sales — Lagos · TT-JT7K29", amount: "₦49,400" },
  { name: "Tunde Adetope", flight: "BA 74", detail: "12 Nov 2026 · Executive office · TT-2PULBV", amount: "₦64,125" },
  { name: "Zainab Musa", flight: "ET 901", detail: "9 Nov 2026 · Projects — Lekki · TT-763ME9", amount: "₦96,425" },
  { name: "Ifeanyi Obi", flight: "W3 336", detail: "7 Nov 2026 · Projects — Lekki · TT-2S7CL3", amount: "₦26,125" },
];
const spend = [
  { name: "Executive office", amount: "₦64,125", percent: 52.3 },
  { name: "Sales — Lagos", amount: "₦49,400", percent: 40.3 },
  { name: "Projects — Lekki", amount: "₦122,550", percent: 100 },
];
const travellers = [
  { initials: "TB", name: "Tunde Adetope", email: "tundeadetope@koraenergy.ng", admin: true },
  { initials: "CE", name: "Chiamaka Eze", email: "chiamakaeze@koraenergy.ng" },
  { initials: "IO", name: "Ifeanyi Obi", email: "ifeanyiobi@koraenergy.ng" },
  { initials: "ZM", name: "Zainab Musa", email: "zainabmusa@koraenergy.ng" },
];
const unavailable = (feature: string) => toast.info(`${feature} is coming soon.`);

export function BusinessPage() {
  const [centre, setCentre] = useState("");
  const [details, setDetails] = useState({ name: "Kora Energy Ltd", registration: "RC 1849302", email: "accounts@koraenergy.ng" });
  function saveDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    unavailable("Saving company details");
  }
  return (
    <DashboardShell active="business">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 pb-16 sm:px-10 lg:pt-10">
        <Image src="/assets/business-logo.png" width={47} height={44} alt="" className="h-11 w-[47px] rounded-xl object-cover" />
        <h1 className="text-dashboard-page-title font-brand">Kora Energy Ltd</h1>
        <p className="text-dashboard-body text-text-secondary mt-1.5">Business account · team, billing and cost centres</p>
        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <section className={card} aria-labelledby="statement-title">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><h2 id="statement-title" className="text-dashboard-section-title">November 2026 statement</h2><p className="text-dashboard-route text-text-secondary mt-1">4 transfers · ₦236,075 total</p></div>
              <Button variant="ghost" onClick={() => unavailable("Statement printing")} className="text-dashboard-label text-text-primary h-9 rounded-full bg-transparent px-3.5 shadow-none [&>span]:gap-2"><FigmaIcon name="business-print" className="size-4" />Print</Button>
            </div>
            <div className="bg-account-select-surface mt-5 rounded-2xl p-4">
              <div className="text-dashboard-route flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"><span className="text-landing-label">Invoiced this month</span><span className="font-semibold">₦236,075 <span className="text-text-secondary font-normal">of ₦2,000,000</span></span></div>
              <div role="progressbar" aria-label="Monthly invoiced amount" aria-valuemin={0} aria-valuemax={2000000} aria-valuenow={236075} className="bg-landing-track mt-3 h-2 overflow-hidden rounded-full"><div className="bg-brand-primary h-full w-[11.80375%] rounded-full" /></div>
              <p className="text-trip-detail-caption text-text-secondary mt-2">Invoice issued on the 1st to accounts@demo.koraenergy.ng, payable within 14 days.</p>
            </div>
            <ul className="mt-5 divide-y divide-separator-border">
              {rows.map((row) => <li key={row.flight} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0"><p className="text-dashboard-route font-medium">{row.name} · <span className="font-(family-name:--font-geist-mono)">{row.flight}</span></p><p className="text-trip-detail-caption text-text-secondary mt-0.5 wrap-break-word">{row.detail}</p></div>
                <div className="shrink-0 text-end"><p className="text-dashboard-route font-semibold">{row.amount}</p><p className="text-trip-phrase-label text-text-secondary">Invoice</p></div>
              </li>)}
            </ul>
          </section>
          <div className="flex flex-col gap-5">
            <section className={card} aria-labelledby="spend-title">
              <h2 id="spend-title" className="text-dashboard-section-title">Spend by cost centre</h2>
              <ul className="mt-4 space-y-3">{spend.map((item) => <li key={item.name}><div className="text-dashboard-detail flex justify-between gap-2"><span className="text-landing-label">{item.name}</span><span>{item.amount}</span></div><div className="bg-landing-track mt-1.5 h-2 overflow-hidden rounded-full"><div className="bg-brand-primary h-full rounded-full" style={{ width: `${item.percent}%` }} /></div></li>)}</ul>
              <form className="mt-5 flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); if (centre.trim()) unavailable("Adding cost centres"); }}>
                <Input aria-label="Add a cost centre" placeholder="Add a cost centre" value={centre} onChange={setCentre} className="min-w-0 flex-1" fieldClassName={field} />
                <Button type="submit" variant="ghost" aria-label="Add cost centre" className="bg-dashboard-icon-surface text-accent-600 size-12 shrink-0 rounded-full p-0"><FigmaIcon name="business-cost-add" className="size-4" /></Button>
              </form>
              <ul className="mt-3 flex flex-wrap gap-2">{spend.map((item) => <li key={item.name} className="bg-landing-track text-dashboard-detail text-landing-label inline-flex h-8 items-center gap-1 rounded-full ps-3 pe-1">{item.name}<Button variant="ghost" aria-label={`Remove ${item.name}`} onClick={() => unavailable("Removing cost centres")} className="size-6 rounded-full bg-transparent p-0 shadow-none"><FigmaIcon name="business-cost-remove" className="size-3.5" /></Button></li>)}</ul>
            </section>
            <section className={card} aria-labelledby="company-details-title">
              <h2 id="company-details-title" className="text-dashboard-section-title">Company details</h2>
              <form className="mt-4 grid gap-4" onSubmit={saveDetails}>
                <Input label="Registered name" value={details.name} onChange={(name) => setDetails({ ...details, name })} isRequired fieldClassName={field} />
                <Input label="RC or BN number" value={details.registration} onChange={(registration) => setDetails({ ...details, registration })} isRequired fieldClassName={field} />
                <Input label="Billing email" type="email" value={details.email} onChange={(email) => setDetails({ ...details, email })} isRequired fieldClassName={field} />
                <Button type="submit" className="from-brand-primary to-brand-primary-deep text-brand-on h-11 w-fit rounded-full bg-linear-to-b px-5">Save details</Button>
              </form>
            </section>
          </div>
        </div>
        <section className={cx(card, "mt-5")} aria-labelledby="travellers-title">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 id="travellers-title" className="text-dashboard-section-title">Travellers</h2><p className="text-dashboard-route text-text-secondary mt-1">People you can book transfers for. Each gets their own ride phrase.</p></div><Button variant="ghost" onClick={() => unavailable("Adding travellers")} className="bg-dashboard-icon-surface text-accent-600 h-9 rounded-full px-3.5 [&>span]:gap-2"><FigmaIcon name="business-add-traveller" className="size-4" />Add traveller</Button></div>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">{travellers.map((traveller) => <li key={traveller.email} className="bg-account-select-surface flex min-w-0 items-center gap-3 rounded-2xl p-3"><span className="bg-dashboard-icon-surface text-accent-600 text-body-semibold grid size-10 shrink-0 place-items-center rounded-full">{traveller.initials}</span><div className="min-w-0 flex-1"><p className="text-dashboard-route flex flex-wrap items-center gap-2 font-medium">{traveller.name}{traveller.admin && <span className="bg-dashboard-icon-surface text-accent-600 text-trip-phrase-label rounded-full px-2 py-0.5">Admin</span>}</p><p className="text-trip-detail-caption text-text-secondary wrap-break-word">{traveller.email} · 1 trip</p></div>{!traveller.admin && <Button variant="ghost" aria-label={`Remove ${traveller.name}`} onClick={() => unavailable("Removing travellers")} className="text-text-secondary size-9 shrink-0 rounded-full bg-transparent p-0 shadow-none"><FigmaIcon name="business-remove-traveller" className="size-4" /></Button>}</li>)}</ul>
        </section>
      </main>
    </DashboardShell>
  );
}
