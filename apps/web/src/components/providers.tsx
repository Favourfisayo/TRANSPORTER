"use client";

import { Toaster } from "@THE-TRANSPORTER/ui/components/base/toast/toast";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
