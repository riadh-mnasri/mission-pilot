/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Hero section
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Play } from "lucide-react";
import DashboardPreview from "./DashboardPreview";
import AnimatedOrbs from "./AnimatedOrbs";

export default function Hero() {
  return (
    <section className="relative hero-gradient pt-32 pb-24 px-6 overflow-hidden">
      {/* Floating animated orbs */}
      <AnimatedOrbs />

      <div className="relative max-w-7xl mx-auto text-center">

        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-10 animate-fade-in"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#60a5fa",
          }}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>AI-powered freelance prospecting — 5 min a day</span>
          <span
            className="ml-1 text-xs font-bold px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(59,130,246,0.2)",
              color: "#93c5fd",
            }}
          >
            NEW
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-black tracking-tight leading-none mb-6 animate-fade-in-delay-1"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
        >
          Your next mission,
          <br />
          <span className="gradient-text">found while you sleep.</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-2"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
        >
          MissionPilot scans LinkedIn, Malt &amp; Comet 24/7, scores every opportunity
          against your stack, and drafts the perfect outreach message — automatically.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 animate-fade-in-delay-2">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="text-white font-bold rounded-2xl px-8 py-6 text-base shimmer-btn"
              style={{
                background:
                  "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                boxShadow:
                  "0 0 0 1px rgba(59,130,246,0.3), 0 8px 32px rgba(59,130,246,0.3)",
              }}
            >
              Start for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl px-8 py-6 text-base font-semibold text-slate-300 transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <Play className="w-4 h-4 mr-2 fill-current opacity-70" />
            Watch demo
          </Button>
        </div>

        <p className="text-xs text-slate-600 mb-20">
          No credit card required · Free forever on 30 opportunities/month
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-10 mb-16">
          {[
            { value: "8h+",  label: "saved per week"     },
            { value: "94%",  label: "matching accuracy"   },
            { value: "3×",   label: "more responses"      },
            { value: "< 5m", label: "daily effort needed" },
          ].map((s, i) => (
            <div key={s.label} className="text-center" style={{ animationDelay: `${i * 80}ms` }}>
              <p
                className="font-black gradient-text leading-none"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)" }}
              >
                {s.value}
              </p>
              <p className="text-sm text-slate-500 mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Dashboard preview */}
        <DashboardPreview />
      </div>
    </section>
  );
}
