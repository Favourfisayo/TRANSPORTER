import type { ReactNode } from "react";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";

export function AccountCard({ title, children, className, action }: { title: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section aria-label={title} className={cx("bg-background-primary-default shadow-dashboard-card rounded-[17px] p-6", className)}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-landing text-dashboard-section-title">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
