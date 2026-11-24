import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

const sizes = {
  "arrow-up": [15, 15], "arrow-white": [16, 16], avatar: [22, 22], book: [25, 22],
  "business-home": [18, 18], "business-trips": [18, 18], "business-wallet": [18, 18],
  "business-rewards": [18, 18], "business-company": [18, 18], "business-account": [18, 18],
  "business-avatar": [22, 22], "business-logout": [18, 18],
  calendar: [16, 16], "day-ride": [18, 18], dropoff: [18, 18], "dropoff-white": [16, 16],
  empty: [24, 24], logout: [18, 18], "mobile-account": [22, 22], "mobile-add": [24, 24],
  "mobile-home": [22, 22], "mobile-trips": [22, 22], "mobile-wallet": [22, 22],
  "nav-account": [18, 18], "nav-account-active": [18, 18], "nav-home": [18, 18], "nav-home-active": [18, 18],
  "nav-rewards": [18, 18], "nav-trips": [18, 18], "nav-trips-active": [18, 18],
  pickup: [18, 18], "pickup-white": [16, 16], "repeat-white": [16, 16],
  "route-arrow": [14, 14], search: [16, 16], "shield-white": [18, 18], theme: [18, 18],
} as const;

export type DashboardIconName = keyof typeof sizes;

export function DashboardIcon({ name, className }: { name: DashboardIconName; className?: string }) {
  const [width, height] = sizes[name];
  const mask = `url(/assets/dashboard-icons/${name}.svg)`;
  return <span aria-hidden="true" className={cx("inline-block shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]", className)} style={{ width, height, maskImage: mask, WebkitMaskImage: mask }} />;
}

export function DashboardSearchIcon({ className }: { className?: string }) {
  return <DashboardIcon name="search" className={cx("text-text-tertiary", className)} />;
}
