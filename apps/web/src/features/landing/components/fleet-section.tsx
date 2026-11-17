import Image from "next/image";
import { RiGroupLine, RiSuitcase3Line } from "@remixicon/react";

const vehicles = [
  { name: "Sedan", image: "/assets/fleet-sedan.jpg", passengers: 2, bags: 3 },
  { name: "SUV", image: "/assets/fleet-suv.jpg", passengers: 3, bags: 5 },
  {
    name: "Bus",
    image: "/assets/fleet-bus.jpg",
    description: "Toyota Hiace, Mercedes-Benz Sprinter or similar",
    passengers: 14,
    bags: 14,
  },
];

export function FleetSection() {
  return (
    <section id="fleet" aria-labelledby="fleet-heading" className="bg-landing-subtle scroll-mt-4">
      <div className="mx-auto grid max-w-312.5 gap-5 px-6 py-16 md:grid-cols-2 md:px-9.25 md:p
      y-[100px]">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.name}
            className="bg-fleet-deep relative h-95 overflow-hidden rounded-[30px] text-brand-on"
          >
            <Image
              src={vehicle.image}
              alt=""
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), 578px"
              className="object-cover opacity-90"
            />
            <div
              aria-hidden="true"
              className="from-fleet-deep via-hero-overlay/35 absolute inset-0 bg-linear-to-t to-transparent"
            />
            <div className="absolute inset-x-0 bottom-12 px-6">
              <h3 className="font-landing text-2xl leading-8 font-medium tracking-[-0.02em]">
                {vehicle.name}
              </h3>
              <div className="mt-1 min-h-5.25 text-sm leading-5.25 text-brand-on/65">
                {vehicle.description}
              </div>
              <div className="border-brand-on/15 text-brand-on/75 mt-5 flex flex-wrap gap-4 border-t pt-4 text-[13px] leading-[19.5px]">
                <span className="flex items-center gap-1.5">
                  <RiGroupLine className="size-4" aria-hidden="true" /> Up to {vehicle.passengers}{" "}
                  passengers
                </span>
                <span className="flex items-center gap-1.5">
                  <RiSuitcase3Line className="size-4" aria-hidden="true" /> {vehicle.bags} large
                  bags
                </span>
              </div>
            </div>
          </article>
        ))}
        <div className="bg-fleet-deep from-fleet-deep via-hero-overlay/35 relative flex h-95 items-end overflow-hidden rounded-[30px] bg-linear-to-t to-transparent p-7.5 text-brand-on">
          <h2
            id="fleet-heading"
            className="text-[clamp(42px,4.8vw,60px)] leading-none font-medium tracking-[-0.04em]"
          >
            The fleet.
          </h2>
        </div>
      </div>
    </section>
  );
}
