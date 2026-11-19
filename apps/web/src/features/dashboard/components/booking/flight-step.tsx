"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import type { CalendarDate, Time } from "@internationalized/date";
import { DatePicker } from "@THE-TRANSPORTER/ui/components/base/date-picker/date-picker";
import { FileUpload } from "@THE-TRANSPORTER/ui/components/base/file-upload/file-upload";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { Select, SelectItem } from "@THE-TRANSPORTER/ui/components/base/select/select";
import { TimeField } from "@THE-TRANSPORTER/ui/components/base/time-field/time-field";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { FigmaIcon } from "@/components/figma-icon";
import { terminals, validateFlight, type Terminal } from "../../lib/dropoff-booking";

const fieldClass = "h-12 rounded-xl border border-border-button-default bg-account-select-surface px-3.5 shadow-none";

function FlightIcon({ className }: { className?: string }) {
  return <FigmaIcon name="booking-plane" className={cx(className, "size-[18px]")} />;
}

export function FlightStep({ hidden, terminal, onTerminalChange, onDetailsChange, onContinue }: { hidden: boolean; terminal: Terminal; onTerminalChange: (terminal: Terminal) => void; onDetailsChange: (details: { flight: string; date: string; time: string }) => void; onContinue: () => void }) {
  const [flight, setFlight] = useState("");
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [attempted, setAttempted] = useState(false);
  const errors = validateFlight(flight, date, time);
  const isEmirates = /^EK\s*\d/i.test(flight.trim());
  const isExampleFlight = /^EK\s*783$/i.test(flight.trim());

  function updateDetails(nextFlight: string, nextDate: CalendarDate | null, nextTime: Time | null) {
    onDetailsChange({ flight: nextFlight, date: nextDate?.toString() ?? "", time: nextTime?.toString() ?? "" });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (!errors.flight && !errors.date && !errors.time) onContinue();
  }

  return (
    <form id="dropoff-flight-form" onSubmit={submit} noValidate hidden={hidden}>
      <section className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-6">
        <h2 className="text-dashboard-section-title">Your arriving flight</h2>
        <p className="text-dashboard-route text-text-secondary mt-1">We track it live and adjust your pickup if it’s early or late.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Flight number" placeholder="e.g. BA 75 or P4 7121" value={flight} onChange={(value) => { setFlight(value); updateDetails(value, date, time); }} isRequired isInvalid={attempted && errors.flight} errorMessage={attempted && errors.flight ? "Enter your flight number." : undefined} leadingIcon={FlightIcon} fieldClassName={fieldClass} inputClassName="text-dashboard-body" className="sm:col-span-2" />
          {flight.trim() && <div className="bg-account-select-surface flex items-center gap-3 rounded-2xl p-3 sm:col-span-2">{isEmirates ? <Image src="/assets/dashboard-icons/booking-emirates.png" width={44} height={44} alt="" className="size-11 shrink-0 rounded-xl object-cover" /> : <div className="text-text-secondary grid size-11 shrink-0 place-items-center"><FigmaIcon name="booking-plane" className="size-5" /></div>}<div className="min-w-0"><p className="text-body-medium text-text-primary break-words">{isEmirates ? "Emirates" : flight.trim().toUpperCase()}</p><p className="text-dashboard-detail text-text-secondary">{isExampleFlight ? `From Dubai (DXB) · scheduled ${time ? time.toString().slice(0, 5) : "14:05"}` : time ? `Scheduled ${time.toString().slice(0, 5)}` : "Enter your scheduled landing time"}</p></div></div>}
          <div className="sm:col-span-2">
            <Select label="Terminal" selectedKey={terminal} onSelectionChange={(key) => { if (typeof key === "string" && Object.hasOwn(terminals, key)) onTerminalChange(key as Terminal); }} triggerClassName={fieldClass} indicator={<FigmaIcon name="booking-chevron" className="size-4" />}>
              {(Object.keys(terminals) as Terminal[]).map((id) => <SelectItem key={id} id={id} textValue={terminals[id]}>{terminals[id]}</SelectItem>)}
            </Select>
            <p className="text-dashboard-detail text-text-secondary mt-1.5">Set from your airline. Check your boarding pass — terminals occasionally change.</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-2-medium text-text-secondary">Flight date</span>
            <DatePicker aria-label="Flight date" aria-invalid={attempted && errors.date} aria-describedby={attempted && errors.date ? "flight-date-error" : undefined} value={date} onChange={(value) => { setDate(value); updateDetails(flight, value, time); }} className={cx(fieldClass, "w-full justify-start [&_svg]:hidden [&_span]:font-[family-name:var(--font-geist-mono)]")} />
            {attempted && errors.date && <p id="flight-date-error" className="text-body-2-regular text-text-error-primary">Select a flight date.</p>}
          </div>
          <TimeField label="Scheduled landing" icon={null} hourCycle={24} value={time} onChange={(value) => { setTime(value); updateDetails(flight, date, value); }} isRequired isInvalid={attempted && errors.time} hint={attempted && errors.time ? "Enter a landing time." : undefined} fieldClassName="h-12 rounded-xl border border-border-button-default bg-account-select-surface py-3.5 [&_[data-type]]:font-[family-name:var(--font-geist-mono)]" />
        </div>
        {flight.trim() && <div className="bg-dashboard-icon-surface text-accent-600 font-landing mt-4 flex items-start gap-2.5 rounded-2xl px-4 py-3"><FigmaIcon name="booking-flight-info" className="mt-0.5 size-4" /><p className="text-dashboard-route">Your driver tracks {flight.trim().toUpperCase()} and waits up to 60 minutes after landing at no charge.</p></div>}
      </section>
      <section className="bg-background-primary-default shadow-dashboard-card mt-4 rounded-[28px] p-6">
        <h2 className="text-dashboard-section-title">E-ticket</h2>
        <p className="text-dashboard-route text-text-secondary mt-1">Optional. Attach it and your driver sees your passenger name and booking reference.</p>
        <div className="mt-5"><FileUpload compact allowedExtensions={["pdf", "jpg", "jpeg", "png", "webp", "heic", "heif"]} icon={<FigmaIcon name="booking-attachment" className="size-4" />} /></div>
      </section>
    </form>
  );
}
