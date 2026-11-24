"use client";

import type { FormEvent } from "react";
import Image from "next/image";
import { RadioGroup } from "@THE-TRANSPORTER/ui/components/base/radio/radio";
import { RadioCard } from "@THE-TRANSPORTER/ui/components/base/radio/radio-card";
import { FigmaIcon } from "@/components/figma-icon";
import {
  calculateDemoEstimate,
  vehicleFits,
  vehicles,
  type BookingExtras,
  type Vehicle,
} from "../../lib/dropoff-booking";
import type { Party } from "./travellers-step";
import { NumberPopIn } from "./number-pop-in";

export function VehicleStep({
  party,
  extras,
  selected,
  onSelect,
  onContinue,
  business = false,
}: {
  party: Party;
  extras: BookingExtras;
  selected: Vehicle | null;
  onSelect: (vehicle: Vehicle) => void;
  onContinue: () => void;
  business?: boolean;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected && vehicleFits(selected, party)) onContinue();
  }

  return (
    <form id="booking-vehicle-form" onSubmit={submit}>
      <section className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-6">
        <h2 className="text-dashboard-section-title tracking-[-0.17px]">
          Choose your vehicle
        </h2>
        <p className="text-dashboard-route text-text-secondary mt-1">
          Prices include airport access and everything you’ve added so far.
        </p>
        <RadioGroup
          aria-label="Choose your vehicle"
          value={selected}
          onChange={(value) => onSelect(value as Vehicle)}
          className="mt-5 gap-2.5"
        >
          {(Object.keys(vehicles) as Vehicle[]).map((id) => {
            const vehicle = vehicles[id];
            const fits = vehicleFits(id, party);
            return (
              <RadioCard
                key={id}
                value={id}
                isDisabled={!fits}
                className="bg-account-select-surface data-[selected]:bg-dashboard-icon-surface data-[selected]:border-brand-primary flex items-center justify-start gap-4 rounded-[22px] border-2 border-transparent p-2 data-[selected]:border-2"
              >
                <Image
                  src={vehicle.image}
                  width={144}
                  height={96}
                  alt=""
                  className="h-24 w-24 shrink-0 rounded-[14px] object-cover sm:w-36"
                />
                <span className="flex min-w-0 flex-1 flex-col py-0.5 pe-1.5">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-headline-semibold text-text-primary">
                      {vehicle.name}
                    </span>
                    <span className="flex shrink-0 flex-col items-end">
                      <span className="text-dashboard-section-title text-text-primary font-[family-name:var(--font-geist-mono)]">
                        <span
                          aria-hidden="true"
                          className="font-sans text-[0.9em]"
                        >
                          ₦
                        </span>
                        <NumberPopIn
                          value={calculateDemoEstimate(extras, id, business)}
                          label={`${vehicle.name} total`}
                          announce={false}
                        />
                      </span>
                      <span className="text-caption-1-regular text-text-secondary">
                        total
                      </span>
                    </span>
                  </span>
                  <span className="text-dashboard-detail text-text-secondary mt-0.5">
                    {vehicle.description}
                  </span>
                  <span className="text-caption-1-regular text-text-secondary mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1">
                      <FigmaIcon
                        name="vehicle-passengers"
                        className="size-3.5"
                      />
                      Up to {vehicle.passengers}
                    </span>
                    <span className="flex items-center gap-1">
                      <FigmaIcon name="vehicle-bags" className="size-3.5" />
                      {vehicle.largeBags} large bags
                    </span>
                  </span>
                  {!fits && (
                    <span className="text-caption-1-regular text-text-secondary mt-1">
                      Does not fit your passengers or large bags.
                    </span>
                  )}
                </span>
              </RadioCard>
            );
          })}
        </RadioGroup>
        {!selected && (
          <p className="text-dashboard-detail text-text-secondary mt-3">
            Choose a vehicle that fits your party. If none fits, return to
            Travellers to adjust it.
          </p>
        )}
      </section>
    </form>
  );
}
