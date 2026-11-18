"use client";

import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { toast } from "sonner";
import Link from "next/link";
import { AccountSelect } from "./account-select";

const fieldClass = "h-12 rounded-xl border border-border-button-default bg-background-secondary-default px-3.5";
const labelClass = "[&_[data-label]]:text-caption-1-medium [&_[data-label]]:text-text-secondary";

export function LoginForm() {
  return (
    <DirectionProvider locale="en-NG">
      <form className="flex w-full flex-col" onSubmit={(event) => { event.preventDefault(); toast.info("Log in is coming soon."); }}>
        <AccountSelect />
        <div className="mt-8 flex flex-col gap-4">
          <Input label="Email" type="email" autoComplete="email" placeholder="you@example.com" isRequired className={labelClass} fieldClassName={fieldClass} />
          <div className="relative">
            <Input label="Password" type="password" autoComplete="current-password" isRequired className={labelClass} fieldClassName={fieldClass} />
            <Link href="/reset-password" className="text-caption-1-regular text-accent-600 absolute end-0 top-0 hover:underline">Forgot password?</Link>
          </div>
        </div>
        <Button type="submit" className="from-brand-primary to-brand-primary-deep text-brand-on mt-12 h-14 w-full rounded-2xl bg-linear-to-b shadow-lg hover:brightness-110">Log in</Button>
      </form>
    </DirectionProvider>
  );
}
