/**
 * MissionPilot — Top navigation bar
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features",     href: "#features"     },
  { label: "How it works", href: "#how-it-works"  },
  { label: "Pricing",      href: "#pricing"       },
  { label: "FAQ",          href: "#faq"           },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="gradient-text">MissionPilot</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-slate-400 hover:text-white text-sm">
              Log in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4">
              Try for free
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/6 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-slate-300 text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/dashboard">
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">Try for free</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
