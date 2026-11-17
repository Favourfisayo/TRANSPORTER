"use client";

import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiLoader4Line,
  RiCloseCircleLine,
  RiErrorWarningLine,
} from "@remixicon/react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <RiCheckboxCircleLine className="size-4" aria-hidden="true" />,
        info: <RiInformationLine className="size-4" aria-hidden="true" />,
        warning: <RiErrorWarningLine className="size-4" aria-hidden="true" />,
        error: <RiCloseCircleLine className="size-4" aria-hidden="true" />,
        loading: <RiLoader4Line className="size-4 animate-spin" aria-hidden="true" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
