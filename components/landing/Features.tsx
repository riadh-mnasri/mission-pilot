/**
 * MissionPilot — Features section
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import { Search, Brain, MessageSquare, Kanban, Bell, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    title: "24/7 Multi-Source Scan",
    desc: "Continuously monitors LinkedIn, Malt, and Comet for missions matching your technical profile. Never miss an opportunity again.",
  },
  {
    icon: Brain,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    title: "AI Scoring Engine",
    desc: "Each opportunity gets a match score 0-100 based on your stack, preferred daily rate, duration, and work mode preferences.",
  },
  {
    icon: MessageSquare,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "Personalized Outreach",
    desc: "Claude AI drafts a tailored message for each recruiter — adapting tone, stack emphasis, and value proposition automatically.",
  },
  {
    icon: Kanban,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    title: "Pipeline Kanban",
    desc: "Track every opportunity from detection to signature. Built-in reminders so no follow-up falls through the cracks.",
  },
  {
    icon: Bell,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    title: "Real-Time Alerts",
    desc: "Get notified the instant a high-match mission is posted — before it fills up with applicants.",
  },
  {
    icon: ShieldCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    title: "LinkedIn-Safe Architecture",
    desc: "Runs locally inside your real browser session. No cloud proxies. No datacenter IPs. Detection risk near zero.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need to
            <span className="gradient-text"> win more missions</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Built for Senior Freelancers who value their time and reputation. No noise — only qualified leads.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
