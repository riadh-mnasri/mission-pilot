/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Features section
 */
"use client";
import { Search, Brain, MessageSquare, Kanban, Bell, ShieldCheck } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  iconBg: string;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: Search,
    accentColor: "#60a5fa",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "rgba(59,130,246,0.12)",
    title: "24/7 Multi-Source Scan",
    desc:
      "Continuously monitors LinkedIn, Malt, and Comet for missions matching your technical profile. Never miss an opportunity again.",
  },
  {
    icon: Brain,
    accentColor: "#a78bfa",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "rgba(139,92,246,0.12)",
    title: "AI Scoring Engine",
    desc:
      "Each opportunity gets a match score 0–100 based on your stack, preferred daily rate, duration, and work mode preferences.",
  },
  {
    icon: MessageSquare,
    accentColor: "#34d399",
    glowColor: "rgba(16,185,129,0.12)",
    iconBg: "rgba(16,185,129,0.12)",
    title: "Personalized Outreach",
    desc:
      "Claude AI drafts a tailored message for each recruiter — adapting tone, stack emphasis, and value proposition automatically.",
  },
  {
    icon: Kanban,
    accentColor: "#fb923c",
    glowColor: "rgba(249,115,22,0.12)",
    iconBg: "rgba(249,115,22,0.12)",
    title: "Pipeline Kanban",
    desc:
      "Track every opportunity from detection to signature. Built-in reminders so no follow-up falls through the cracks.",
  },
  {
    icon: Bell,
    accentColor: "#f472b6",
    glowColor: "rgba(244,114,182,0.12)",
    iconBg: "rgba(244,114,182,0.12)",
    title: "Real-Time Alerts",
    desc:
      "Get notified the instant a high-match mission is posted — before it fills up with applicants.",
  },
  {
    icon: ShieldCheck,
    accentColor: "#22d3ee",
    glowColor: "rgba(6,182,212,0.12)",
    iconBg: "rgba(6,182,212,0.12)",
    title: "LinkedIn-Safe Architecture",
    desc:
      "Runs locally inside your real browser session. No cloud proxies. No datacenter IPs. Detection risk near zero.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-18">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "#60a5fa" }}
          >
            Features
          </p>
          <h2
            className="font-black tracking-tight text-white mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Everything you need to
            <span className="gradient-text"> win more missions</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Built for Senior Freelancers who value their time and reputation.
            No noise — only qualified leads.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="relative rounded-2xl p-7 overflow-hidden group transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = `${f.accentColor}30`;
                  el.style.boxShadow = `0 8px 40px ${f.glowColor}, 0 0 0 1px ${f.accentColor}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Top accent gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${f.accentColor}60, transparent)`,
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: f.iconBg }}
                >
                  <span style={{ color: f.accentColor }}><Icon className="w-5 h-5" /></span>
                </div>

                <h3
                  className="font-bold text-white mb-2.5 text-base"
                >
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
