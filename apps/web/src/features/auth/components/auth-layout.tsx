import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FigmaIcon } from "@/components/figma-icon";
import { ModeToggle } from "@/components/mode-toggle";

export function AuthLayout({ title, description, backHref = "/login", children }: { title: string; description: ReactNode; backHref?: "/" | "/login"; children: ReactNode }) {
  return (
    <main className="bg-background-secondary-default text-text-primary font-sans min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex min-h-screen flex-col px-5 py-5 sm:px-10">
        <header className="flex items-center justify-between">
          <Link href="/" aria-label="The Transporter home" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500">
            <Image src="/assets/logo-mark.svg" width={32} height={32} alt="" />
            <span className="text-headline-semibold">TheTransporter<span className="text-brand-primary">.co</span></span>
          </Link>
          <ModeToggle icon={<FigmaIcon name="auth-theme" className="size-5" />} className="border-transparent bg-transparent text-text-primary backdrop-blur-none hover:border-border-button-default hover:bg-background-primary-default [&_svg]:text-text-primary" />
        </header>
        <div className="mx-auto w-full max-w-110 pt-16 pb-10 sm:pt-20">
          <Link href={backHref} aria-label={backHref === "/" ? "Back to home" : "Back to log in"} className="text-text-secondary inline-flex rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"><FigmaIcon name="auth-back" className="size-5" /></Link>
          <h1 className="text-display-3-medium mt-8">{title}</h1>
          <div className="text-body-regular text-text-secondary mt-3">{description}</div>
          <div className="mt-10">{children}</div>
        </div>
      </div>
      <aside aria-label="Ride safety" className="relative m-3 hidden min-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[36px] lg:block">
        <Image src="/assets/login-bridge.jpg" alt="" fill sizes="50vw" className="object-cover object-[73%_center]" priority />
        <div className="bg-hero-overlay/60 absolute inset-0" />
        <div className="text-brand-on absolute inset-x-10 bottom-13 flex items-center gap-3 overflow-hidden rounded-2xl bg-brand-on/10 p-5 backdrop-blur-[24px]">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('/assets/glass-noise.svg')]" />
          <FigmaIcon name="auth-shield" className="text-brand-primary relative size-5" />
          <p className="text-body-regular text-brand-on/85 relative">Every booking gets a private ride phrase that your driver must say<br />before you board.</p>
        </div>
      </aside>
    </main>
  );
}
