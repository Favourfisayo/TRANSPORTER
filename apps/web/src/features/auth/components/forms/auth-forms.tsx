"use client";

import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { formSchemas, submitDemoForm } from "@/lib/form-validation";
import { AccountSelect } from "./account-select";

const fieldClass = "h-12 rounded-xl border border-border-button-default bg-background-secondary-default px-3.5";
const labelClass = "[&_[data-label]]:text-caption-1-medium [&_[data-label]]:text-text-secondary";
const buttonClass = "from-brand-primary to-brand-primary-deep text-brand-on mt-12 h-14 w-full rounded-2xl bg-linear-to-b shadow-lg hover:brightness-110";

export function AccountForm() {
  return (
    <DirectionProvider locale="en-NG">
      <form className="flex w-full flex-col" onSubmit={(event) => submitDemoForm(event, formSchemas.account, "Account creation is coming soon.")}>
        <AccountSelect />
        <div className="mt-8 flex flex-col gap-4">
          <Input name="name" label="Full name" autoComplete="name" placeholder="Your full name" isRequired className={labelClass} fieldClassName={fieldClass} />
          <Input name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" isRequired className={labelClass} fieldClassName={fieldClass} />
          <Input name="password" label="Password" type="password" autoComplete="new-password" isRequired className={labelClass} fieldClassName={fieldClass} />
        </div>
        <Button type="submit" className={buttonClass}>Create account</Button>
      </form>
    </DirectionProvider>
  );
}

export function ResetPasswordForm() {
  return (
    <DirectionProvider locale="en-NG">
      <form className="flex w-full flex-col" onSubmit={(event) => submitDemoForm(event, formSchemas.reset, "Password reset is coming soon.")}>
        <Input name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" isRequired className={labelClass} fieldClassName={fieldClass} />
        <Button type="submit" className={buttonClass}>Send reset link</Button>
      </form>
    </DirectionProvider>
  );
}
