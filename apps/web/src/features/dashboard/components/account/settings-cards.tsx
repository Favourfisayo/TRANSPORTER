"use client";

import { toast } from "sonner";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { Switch } from "@THE-TRANSPORTER/ui/components/base/switch/switch";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { FigmaIcon } from "@/components/figma-icon";
import { AccountCard } from "./account-card";
import { AddPlaceDialog, RemovePlaceDialog, ChangePasswordDialog } from "./account-dialogs";

const places = [
  { name: "Home", address: "14 Admiralty Way, Lekki Phase 1" },
  { name: "Office", address: "1415 Adetokunbo Ademola Street, Victoria Island" },
];
const notifications = [
  { name: "SMS", description: "Driver details and ride phrase", selected: true },
  { name: "WhatsApp", description: "Live updates and driver chat", selected: true },
  { name: "Email", description: "Confirmations and receipts", selected: true },
  { name: "Offers", description: "Occasional deals and reward boosts", selected: false },
];
const comingSoon = (feature: string) => toast.info(`${feature} is coming soon.`);

export function SavedPlacesCard() {
  return (
    <AccountCard title="Saved places" className="rounded-[28px] [&>div:first-child]:items-center sm:[&>div:first-child]:items-baseline" action={
      <AddPlaceDialog trigger={<Button variant="ghost" aria-label="Add place" className="bg-dashboard-icon-surface text-accent-600 size-9 rounded-full p-0 sm:w-auto sm:px-3.5 [&>span]:gap-2">
        <FigmaIcon name="account-add" className="size-4" /><span className="hidden sm:inline">Add place</span>
      </Button>} />
    }>
      <p className="text-dashboard-route text-text-secondary mt-1">Pick them in one tap when you book.</p>
      <ul className="mt-5">
        {places.map((place, index) => (
          <li key={place.name} className={cx("flex items-center gap-3", index ? "pt-3" : "border-border-button-default border-b pb-3")}>
            <FigmaIcon name="account-place" className="text-text-secondary size-4" />
            <div className="min-w-0 flex-1">
              <p className="text-body-medium">{place.name}</p>
              <p className="text-dashboard-detail text-text-secondary">{place.address}</p>
            </div>
            <RemovePlaceDialog placeName={place.name} trigger={<Button variant="secondary" aria-label={`Remove ${place.name}`} className="text-text-secondary size-9 shrink-0 rounded-full border-0 bg-transparent p-0 shadow-none">
              <FigmaIcon name="account-remove" className="size-4" />
            </Button>} />
          </li>
        ))}
      </ul>
    </AccountCard>
  );
}

export function NotificationsCard() {
  return (
    <AccountCard title="Notifications">
      <p className="text-dashboard-route text-text-secondary mt-1">How we reach you about your transfers.</p>
      <p className="text-dashboard-detail text-text-secondary mt-1">Changes aren’t saved or applied to notifications yet.</p>
      <div className="mt-5 grid gap-4">
        {notifications.map(({ name, description, selected }) => (
          <div key={name} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-body-medium">{name}</p>
              <p className="text-dashboard-detail text-text-secondary mt-1">{description}</p>
            </div>
            <Switch
              aria-label={name}
              defaultSelected={selected}
            />
          </div>
        ))}
      </div>
    </AccountCard>
  );
}

export function SecurityCard() {
  return (
    <AccountCard title="Security">
      <p className="text-dashboard-route text-text-secondary mt-5">Use at least 8 characters you don’t use anywhere else.</p>
      <ChangePasswordDialog trigger={<Button variant="secondary" className="mt-3 h-9 gap-2 rounded-full border-0 bg-transparent px-3 shadow-none [&>span]:gap-2">
        <FigmaIcon name="account-password" className="size-4" /> Change password
      </Button>} />
    </AccountCard>
  );
}

export function AppCard() {
  return (
    <AccountCard title="App">
      <p className="text-dashboard-route text-text-secondary mt-4">Open your browser menu and choose “Install app” or “Add to Home screen”.</p>
      <Button variant="secondary" onClick={() => comingSoon("Signing out")} className="text-text-error-primary mt-5 h-9 gap-2 rounded-full border-0 bg-transparent px-3 shadow-none [&>span]:gap-2">
        <FigmaIcon name="account-logout" className="size-4" /> Log out
      </Button>
    </AccountCard>
  );
}
