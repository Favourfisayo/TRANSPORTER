"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import {
  ComboBox,
  ComboBoxItem,
} from "@THE-TRANSPORTER/ui/components/base/combobox/combobox";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { FigmaIcon } from "@/components/figma-icon";
import { DashboardShell } from "../dashboard-shell";
import { BookingProgress } from "./booking-progress";
import { FlightStep } from "./flight-step";
import { TravellersStep, type Party } from "./travellers-step";
import { VehicleStep } from "./vehicle-step";
import { PayStep } from "./pay-step";
import { PriceBreakdown } from "./price-breakdown";
import { NumberPopIn } from "./number-pop-in";
import {
  calculateDemoEstimate,
  formatFlightSummary,
  getDemoPickupTime,
  rewardPoints,
  showEstimate,
  terminals,
  validateDropoff,
  vehicleFits,
  vehicles,
  type BookingExtras,
  type Terminal,
  type Vehicle,
} from "../../lib/dropoff-booking";

const areas = ["Victoria Island", "Lekki Phase 1", "Ikeja GRA"];
const fieldClass =
  "h-12 rounded-xl border border-border-button-default bg-account-select-surface px-3.5 shadow-none";

function LocationIcon({ className }: { className?: string }) {
  return (
    <FigmaIcon
      name="booking-location"
      className={cx(className, "size-4.5")}
    />
  );
}

