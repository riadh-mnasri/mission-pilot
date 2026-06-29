/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Pricing section
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  cta: string;
  highlight: boolean;
  features: string[];
}

const PLANS: Plan[] = [
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
    <section
      id="pricing"
      className="py-28 px-6"
      style={{ background: "rgba(255,255,255,0.015)" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "#60a5fa" }}
          >
            Pricing
          </p>
          <h2
            className="font-black tracking-tight text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Simple,
            <span className="gradient-text"> transparent pricing</span>
          </h2>
          <p className="text-slate-400 text-lg">No contracts. Cancel anytime.</p>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center gap-3 mt-10 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className={`text-sm font-medium transition-colors ${!yearly ? "text-white" : "text-slate-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className="relative w-11 h-6 rounded-full transition-colors"
              style={{
                background: yearly
                  ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                  : "rgba(255,255,255,0.1)",
              }}
              aria-label="Toggle yearly billing"
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                style={{ transform: yearly ? "translateX(1.3rem)" : "translateX(0.125rem)" }}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${yearly ? "text-white" : "text-slate-500"}`}
            >
              Yearly
              <span
                className="ml-2 text-xs font-bold"
                style={{ color: "#34d399" }}
              >
                −20%
              </span>
            </span>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {PLANS.map((plan) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className="relative rounded-2xl p-8 flex flex-col gap-7 overflow-hidden"
                style={
                  plan.highlight
                    ? {
                        background:
                          "linear-gradient(160deg, rgba(37,99,235,0.18) 0%, rgba(124,58,237,0.10) 60%, rgba(14,20,32,0.95) 100%)",
                        border: "1px solid rgba(59,130,246,0.4)",
                        boxShadow:
                          "0 0 0 1px rgba(59,130,246,0.15), 0 8px 48px rgba(59,130,246,0.2), 0 0 80px rgba(139,92,246,0.1)",
                      }
                    : {
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        backdropFilter: "blur(16px)",
                      }
                }
              >
                {/* Top gradient accent (Pro only) */}
                {plan.highlight && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(99,163,255,0.9), rgba(167,139,250,0.7), transparent)",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Most popular badge */}
                {plan.highlight && (
                  <span
                    className="self-start text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{
                      background: "rgba(59,130,246,0.15)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      color: "#93c5fd",
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Most popular
                  </span>
                )}

                {/* Plan name */}
                <div>
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1.5">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontSize: "3.2rem",
                      color: plan.highlight ? "#93c5fd" : "#e2e8f0",
                    }}
                  >
                    {price === 0 ? "Free" : `€${price}`}
                  </span>
                  {price > 0 && (
                    <span className="text-slate-400 mb-2.5 text-sm">/month</span>
                  )}
                </div>

                {/* CTA */}
                <Link href="/dashboard" className="block">
                  <Button
                    className="w-full rounded-xl py-5 font-bold text-sm shimmer-btn"
                    style={
                      plan.highlight
                        ? {
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                            color: "#fff",
                            boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#e2e8f0",
                          }
                    }
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Feature list */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check
                        className="w-4 h-4 shrink-0"
                        style={{ color: plan.highlight ? "#34d399" : "#4ade80" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-600 mt-10">
          Data hosted in France &middot; GDPR compliant &middot; No LinkedIn automation without your consent
        </p>
      </div>
    </section>
  );
}
