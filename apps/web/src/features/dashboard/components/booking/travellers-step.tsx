"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { Chip } from "@THE-TRANSPORTER/ui/components/base/badges/chip";
import { NumberField } from "@THE-TRANSPORTER/ui/components/base/number-field/number-field";
import { RadioGroup } from "@THE-TRANSPORTER/ui/components/base/radio/radio";
import { RadioCard } from "@THE-TRANSPORTER/ui/components/base/radio/radio-card";
import { Select, SelectItem } from "@THE-TRANSPORTER/ui/components/base/select/select";
import { Switch } from "@THE-TRANSPORTER/ui/components/base/switch/switch";
import { Textarea } from "@THE-TRANSPORTER/ui/components/base/textarea/textarea";
import { FigmaIcon } from "@/components/figma-icon";
import {
  demoPrices,
  validateTraveller,
  vehicleFits,
  type BookingExtras,
} from "../../lib/dropoff-booking";

export type Party = {
  passengers: number;
  largeBags: number;
  cabinBags: number;
};

const card =
  "bg-background-primary-default shadow-dashboard-card rounded-[28px] p-4 sm:p-6";
const field =
  "h-12 rounded-xl border border-border-button-default bg-account-select-surface px-3.5 shadow-none";
const switchClass =
  "shrink-0 [&>span:first-of-type]:h-7 [&>span:first-of-type]:w-12 [&>span:first-of-type>span]:start-0.5 [&>span:first-of-type>span]:top-0.5 [&>span:first-of-type>span]:size-6 [&>span:first-of-type>span>span]:hidden [&[data-selected]>span:first-of-type>span]:translate-x-5 rtl:[&[data-selected]>span:first-of-type>span]:-translate-x-5";

function Counter({
  label,
  description,
  value,
  onChange,
  min = 0,
  icon,
}: {
  label: string;
  description: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  icon?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div className="min-w-0">
        <p className="text-booking-option text-text-primary flex items-center gap-2">
          {icon && (
            <FigmaIcon
              name="booking-child-seat"
              className="size-4 text-text-secondary"
            />
          )}
          {label}
        </p>
        <p className="text-dashboard-detail text-text-secondary">
          {description}
        </p>
      </div>
      <NumberField
        label={label}
        layout="stepper"
        value={value}
        onChange={onChange}
        minValue={min}
        isWheelDisabled
        className="w-auto shrink-0 [&>label]:sr-only"
        fieldClassName="bg-account-select-surface gap-0.5"
        decrementIcon={<FigmaIcon name="booking-minus" className="size-4" />}
        incrementIcon={<FigmaIcon name="booking-plus" className="size-4" />}
      />
    </div>
  );
}

