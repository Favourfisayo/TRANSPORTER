"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import type { CalendarDate, Time } from "@internationalized/date";
import { DatePicker } from "@THE-TRANSPORTER/ui/components/base/date-picker/date-picker";
import { FileUpload } from "@THE-TRANSPORTER/ui/components/base/file-upload/file-upload";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import {
  Select,
  SelectItem,
} from "@THE-TRANSPORTER/ui/components/base/select/select";
import { TimeField } from "@THE-TRANSPORTER/ui/components/base/time-field/time-field";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { FigmaIcon } from "@/components/figma-icon";
import {
  getDemoPickupTime,
  terminals,
  validateFlight,
  type Terminal,
} from "../../lib/dropoff-booking";

const fieldClass =
  "h-12 rounded-xl border border-border-button-default bg-account-select-surface px-3.5 shadow-none";

function FlightIcon({ className }: { className?: string }) {
  return (
    <FigmaIcon name="booking-plane" className={cx(className, "size-4.5")} />
  );
}

export function FlightStep({
  hidden,
  tripType,
  area,
  terminal,
  onTerminalChange,
  onDetailsChange,
  onContinue,
}: {
  hidden: boolean;
  tripType: "pickup" | "dropoff";
  area: string;
  terminal: Terminal;
  onTerminalChange: (terminal: Terminal) => void;
  onDetailsChange: (details: {
    flight: string;
    date: string;
    time: string;
  }) => void;
  onContinue: () => void;
}) {
  const [flight, setFlight] = useState("");
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [attempted, setAttempted] = useState(false);
  const errors = validateFlight(flight, date, time);
  const isDropoff = tripType === "dropoff";
  const pickup =
    isDropoff && date && time
      ? getDemoPickupTime(date.toString(), time.toString())
      : null;
  const pickupDate = pickup ? new Date(`${pickup.date}T${pickup.time}Z`) : null;
  const pickupTimeLabel = pickupDate
    ? new Intl.DateTimeFormat("en-NG", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      }).format(pickupDate)
    : "—";
  const pickupDateLabel = pickupDate
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }).format(pickupDate)
    : "Select a flight date and time";

  function updateDetails(
    nextFlight: string,
    nextDate: CalendarDate | null,
    nextTime: Time | null,
  ) {
    onDetailsChange({
      flight: nextFlight,
      date: nextDate?.toString() ?? "",
      time: nextTime?.toString() ?? "",
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (!errors.flight && !errors.date && !errors.time) onContinue();
  }

  return (
    <form id="booking-flight-form" onSubmit={submit} noValidate hidden={hidden}>
      <section className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-6">
        <h2 className="text-dashboard-section-title tracking-[-0.17px]">
          {isDropoff ? "Your departing flight" : "Your arriving flight"}
        </h2>
        <p className="text-dashboard-route text-text-secondary mt-1">
          {isDropoff
            ? "We plan your pickup around check-in and Lagos traffic."
            : "We track it live and adjust your pickup if it’s early or late."}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input
            label="Flight number"
            placeholder="e.g. BA 75 or P4 7121"
            value={flight}
            onChange={(value) => {
              setFlight(value);
              updateDetails(value, date, time);
            }}
            isRequired
            isInvalid={attempted && errors.flight}
            errorMessage={
              attempted && errors.flight
                ? "Enter your flight number."
                : undefined
            }
            leadingIcon={FlightIcon}
            fieldClassName={fieldClass}
            inputClassName="text-dashboard-body"
            className="sm:col-span-2"
          />
          {flight.trim() && (
            <div className="bg-account-select-surface flex items-center gap-3 rounded-2xl p-3 sm:col-span-2">
              <Image
                src={isDropoff ? "/assets/dashboard-icons/booking-enugu-air.png" : "/assets/dashboard-icons/booking-emirates.png"}
                width={44}
                height={44}
                alt=""
                className="size-11 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="text-booking-airline text-text-primary wrap-break-word">
                  {isDropoff ? "Enugu Air" : "Emirates"}
                </p>
                <p className="text-dashboard-detail text-text-secondary">
                  {isDropoff
                    ? "To Enugu · scheduled 15:20"
                    : "From Dubai (DXB) · scheduled 14:05"}
                </p>
              </div>
            </div>
          )}
          <div className="sm:col-span-2">
            <Select
              label="Terminal"
              selectedKey={terminal}
              onSelectionChange={(key) => {
                if (typeof key === "string" && Object.hasOwn(terminals, key))
                  onTerminalChange(key as Terminal);
              }}
              triggerClassName={fieldClass}
              indicator={
                <FigmaIcon name="booking-chevron" className="size-4" />
              }
            >
              {(Object.keys(terminals) as Terminal[]).map((id) => (
                <SelectItem key={id} id={id} textValue={terminals[id]}>
                  {terminals[id]}
                </SelectItem>
              ))}
            </Select>
            <p className="text-dashboard-detail text-text-secondary mt-1.5">
              Set from your airline. Check your boarding pass — terminals
              occasionally change.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-dashboard-label text-landing-label">
              Flight date
            </span>
            <DatePicker
              aria-label="Flight date"
              aria-invalid={attempted && errors.date}
              aria-describedby={
                attempted && errors.date ? "flight-date-error" : undefined
              }
              value={date}
              onChange={(value) => {
                setDate(value);
                updateDetails(flight, value, time);
              }}
              className={cx(
                fieldClass,
                "w-full justify-start [&_svg]:hidden [&_span]:font-(family-name:--font-geist-mono)",
              )}
            />
            {attempted && errors.date && (
              <p
                id="flight-date-error"
                className="text-body-2-regular text-text-error-primary"
              >
                Select a flight date.
              </p>
            )}
          </div>
          <TimeField
            label={isDropoff ? "Scheduled departure" : "Scheduled landing"}
            icon={null}
            hourCycle={12}
            value={time}
            onChange={(value) => {
              setTime(value);
              updateDetails(flight, date, value);
            }}
            isRequired
            isInvalid={attempted && errors.time}
            hint={
              attempted && errors.time
                ? `Enter a ${isDropoff ? "departure" : "landing"} time.`
                : undefined
            }
            fieldClassName="h-12 rounded-xl border border-border-button-default bg-account-select-surface py-3.5 [&_[data-type]]:font-[family-name:var(--font-geist-mono)]"
          />
        </div>
        {isDropoff ? (
          <div className="bg-dashboard-icon-surface mt-4 flex min-h-49 flex-col items-start rounded-2xl p-4">
            <p className="text-dashboard-label text-accent-600">
              Set pickup time
            </p>
            <p className="text-booking-pickup-time text-text-primary mt-1">
              {pickupTimeLabel}
            </p>
            <p className="text-booking-pickup-date text-text-secondary mt-2">
              {pickupDateLabel}
            </p>
            <p className="text-dashboard-detail text-landing-label mt-auto max-w-71.5 pt-8">
              3 hours before a flight, plus about 1 h 10 min
              {area.trim() ? ` from ${area.trim()}` : ""}.
            </p>
          </div>
        ) : (
          flight.trim() && (
            <div className="bg-dashboard-icon-surface text-accent-600 font-landing mt-4 flex items-start gap-2.5 rounded-2xl px-4 py-3">
              <FigmaIcon name="booking-flight-info" className="mt-0.5 size-4" />
              <p className="text-dashboard-route">
                Your driver tracks {flight.trim().toUpperCase()} and waits up to
                60 minutes after landing at no charge.
              </p>
            </div>
          )
        )}
      </section>
      <section className="bg-background-primary-default shadow-dashboard-card mt-4 rounded-[28px] p-6">
        <h2 className="text-dashboard-section-title">E-ticket</h2>
        <p className="text-dashboard-route text-text-secondary mt-1">
          Optional. Attach it and your driver sees your passenger name and
          booking reference.
        </p>
        <div className="mt-5">
          <FileUpload
            compact
            allowedExtensions={[
              "pdf",
              "jpg",
              "jpeg",
              "png",
              "webp",
              "heic",
              "heif",
            ]}
            icon={<FigmaIcon name="booking-attachment" className="size-4" />}
          />
        </div>
      </section>
    </form>
  );
}