export function BookingPage({ tripType }: { tripType: "pickup" | "dropoff" }) {
  const isPickup = tripType === "pickup";
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [step, setStep] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [flightDetails, setFlightDetails] = useState({
    flight: "",
    date: "",
    time: "",
  });
  const [terminal, setTerminal] = useState<Terminal>("mmia");
  const [traveller, setTraveller] = useState("");
  const [party, setParty] = useState<Party>({
    passengers: 1,
    largeBags: 0,
    cabinBags: 0,
  });
  const [extras, setExtras] = useState<BookingExtras>({
    meetAndGreet: false,
    childSeats: 0,
    extraStop: false,
  });
  const [vehicle, setVehicle] = useState<Vehicle>("suv");
  const errors = validateDropoff(area, address);
  const selectedVehicle = vehicleFits(vehicle, party) ? vehicle : null;
  const pickupTime = getDemoPickupTime(flightDetails.date, flightDetails.time);
  const total = selectedVehicle
    ? calculateDemoEstimate(extras, selectedVehicle)
    : null;

  function reset() {
    setArea("");
    setAddress("");
    setLandmark("");
    setAttempted(false);
    setStep(0);
    setResetCount((value) => value + 1);
    setFlightDetails({ flight: "", date: "", time: "" });
    setTerminal("mmia");
    setTraveller("");
    setParty({ passengers: 1, largeBags: 0, cabinBags: 0 });
    setExtras({ meetAndGreet: false, childSeats: 0, extraStop: false });
    setVehicle("suv");
  }

  function continueToFlight(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (!errors.area && !errors.address) setStep(1);
  }

  return (
    <DashboardShell active="home">
      <DirectionProvider locale="en-NG">
        <main className="mx-auto w-full max-w-5xl px-5 pt-8 sm:px-10 lg:pt-10">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              {step === 0 ? (
                <Link
                  href={{ pathname: "/dashboard" }}
                  aria-label="Back to dashboard"
                  className="text-landing-label grid size-8 shrink-0 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-border-focus-ring"
                >
                  <FigmaIcon name="booking-back" className="size-5" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  aria-label={
                    step === 1
                      ? "Back to trip details"
                      : step === 2
                        ? "Back to flight details"
                        : step === 3
                          ? "Back to traveller details"
                          : "Back to vehicle selection"
                  }
                  className="text-landing-label grid size-8 shrink-0 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-border-focus-ring"
                >
                  <FigmaIcon name="booking-back" className="size-5" />
                </button>
              )}
              <h1 className="text-title-3-semibold whitespace-nowrap sm:text-booking-title">
                <span className="sm:hidden">{isPickup ? "Book a pickup" : "Book a drop-off"}</span>
                <span className="hidden sm:inline">
                  {isPickup ? "Book an airport pickup" : "Book an airport drop-off"}
                </span>
              </h1>
            </div>
            <Button
              variant="secondary"
              onClick={reset}
              className="text-landing-label h-9 shrink-0 rounded-full border-0 bg-transparent px-1 shadow-none sm:px-3 [&>span]:gap-1.5"
            >
              <FigmaIcon name="booking-reset" className="size-3.5" /> Start over
            </Button>
          </div>
          <div className="mt-6">
            <BookingProgress current={step} />
          </div>
          <div className="mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.47fr)_minmax(0,1fr)]">
            <div>
              <form
                id="booking-trip-form"
                onSubmit={continueToFlight}
                noValidate
                hidden={step !== 0}
                className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-6 sm:pb-21 **:data-label:text-dashboard-label"
              >
                <h2 className="text-dashboard-section-title">
                  {isPickup ? "Where are you going?" : "Where should we pick you up?"}
                </h2>
                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  <ComboBox
                    label="Area"
                    className="gap-1.5 sm:pb-6.5"
                    placeholder={isPickup ? "Search e.g. Ikoyi" : "Search an area"}
                    allowsCustomValue
                    isRequired
                    inputValue={area}
                    onInputChange={setArea}
                    selectedKey={areas.includes(area) ? area : null}
                    onSelectionChange={(key) => {
                      if (key) setArea(String(key));
                    }}
                    isInvalid={attempted && errors.area}
                    hint={
                      attempted && errors.area
                        ? isPickup ? "Enter a destination area." : "Enter a pickup area."
                        : undefined
                    }
                    leadingIcon={LocationIcon}
                    fieldClassName={fieldClass}
                    inputClassName="text-dashboard-body"
                    indicator={
                      <FigmaIcon name="booking-chevron" className="size-4" />
                    }
                  >
                    {areas.map((item) => (
                      <ComboBoxItem key={item} id={item} textValue={item}>
                        {item}
                      </ComboBoxItem>
                    ))}
                  </ComboBox>
                  <Input
                    label="Street address"
                    placeholder={isPickup ? "House number and street" : "Enter your street address"}
                    value={address}
                    onChange={setAddress}
                    isRequired
                    isInvalid={attempted && errors.address}
                    errorMessage={
                      attempted && errors.address
                        ? "Enter a street address."
                        : undefined
                    }
                    fieldClassName={fieldClass}
                    inputClassName="text-dashboard-body"
                    className="gap-1.5"
                  />
                  <Input
                    label="Landmark, estate or gate · optional"
                    placeholder="e.g. Opposite the filling station, Gate B"
                    value={landmark}
                    onChange={setLandmark}
                    fieldClassName={fieldClass}
                    inputClassName="text-dashboard-body"
                    className="gap-1.5 sm:col-span-2"
                  />
                </div>
              </form>
              <FlightStep
                key={`flight-${resetCount}`}
                hidden={step !== 1}
                tripType={tripType}
                area={area}
                terminal={terminal}
                onTerminalChange={setTerminal}
                onDetailsChange={setFlightDetails}
                onContinue={() => setStep(2)}
              />
              <TravellersStep
                key={`travellers-${resetCount}`}
                hidden={step !== 2}
                name={traveller}
                onNameChange={setTraveller}
                party={party}
                onPartyChange={setParty}
                extras={extras}
                onExtrasChange={setExtras}
                onContinue={() => setStep(3)}
              />
              {step === 3 && (
                <VehicleStep
                  party={party}
                  extras={extras}
                  selected={selectedVehicle}
                  onSelect={setVehicle}
                  onContinue={() => setStep(4)}
                />
              )}
              {step === 4 && selectedVehicle && (
                <PayStep
                  tripType={tripType}
                  flight={flightDetails}
                  terminal={terminals[terminal]}
                  area={area}
                  address={address}
                  traveller={traveller}
                  party={party}
                  vehicle={selectedVehicle}
                  extras={extras}
                  onEditFlight={() => setStep(1)}
                  onChangeVehicle={() => setStep(3)}
                />
              )}
            </div>
            <aside
              aria-label="Your transfer"
              className="bg-background-primary-default shadow-dashboard-card rounded-[28px] p-5"
            >
              <h2 className="text-caption-1-regular text-text-secondary font-(family-name:--font-geist-mono) tracking-[0.16em] uppercase">
                Your transfer
              </h2>
              <dl className="text-dashboard-route mt-4 grid gap-3 [&_dd]:font-medium">
                <div className="flex justify-between gap-4">
                  <dt className="text-text-secondary">Trip</dt>
                  <dd className="text-end">{isPickup ? "Airport pickup" : "Airport Drop-off"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-secondary">Lagos</dt>
                  <dd className="text-end">{area.trim() || "—"}</dd>
                </div>
                {!isPickup && <div className="flex justify-between gap-4">
                  <dt className="text-text-secondary">Pickup</dt>
                  <dd className="text-end">{address.trim() || "—"}</dd>
                </div>}
                {(isPickup || step > 0) && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-secondary">{isPickup ? "Pickup" : "Drop-off"}</dt>
                    <dd className="text-end">
                      {formatFlightSummary(
                        flightDetails.flight,
                        isPickup ? flightDetails.date : pickupTime?.date ?? "",
                        isPickup ? flightDetails.time : pickupTime?.time ?? "",
                      ) || "—"}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-text-secondary">Party</dt>
                  <dd className="text-end">
                    {step >= 2
                      ? `${party.passengers} pax · ${party.largeBags + party.cabinBags} bags`
                      : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-secondary">Vehicle</dt>
                  <dd>
                    {step >= 3 && selectedVehicle
                      ? vehicles[selectedVehicle].name
                      : "—"}
                  </dd>
                </div>
              </dl>
              {step >= 3 && selectedVehicle && total !== null && (
                <div className="border-separator-border mt-5 border-t pt-4">
                  <PriceBreakdown vehicle={selectedVehicle} extras={extras} />
                </div>
              )}
              {step === 4 && total !== null ? (
                <div className="mt-5">
                  <Button
                    type="button"
                    aria-label={`Pay ₦${total.toLocaleString("en-NG")}`}
                    onClick={() =>
                      toast.info(
                        "Payment is not connected yet. No booking has been made.",
                      )
                    }
                    className="bg-brand-primary text-brand-on h-14 w-full rounded-[17px] text-[16px] leading-6 font-medium"
                  >
                    <span className="inline-flex items-baseline gap-1">
                      <span>Pay</span>
                      <span
                        aria-hidden="true"
                        className="font-(family-name:--font-geist-mono)"
                      >
                        <span className="font-sans text-[0.9em]">₦</span>
                        <NumberPopIn
                          value={total}
                          label="Total"
                          announce={false}
                        />
                      </span>
                    </span>
                  </Button>
                  <p className="text-caption-1-regular text-text-secondary mt-4 text-center">
                    You’ll earn {rewardPoints(total).toLocaleString("en-NG")}{" "}
                    points on this trip.
                  </p>
                </div>
              ) : (
                <div className="bg-hero-overlay text-brand-on mt-5 rounded-[21px] p-1.5">
                  <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                    <span className="text-dashboard-detail opacity-70">
                      {step === 3 ? "Total" : "Estimate"}
                    </span>
                    {showEstimate(step, flightDetails) &&
                    (step !== 3 || total !== null) ? (
                      <span className="text-dashboard-section-title inline-flex items-baseline gap-1">
                        {step !== 3 && <span>From</span>}
                        <span className="font-(family-name:--font-geist-mono) font-medium">
                          <span
                            aria-hidden="true"
                            className="font-sans text-[0.9em]"
                          >
                            ₦
                          </span>
                          <NumberPopIn
                            value={
                              step === 3 && total !== null
                                ? total
                                : calculateDemoEstimate(extras)
                            }
                            label={step === 3 ? "Total" : "Estimate"}
                          />
                        </span>
                      </span>
                    ) : (
                      <span className="text-dashboard-section-title">—</span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    form={
                      step === 0
                        ? "booking-trip-form"
                        : step === 1
                          ? "booking-flight-form"
                          : step === 2
                            ? "booking-travellers-form"
                            : "booking-vehicle-form"
                    }
                    disabled={step >= 3 && !selectedVehicle}
                    className="bg-brand-primary text-brand-on font-landing h-14 w-full rounded-[17px]"
                  >
                    {step === 0
                      ? "Continue to flight"
                      : step === 1
                        ? "Continue to travellers"
                        : step === 2
                          ? "Continue to vehicle"
                          : "Continue to pay"}
                  </Button>
                </div>
              )}
            </aside>
          </div>
        </main>
      </DirectionProvider>
    </DashboardShell>
  );
}
