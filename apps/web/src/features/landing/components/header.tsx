import Link from "next/link";
import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="font-brand absolute top-[15px] left-1/2 flex h-16 w-full max-w-[1240px] -translate-x-1/2 items-center justify-between px-8 max-[600px]:top-2 max-[600px]:px-5">
      <Link
        className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        href="/"
        aria-label="The Transporter home"
      >
        <Image src="/assets/mainlogo.png" width={40} height={37} alt="" className="shrink-0" />
      </Link>
      <nav className="flex items-center gap-1" aria-label="Account">
        <ModeToggle />
        <Link
          href="/login"
          className="font-brand inline-flex h-10 items-center justify-center rounded-full border-0 bg-transparent px-3.5 text-base font-medium text-white hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        >
          Log in
        </Link>
      </nav>
    </header>
  );
}
