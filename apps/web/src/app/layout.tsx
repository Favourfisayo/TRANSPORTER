import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";
import PwaRegistration from "@/components/pwa-registration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: "500", variable: "--font-dm-mono" });

export const metadata: Metadata = {
  title: "THE-TRANSPORTER",
  description: "THE-TRANSPORTER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <PwaRegistration />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
