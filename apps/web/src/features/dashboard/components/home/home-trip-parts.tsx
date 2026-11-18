"use client";

import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { toast } from "sonner";
import { DashboardIcon, type DashboardIconName } from "../dashboard-icon";

export const cardClass =
  "bg-background-primary-default shadow-dashboard-card rounded-[17px]";

export function unavailable(label: string) {
  toast.info(`${label} is coming soon.`);
}

export function TripIcon({ icon }: { icon: DashboardIconName }) {
  return (
    <span className="bg-dashboard-icon-surface text-brand-primary grid size-10 shrink-0 place-items-center rounded-2xl">
      <DashboardIcon name={icon} />
    </span>
  );
}

export function Status({ status }: { status: string }) {
  return (
    <span
      className={cx(
        "text-caption-1-medium inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1",
        status === "Cancelled"
          ? "bg-dashboard-danger-surface text-text-error-primary"
          : status === "Confirmed"
          ? "bg-dashboard-icon-surface text-accent-600"
            : "bg-dashboard-success-surface text-dashboard-success-text",
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
