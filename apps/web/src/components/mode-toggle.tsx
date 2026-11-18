"use client";

import { RiCheckLine, RiComputerLine, RiMoonClearLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Select, SelectItem } from "@THE-TRANSPORTER/ui/components/base/select/select";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { FigmaIcon } from "@/components/figma-icon";

const choices = [
  { id: "light", label: "Light", description: "A brighter view", icon: RiSunLine },
  { id: "dark", label: "Dark", description: "A softer glow", icon: RiMoonClearLine },
  { id: "system", label: "System", description: "Match your device", icon: RiComputerLine },
] as const;

const subscribe = () => () => {};

export function ModeToggle({ className, icon }: { className?: string; icon?: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <DirectionProvider locale="en-NG">
      <Select
        aria-label="Appearance"
        selectedKey={mounted ? (theme ?? null) : null}
        onSelectionChange={(key) => {
          if (key) setTheme(String(key));
        }}
        renderValue={icon ?? <FigmaIcon name="landing-theme" className="size-[18px]" />}
        className="w-auto"
        triggerClassName={cx("border-brand-on/20 bg-hero-overlay/40 text-brand-on h-11 gap-1 rounded-full px-3 shadow-none backdrop-blur-md hover:bg-hero-overlay/70 hover:border-brand-on/40 [&_svg]:text-brand-on", className)}
        popoverClassName="w-[240px] rounded-2xl p-2"
      >
        {choices.map(({ id, label, description, icon: Icon }) => (
          <SelectItem
            key={id}
            id={id}
            textValue={label}
            className="group/theme rounded-xl px-2.5 py-2.5"
          >
            <span className="bg-background-tertiary-default text-text-primary grid size-9 shrink-0 place-items-center rounded-xl">
              <Icon className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-body-medium text-text-primary">{label}</span>
              <span className="text-caption-1-regular text-text-secondary">{description}</span>
            </span>
            <RiCheckLine
              className="text-brand-primary size-4 opacity-0 group-data-selected/theme:opacity-100"
              aria-hidden="true"
            />
          </SelectItem>
        ))}
      </Select>
    </DirectionProvider>
  );
}
