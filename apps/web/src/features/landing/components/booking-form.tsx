"use client";

import { useState, type FormEvent } from "react";
import type { CalendarDate, Time } from "@internationalized/date";
import { FigmaIcon } from "@/components/figma-icon";

import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { DatePicker } from "@THE-TRANSPORTER/ui/components/base/date-picker/date-picker";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { NumberField } from "@THE-TRANSPORTER/ui/components/base/number-field/number-field";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@THE-TRANSPORTER/ui/components/base/segmented-control/segmented-control";
import { Select, SelectItem } from "@THE-TRANSPORTER/ui/components/base/select/select";
import { TimeField } from "@THE-TRANSPORTER/ui/components/base/time-field/time-field";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

import { validateBookingFields } from "../lib/booking-form";

const modes = [
  { value: "pickup", label: "Pickup", icon: "hero-pickup" },
  { value: "dropoff", label: "Drop-off", icon: "hero-dropoff" },
  { value: "roundtrip", label: "Round trip", icon: "hero-roundtrip" },
] as const;

function LocationIcon({ className }: { className?: string }) {
  return <FigmaIcon name="hero-location" className={className} />;
}

const fieldClass =
  "h-12 rounded-xl border-0 bg-background-tertiary-default px-3.5 shadow-none hover:bg-background-tertiary-default";
const labelClass = "[&_[data-label]]:text-caption-1-medium [&_[data-label]]:text-text-secondary";

export function BookingForm() {
  const [mode, setMode] = useState<(typeof modes)[number]["value"]>("pickup");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [attempted, setAttempted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const fields = { location, date: date?.toString() ?? "", time: time?.toString() ?? "" };
  const errors = attempted ? validateBookingFields(fields) : {};
  const locationLabel =
    mode === "pickup"
      ? "Destination in Lagos"
      : mode === "dropoff"
        ? "Pickup location in Lagos"
        : "Location in Lagos";
  const timeLabel = mode === "pickup" ? "Landing time" : "Flight time";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setUnavailable(Object.keys(validateBookingFields(fields)).length === 0);
  }

  return (
    <DirectionProvider locale="en-NG">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="font-landing w-full max-w-[565px] [&_button]:font-landing"
      >
        <SegmentedControl
          aria-label="Trip type"
          selectedKeys={[mode]}
          onSelectionChange={(keys) => {
            const selected = modes.find((item) => keys.has(item.value));
            if (selected) setMode(selected.value);
            setUnavailable(false);
          }}
          className="grid w-full grid-cols-3 gap-1 rounded-2xl"
        >
          {modes.map(({ value, label, icon }) => (
            <SegmentedControlItem
              key={value}
              id={value}
              className="h-11 gap-2 rounded-xl px-1 text-body-2-medium motion-reduce:transition-none"
            >
              <FigmaIcon name={icon} className="size-4 max-[360px]:hidden" />
              {label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
        <div className="grid gap-3 px-3 pt-4 sm:grid-cols-2">
          <Select
            label="Terminal"
            name="terminal"
            defaultSelectedKey="mmia"
            className={labelClass}
            triggerClassName={fieldClass}
            indicator={<FigmaIcon name="hero-chevron" className="text-text-secondary size-4" />}
            popoverClassName="font-landing [&_button]:font-landing"
            onSelectionChange={() => setUnavailable(false)}
          >
            <SelectItem id="mmia" textValue="MMIA International Terminal">
              MMIA International Terminal
            </SelectItem>
            <SelectItem id="mma2" textValue="MMA2 Domestic Terminal">
              MMA2 Domestic Terminal
            </SelectItem>
            <SelectItem id="gat" textValue="GAT Domestic Terminal">
              GAT Domestic Terminal
            </SelectItem>
          </Select>
          <Input
            label={locationLabel}
            value={location}
            onChange={(value) => {
              setLocation(value);
              setUnavailable(false);
            }}
            placeholder="e.g. Lekki Phase 1"
            leadingIcon={LocationIcon}
            isInvalid={!!errors.location}
            errorMessage={errors.location}
            className={labelClass}
            fieldClassName={fieldClass}
            inputClassName="font-landing"
          />
          <div className="flex flex-col gap-1">
            <span className="text-caption-1-medium text-text-secondary">Flight date</span>
            <DatePicker
              aria-label="Flight date"
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "booking-date-error" : undefined}
              value={date}
              onChange={(value) => {
                setDate(value);
                setUnavailable(false);
              }}
              className={cx(fieldClass, "w-full justify-start")}
              popoverClassName="font-landing [&_button]:font-landing [&_input]:font-landing"
            />
            {errors.date && (
              <p id="booking-date-error" className="text-caption-1-medium text-text-error-primary">
                {errors.date}
              </p>
            )}
          </div>
          <TimeField
            label={timeLabel}
            hourCycle={24}
            value={time}
            onChange={(value) => {
              setTime(value);
              setUnavailable(false);
            }}
            isInvalid={!!errors.time}
            hint={errors.time}
            className={labelClass}
            fieldClassName="h-12 rounded-xl bg-background-tertiary-default py-3.5"
          />
        </div>
        <div className="grid gap-4 px-4 pt-5 sm:grid-cols-2 sm:gap-8">
          <NumberField
            label="Passengers"
            layout="stepper"
            decrementIcon={<FigmaIcon name="hero-minus" className="size-4" />}
            incrementIcon={<FigmaIcon name="hero-plus" className="size-4" />}
            defaultValue={2}
            minValue={1}
            onChange={() => setUnavailable(false)}
          />
          <NumberField
            label="Large bags"
            layout="stepper"
            decrementIcon={<FigmaIcon name="hero-minus" className="size-4" />}
            incrementIcon={<FigmaIcon name="hero-plus" className="size-4" />}
            defaultValue={2}
            minValue={0}
            onChange={() => setUnavailable(false)}
          />
        </div>
        <div className="px-3 pt-7">
          <Button
            type="submit"
            className="font-landing border-brand-action-border from-brand-primary to-brand-primary-deep text-body-medium text-brand-on shadow-booking-action h-14 w-full rounded-[18px] border bg-linear-[186deg] from-[29.89%] to-[73.56%]"
          >
            Book a ride
          </Button>
          <p role="status" className="text-body-2-regular text-text-secondary mt-3">
            {unavailable ? "Booking is not available yet. Your details have not been sent." : ""}
          </p>
        </div>
      </form>
    </DirectionProvider>
  );
}
