"use client";

import { Button } from "@THE-TRANSPORTER/ui/components/base/buttons/button";
import { Input } from "@THE-TRANSPORTER/ui/components/base/input/input";
import { DirectionProvider } from "@THE-TRANSPORTER/ui/components/foundations/direction/direction";
import { toast } from "@THE-TRANSPORTER/ui/components/base/toast/toast";
import { formSchemas } from "@/lib/form-validation";
import { setDemoRole } from "@/features/dashboard/lib/demo-role";
import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccountSelect } from "./account-select";

const fieldClass = "h-12 rounded-xl border border-border-button-default bg-background-secondary-default px-3.5";
const labelClass = "[&_[data-label]]:text-caption-1-medium [&_[data-label]]:text-text-secondary";

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<"individual" | "business">("individual");
  return (
    <DirectionProvider locale="en-NG">
      <form className="flex w-full flex-col" onSubmit={(event) => {
        event.preventDefault();
        const result = formSchemas.login.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
        if (!result.success) {
          toast.error(result.error.issues[0]?.message ?? "Check the form and try again.");
          return;
        }
        const email = role === "business" ? "business@demo.thetransporter.co" : "individual@demo.thetransporter.co";
        if (result.data.email.toLowerCase() !== email || result.data.password !== "Demo1234!") {
          toast.error("Check the demo account details for the selected account.");
          return;
        }
        try {
          setDemoRole(role);
          router.push("/dashboard" as Route);
        } catch {
          toast.error("Unable to start the demo session. Check your browser storage settings.");
        }
      }}>
        <AccountSelect onChange={setRole} />
        <div className="mt-8 flex flex-col gap-4">
          <Input name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" isRequired className={labelClass} fieldClassName={fieldClass} />
          <div className="relative">
            <Input name="password" label="Password" type="password" autoComplete="current-password" isRequired className={labelClass} fieldClassName={fieldClass} />
            <Link href="/reset-password" className="text-caption-1-regular text-accent-600 absolute end-0 top-0 hover:underline">Forgot password?</Link>
          </div>
        </div>
        <Button type="submit" className="from-brand-primary to-brand-primary-deep text-brand-on mt-12 h-14 w-full rounded-2xl bg-linear-to-b shadow-lg hover:brightness-110">Log in</Button>
      </form>
    </DirectionProvider>
  );
}
