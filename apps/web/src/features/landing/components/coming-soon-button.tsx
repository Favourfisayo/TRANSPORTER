"use client";

import { Button } from "@THE-TRANSPORTER/ui/components/button";
import { toast } from "sonner";
import type { ReactNode } from "react";

export function ComingSoonButton({
  children,
  className,
  feature,
}: {
  children: ReactNode;
  className: string;
  feature: string;
}) {
  return (
    <Button className={className} onClick={() => toast.info(`${feature} is coming soon.`)}>
      {children}
    </Button>
  );
}
