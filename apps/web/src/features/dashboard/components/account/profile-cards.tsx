"use client";

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { SegmentedControl, SegmentedControlItem } from "@THE-TRANSPORTER/ui/components/base/segmented-control/segmented-control";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { FigmaIcon } from "@/components/figma-icon";
import { AccountCard } from "./account-card";
import { formSchemas, submitDemoForm } from "@/lib/form-validation";

const initialProfile = { name: "Womo Justin", email: "womojustinnnn@gmail.com", phone: "+234 802 555 0147" };
const fieldClass = "h-12 rounded-xl border border-border-button-default bg-account-select-surface px-3.5";
const themes = [
  { id: "light", label: "Light", icon: "account-light" },
  { id: "dark", label: "Dark", icon: "account-dark" },
  { id: "system", label: "System", icon: "account-system" },
] as const;
const subscribe = () => () => {};

export function ProfileCard() {
  const [profile, setProfile] = useState(initialProfile);
  const changed = Object.keys(initialProfile).some((key) => profile[key as keyof typeof profile] !== initialProfile[key as keyof typeof profile]);
  return (
    <AccountCard title="Profile">
      <form className="mt-5 grid gap-4" onSubmit={(event) => submitDemoForm(event, formSchemas.profile, "Saving profile changes is coming soon.")}>
        <Input name="name" label="Full name" value={profile.name} onChange={(name) => setProfile({ ...profile, name })} autoComplete="name" isRequired fieldClassName={fieldClass} inputClassName="text-dashboard-body" />
        <Input name="email" label="Email" type="email" value={profile.email} onChange={(email) => setProfile({ ...profile, email })} autoComplete="email" isRequired fieldClassName={fieldClass} inputClassName="text-dashboard-body" />
        <Input name="phone" label="Phone" type="tel" value={profile.phone} onChange={(phone) => setProfile({ ...profile, phone })} autoComplete="tel" isRequired fieldClassName={fieldClass} inputClassName="text-dashboard-body" />
        <Button type="submit" disabled={!changed} className="font-landing text-dashboard-body h-11 w-fit rounded-full px-5 disabled:bg-brand-primary disabled:text-brand-on disabled:opacity-45">
          Save changes
        </Button>
      </form>
    </AccountCard>
  );
}

export function AccountTypeCard() {
  return (
    <AccountCard title="Account type" action={<span className="bg-dashboard-icon-surface text-accent-600 text-caption-1-medium rounded-full px-2.5 py-1">Individual</span>}>
      <div className="bg-account-select-surface mt-5 rounded-2xl p-4">
        <p className="text-dashboard-route text-landing-label">Book for colleagues, use cost centres.</p>
        <Button variant="ghost" onClick={() => toast.info("Business accounts are coming soon.")} className="bg-dashboard-icon-surface text-accent-600 mt-6 h-9 gap-2 rounded-full px-3.5 [&>span]:gap-2">
          <FigmaIcon name="account-business" className="size-4" /> Switch to business
        </Button>
      </div>
    </AccountCard>
  );
}

export function AppearanceCard() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  return (
    <AccountCard title="Appearance">
      <DirectionProvider locale="en-NG">
        <SegmentedControl
          aria-label="Appearance"
          selectedKeys={mounted ? [theme ?? "system"] : []}
          onSelectionChange={(keys) => { const selected = [...keys][0]; if (selected) setTheme(String(selected)); }}
          className="bg-landing-track mt-5 grid w-full grid-cols-3 gap-1 rounded-2xl"
        >
          {themes.map(({ id, label, icon }) => (
            <SegmentedControlItem key={id} id={id} className="font-landing h-11 min-w-0 gap-2 rounded-xl px-1 text-body-medium data-[selected]:bg-linear-to-b data-[selected]:from-brand-primary data-[selected]:to-brand-primary-deep data-[selected]:text-brand-on">
              <FigmaIcon name={icon} className="size-4" /> {label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </DirectionProvider>
    </AccountCard>
  );
}
