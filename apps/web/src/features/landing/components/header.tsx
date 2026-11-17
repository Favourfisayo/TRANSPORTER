import Link from "next/link";

import { ComingSoonButton } from "./coming-soon-button";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="font-brand absolute top-[15px] left-1/2 flex h-16 w-full max-w-[1240px] -translate-x-1/2 items-center justify-between px-8 max-[600px]:top-2 max-[600px]:px-5">
      <Link
        className="text-brand-logo text-[17px] font-semibold tracking-[-0.425px] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        href="/"
        aria-label="The Transporter home"
      >
        TheTransporter<span className="text-brand-primary font-medium">.co</span>
      </Link>
      <nav className="flex items-center gap-1" aria-label="Account">
        <ModeToggle />
        <ComingSoonButton
          feature="Log in"
          className="font-brand h-10 rounded-full border-0 bg-transparent px-3.5 text-base font-medium text-white hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        >
          Log in
        </ComingSoonButton>
      </nav>
    </header>
  );
}
