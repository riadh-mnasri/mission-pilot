/**
 * MissionPilot — Hero section
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="hero-gradient pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-blue-400 mb-8">
          <Zap className="w-3.5 h-3.5" />
          <span>AI-powered freelance prospecting — 5 min a day</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Your next mission,
          <br />
          <span className="gradient-text">found while you sleep.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          MissionPilot scans LinkedIn, Malt &amp; Comet 24/7, scores every opportunity
          against your stack, and drafts the perfect outreach message — automatically.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-base font-semibold rounded-xl"
            >
              Start for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-white/12 text-slate-300 hover:bg-white/5 px-8 py-6 text-base rounded-xl"
          >
            Watch demo
          </Button>
        </div>

        <p className="text-xs text-slate-500">No credit card required · Free forever on 30 opportunities/month</p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 mb-12">
          {[
            { value: "8h+",  label: "saved per week" },
            { value: "94%",  label: "matching accuracy" },
            { value: "3×",   label: "more responses" },
            { value: "< 5m", label: "daily effort" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold gradient-text">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Dashboard preview */}
        <DashboardPreview />
      </div>
    </section>
  );
}
