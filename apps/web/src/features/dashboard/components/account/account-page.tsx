"use client";

import { DashboardShell } from "../dashboard-shell";
import { ProfileCard, AccountTypeCard, AppearanceCard } from "./profile-cards";
import { SavedPlacesCard, NotificationsCard, SecurityCard, AppCard } from "./settings-cards";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { useBusinessDemo } from "../../lib/demo-role";

export function AccountPage() {
  const business = useBusinessDemo();
  return (
    <DashboardShell active="account">
      <DirectionProvider locale="en-NG">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 sm:px-10 lg:pt-10">
        <h1 className={cx("font-landing text-dashboard-page-title", business && "font-brand")}>Account</h1>
        <p className="text-dashboard-body text-text-secondary mt-1.5">Member since {business ? "19 Jul 2026" : "22 Apr 2026"}</p>
        <div className={cx("mt-8 grid items-stretch gap-5 md:grid-cols-2", business && "[&>section]:rounded-[28px] [&>div>section]:rounded-[28px] [&_h2]:font-brand")}>
          <ProfileCard key={business ? "business" : "individual"} business={business} />
          <div className="flex flex-col gap-5">
            <AccountTypeCard business={business} />
            <AppearanceCard />
          </div>
          <SavedPlacesCard business={business} />
          <NotificationsCard />
          <SecurityCard />
          <AppCard />
        </div>
      </main>
      </DirectionProvider>
    </DashboardShell>
  );
}
