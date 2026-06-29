/**
 * MissionPilot — Root Layout
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MissionPilot — Find Your Next Freelance Mission with AI",
  description:
    "MissionPilot scans LinkedIn, Malt and Comet 24/7, scores every opportunity against your stack, and drafts the perfect outreach message — in 5 minutes a day.",
  keywords: ["freelance", "mission", "AI", "LinkedIn", "Malt", "Comet", "prospection", "tech lead"],
  authors: [{ name: "Riadh MNASRI" }],
  openGraph: {
    title: "MissionPilot — AI-Powered Freelance Prospecting",
    description: "Stop scrolling. Start winning missions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
