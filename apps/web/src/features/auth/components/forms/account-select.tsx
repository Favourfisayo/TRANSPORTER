"use client";

import { Select, SelectItem } from "@THE-TRANSPORTER/ui/components/base/select/select";
import { cx } from "@THE-TRANSPORTER/ui/utils/cx";
import { FigmaIcon } from "@/components/figma-icon";

export function AccountSelect({ onChange }: { onChange?: (role: "individual" | "business") => void }) {
  return (
    <Select
      aria-label="Account type"
      defaultSelectedKey="individual"
      onSelectionChange={(key) => {
        if (key === "individual" || key === "business") onChange?.(key);
      }}
      indicator={<FigmaIcon name="auth-chevron" className="size-4" />}
      className="w-full"
      triggerClassName="text-body-regular h-12 rounded-xl border-accent-500 bg-account-select-surface px-3.5 text-accent-600 shadow-none [&_svg]:text-accent-600"
      triggerOpenClassName="rounded-b-none border-account-select-selected bg-account-select-selected text-brand-on hover:bg-account-select-selected [&_svg]:text-brand-on"
      popoverOffset={-1}
      popoverClassName="w-(--trigger-width) rounded-t-none rounded-b-xl border-accent-500 bg-account-select-surface p-1 shadow-none"
      listBoxKeyDownCapture={(event) => {
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
        const options = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'));
        const activeIndex = options.indexOf(document.activeElement as HTMLElement);
        const nextIndex = activeIndex + (event.key === "ArrowDown" ? 1 : -1);
        if (activeIndex < 0 || nextIndex < 0 || nextIndex >= options.length) return;
        event.preventDefault();
        event.stopPropagation();
        options[nextIndex]?.focus();
      }}
    >
      {[
        { id: "individual", label: "Individual" },
        { id: "business", label: "Business" },
      ].map(({ id, label }) => (
        <SelectItem
          key={id}
          id={id}
          textValue={label}
          className={({ isSelected, isFocused }) =>
            cx("text-body-regular justify-between rounded-lg px-3.5", isSelected ? "sr-only !size-px" : isFocused ? "h-12 bg-background-secondary-hover text-accent-600" : "h-12 bg-transparent text-accent-600")
          }
        >
          {label}
        </SelectItem>
      ))}
    </Select>
  );
}
