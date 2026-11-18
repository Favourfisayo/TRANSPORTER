"use client";

import type { ReactNode } from "react";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

/** BoardUI dashboard sidebar, tailored for the Transporter account shell. */
export function DashboardSidebar({
  header,
  action,
  navigation,
  footer,
  collapsed,
  onToggle,
  className,
}: {
  header: ReactNode;
  action: ReactNode;
  navigation: ReactNode;
  footer: ReactNode;
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <aside
      className={cx(
        "bg-background-primary-default border-border-button-default relative hidden shrink-0 flex-col border-e py-5 transition-[width] duration-300 motion-reduce:transition-none lg:sticky lg:top-0 lg:flex lg:h-screen",
        collapsed ? "w-20 px-3" : "w-68 px-4",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {header}
        {action}
        <nav aria-label="Dashboard navigation" className="flex flex-col gap-0.5">
          {navigation}
        </nav>
      </div>
      <div className="mt-auto flex flex-col gap-4 pt-8">{footer}</div>
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        className="group absolute -end-2 top-1/2 z-10 grid h-16 w-4 -translate-y-1/2 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-border-focus-ring"
      >
        <span
          aria-hidden="true"
          className="bg-border-button-default group-hover:bg-accent-600 group-focus-visible:bg-accent-600 h-8 w-1 rounded-full transition-colors motion-reduce:transition-none"
        />
      </button>
    </aside>
  );
}