export function TravellersStep({
  hidden,
  party,
  onPartyChange,
  extras,
  onExtrasChange,
  onContinue,
  name,
  onNameChange,
  business = false,
}: {
  hidden: boolean;
  party: Party;
  onPartyChange: (party: Party) => void;
  extras: BookingExtras;
  onExtrasChange: (extras: BookingExtras) => void;
  onContinue: () => void;
  name: string;
  onNameChange: (name: string) => void;
  business?: boolean;
}) {
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [teamMember, setTeamMember] = useState("");
  const [costCentre, setCostCentre] = useState("executive");
  const [reference, setReference] = useState("");
  const errors = validateTraveller(name, phone);
  const sedanFits = vehicleFits("sedan", party);
  const suvFits = vehicleFits("suv", party);
  const busFits = vehicleFits("bus", party);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (!errors.name && !errors.phone) onContinue();
  }

  return (
    <form
      id="booking-travellers-form"
      onSubmit={submit}
      noValidate
      hidden={hidden}
      className="space-y-4"
    >
      <section className={card}>
        <h2 className="text-dashboard-section-title font-landing tracking-[-0.17px]">
          Who’s travelling?
        </h2>
        <p className="text-dashboard-route text-text-secondary mt-1">
          {business ? "Book for anyone on the team. They get their own ride phrase by SMS." : "The driver contacts this person on the day."}
        </p>
        {business && <RadioGroup aria-label="Choose a traveller" value={teamMember} onChange={(value) => {
          setTeamMember(value);
          onNameChange(value === "Someone else" ? "" : value);
          setPhone("");
        }} className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            ["Tunde Adetope", "You · account admin"],
            ["Chiamaka Eze", "chiamaka@koraenergy.ng"],
            ["Ifeanyi Obi", "ifeanyi@koraenergy.ng"],
            ["Zainab Musa", "zainab@koraenergy.ng"],
            ["Someone else", "A guest or new team member"],
          ].map(([member, description]) => <RadioCard key={member} value={member} className="bg-account-select-surface data-[selected]:bg-dashboard-icon-surface flex min-w-0 justify-start gap-3 rounded-2xl border-0 p-3">
            <FigmaIcon name="business-traveller" className="text-text-secondary size-5.5" />
            <span className="flex min-w-0 flex-col"><span className="text-dashboard-route text-text-primary font-medium">{member}</span><span className="text-trip-detail-caption text-text-secondary break-all">{description}</span></span>
          </RadioCard>)}
        </RadioGroup>}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input
            label="Lead traveller"
            value={name}
            onChange={onNameChange}
            autoComplete="name"
            isRequired
            isInvalid={attempted && errors.name}
            errorMessage={
              attempted && errors.name
                ? "Enter the lead traveller’s name."
                : undefined
            }
            fieldClassName={field}
            inputClassName="text-dashboard-body"
          />
          <Input
            label="Phone on the day"
            type="tel"
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
            isRequired
            isInvalid={attempted && errors.phone}
            errorMessage={
              attempted && errors.phone ? "Enter a phone number." : undefined
            }
            fieldClassName={field}
            inputClassName="text-dashboard-body"
          />
        </div>
        {business && <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Select label="Cost centre" selectedKey={costCentre} onSelectionChange={(key) => { if (key) setCostCentre(String(key)); }} className="w-full" triggerClassName={field} indicator={<FigmaIcon name="business-cost-chevron" className="text-text-secondary size-4" />}>
            <SelectItem id="executive" textValue="Executive office">Executive office</SelectItem>
          </Select>
          <Input label="PO or reference · optional" placeholder="e.g. PO-2291" value={reference} onChange={setReference} fieldClassName={field} inputClassName="text-dashboard-body" />
        </div>}
      </section>
      <section className={card}>
        <h2 className="text-dashboard-section-title font-landing tracking-[-0.17px]">
          Passengers and luggage
        </h2>
        <p className="text-dashboard-route text-text-secondary mt-1">
          Pricing includes a set number of passengers and bags for each vehicle.
        </p>
        <div className="mt-5 divide-y divide-separator-border">
          <div className="pb-3">
            <Counter
              label="Passengers"
              description="Including children"
              value={party.passengers}
              min={1}
              onChange={(passengers) => onPartyChange({ ...party, passengers })}
            />
          </div>
          <div className="py-3">
            <Counter
              label="Large bags"
              description="Checked suitcases"
              value={party.largeBags}
              onChange={(largeBags) => onPartyChange({ ...party, largeBags })}
            />
          </div>
          <div className="pt-3">
            <Counter
              label="Cabin bags"
              description="Carry-ons and backpacks"
              value={party.cabinBags}
              onChange={(cabinBags) => onPartyChange({ ...party, cabinBags })}
            />
          </div>
        </div>
        <div aria-live="polite" className="mt-5 flex flex-wrap gap-2">
          {sedanFits && (
            <Chip
              variant="caption"
              className="bg-booking-fit-surface text-booking-fit-text h-7 gap-1 rounded-full px-3 py-0 tracking-normal"
            >
              <FigmaIcon name="booking-fit" className="size-3.5" />
              Sedan fits
            </Chip>
          )}
          {suvFits && (
            <Chip
              variant="caption"
              className="bg-booking-fit-surface text-booking-fit-text h-7 gap-1 rounded-full px-3 py-0 tracking-normal"
            >
              <FigmaIcon name="booking-fit" className="size-3.5" />
              SUV fits
            </Chip>
          )}
          {business && busFits && <Chip variant="caption" className="bg-booking-fit-surface text-booking-fit-text h-7 gap-1 rounded-full px-3 py-0 tracking-normal"><FigmaIcon name="booking-fit" className="size-3.5" />Bus fits</Chip>}
          {!sedanFits && !suvFits && (!business || !busFits) && (
            <p className="text-dashboard-detail text-text-secondary">
              {business ? "No vehicle fits your party." : "Neither sedan nor SUV fits your party."}
            </p>
          )}
        </div>
      </section>
      <section className={card}>
        <h2 className="text-dashboard-section-title font-landing tracking-[-0.17px]">
          Extras
        </h2>
        <div className="mt-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p id="meet-greet-label" className="text-booking-option">
                Meet &amp; greet in arrivals
              </p>
              <p className="text-dashboard-detail text-text-secondary mt-0.5">
                Your driver waits inside with a name board and helps with
                trolleys.
              </p>
            </div>
            <div className="ms-auto flex shrink-0 items-center gap-3">
              <span className="text-dashboard-detail text-text-secondary font-[family-name:var(--font-geist-mono)]">
                +<span className="font-sans text-[0.9em]">₦</span>{demoPrices.meetAndGreet.toLocaleString("en-NG")}
              </span>
              <Switch
                aria-labelledby="meet-greet-label"
                isSelected={extras.meetAndGreet}
                onChange={(meetAndGreet) =>
                  onExtrasChange({ ...extras, meetAndGreet })
                }
                className={switchClass}
              />
            </div>
          </div>
          <Counter
            label="Child seats"
            description={<><span className="font-[family-name:var(--font-geist-mono)]"><span className="font-sans text-[0.9em]">₦</span>{demoPrices.childSeat.toLocaleString("en-NG")}</span> each, fitted before pickup</>}
            value={extras.childSeats}
            onChange={(childSeats) =>
              onExtrasChange({
                ...extras,
                childSeats: Number.isFinite(childSeats)
                  ? Math.max(0, Math.floor(childSeats))
                  : 0,
              })
            }
            icon
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p id="extra-stop-label" className="text-booking-option">
                An extra stop on the way
              </p>
              <p className="text-dashboard-detail text-text-secondary mt-0.5">
                Drop someone off or collect keys — up to 15 minutes.
              </p>
            </div>
            <div className="ms-auto flex shrink-0 items-center gap-3">
              <span className="text-dashboard-detail text-text-secondary font-[family-name:var(--font-geist-mono)]">
                +<span className="font-sans text-[0.9em]">₦</span>{demoPrices.extraStop.toLocaleString("en-NG")}
              </span>
              <Switch
                aria-labelledby="extra-stop-label"
                isSelected={extras.extraStop}
                onChange={(extraStop) =>
                  onExtrasChange({ ...extras, extraStop })
                }
                className={switchClass}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={card}>
        <h2 className="text-dashboard-section-title font-landing tracking-[-0.17px]">
          Note for your driver
        </h2>
        <div className="mt-5">
          <Textarea
            label="Anything that helps on the day · optional"
            placeholder="e.g. Travelling with an elderly parent, please help with bags"
            value={note}
            onChange={setNote}
            rows={3}
            resize="none"
            fieldClassName="min-h-24 rounded-xl border border-border-button-default bg-account-select-surface px-3.5 py-3"
          />
        </div>
      </section>
    </form>
  );
}
