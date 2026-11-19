import { DashboardShell } from "../dashboard-shell";
import { ProfileCard, AccountTypeCard, AppearanceCard } from "./profile-cards";
import { SavedPlacesCard, NotificationsCard, SecurityCard, AppCard } from "./settings-cards";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";

export function AccountPage() {
  return (
    <DashboardShell active="account">
      <DirectionProvider locale="en-NG">
      <main className="mx-auto w-full max-w-5xl px-5 pt-8 sm:px-10 lg:pt-10">
        <h1 className="font-landing text-dashboard-page-title">Account</h1>
        <p className="text-dashboard-body text-text-secondary mt-1.5">Member since 22 Apr 2026</p>
        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
          <ProfileCard />
          <div className="flex flex-col gap-5">
            <AccountTypeCard />
            <AppearanceCard />
          </div>
          <SavedPlacesCard />
          <NotificationsCard />
          <SecurityCard />
          <AppCard />
        </div>
      </main>
      </DirectionProvider>
    </DashboardShell>
  );
}
