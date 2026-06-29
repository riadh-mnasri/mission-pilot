/**
 * MissionPilot — Pricing section
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For freelancers getting started",
    cta: "Get started free",
    highlight: false,
    features: [
      "30 opportunities / month",
      "5 outreach messages / month",
      "LinkedIn + Malt sources",
      "Basic match scoring",
      "Kanban pipeline",
      "Community support",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 10,
    yearlyPrice: 8,
    description: "For active freelancers hunting missions",
    cta: "Start Pro — free 14 days",
    highlight: true,
    features: [
      "Unlimited opportunities",
      "Unlimited AI messages",
      "LinkedIn · Malt · Comet",
      "Advanced AI scoring",
      "Geographic filtering",
      "TJM trend analytics",
      "Priority email support",
      "Early access to new features",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 bg-white/2">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple,
            <span className="gradient-text"> transparent pricing</span>
          </h2>
          <p className="text-slate-400">No contracts. Cancel anytime.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 glass rounded-full px-4 py-2">
            <span className={`text-sm ${!yearly ? "text-white" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`w-10 h-5 rounded-full transition-colors relative ${yearly ? "bg-blue-600" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${yearly ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
            <span className={`text-sm ${yearly ? "text-white" : "text-slate-400"}`}>
              Yearly <span className="text-emerald-400 text-xs ml-1">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PLANS.map((plan) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 flex flex-col gap-6 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-blue-600/20 to-violet-600/10 border border-blue-500/30"
                    : "glass"
                }`}
              >
                {plan.highlight && (
                  <span className="self-start text-xs font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{plan.description}</p>
                </div>

                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white">{price === 0 ? "Free" : `€${price}`}</span>
                  {price > 0 && <span className="text-slate-400 mb-2">/month</span>}
                </div>

                <Link href="/dashboard">
                  <Button
                    className={`w-full rounded-xl py-5 font-semibold ${
                      plan.highlight
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-white/6 hover:bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-600 mt-8">
          Data hosted in France &middot; GDPR compliant &middot; No LinkedIn automation without your consent
        </p>
      </div>
    </section>
  );
}
