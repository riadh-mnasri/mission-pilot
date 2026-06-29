/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Dashboard stats cards row
 */
import { TrendingUp, Target, MessageSquare, Euro } from "lucide-react";

interface StatCard {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  trend: "up" | "neutral";
  accentColor: string;
  glowColor: string;
  iconBg: string;
}

const STATS: StatCard[] = [
  {
    icon: Target,
    label: "New today",
    value: "47",
    sub: "+12 vs yesterday",
    trend: "up",
    accentColor: "#60a5fa",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "rgba(59,130,246,0.12)",
  },
  {
    icon: TrendingUp,
    label: "Best match",
    value: "94%",
    sub: "Java / Spark",
    trend: "up",
    accentColor: "#a78bfa",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "rgba(139,92,246,0.12)",
  },
  {
    icon: MessageSquare,
    label: "Response rate",
    value: "32%",
    sub: "↑ +8% this month",
    trend: "up",
    accentColor: "#34d399",
    glowColor: "rgba(16,185,129,0.12)",
    iconBg: "rgba(16,185,129,0.12)",
  },
  {
    icon: Euro,
    label: "Avg market TJM",
    value: "875€",
    sub: "for your stack",
    trend: "neutral",
    accentColor: "#fb923c",
    glowColor: "rgba(249,115,22,0.12)",
    iconBg: "rgba(249,115,22,0.12)",
  },
];

function TrendArrow({ trend, color }: { trend: "up" | "neutral"; color: string }) {
  if (trend === "neutral") return null;
  return (
    <span className="inline-flex items-center" style={{ color }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
        <path d="M5 1L9 7H1L5 1Z" />
      </svg>
    </span>
  );
}

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STATS.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="relative rounded-2xl p-5 overflow-hidden animate-count-in"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px ${s.glowColor}`,
            }}
          >
            {/* Subtle top-gradient accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${s.accentColor}50, transparent)`,
              }}
              aria-hidden="true"
            />

            {/* Icon */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: s.iconBg }}
            >
              <span style={{ color: s.accentColor }}>
                <Icon className="w-4 h-4" />
              </span>
            </div>

            {/* Big number */}
            <p
              className="font-black leading-none mb-1 tabular-nums"
              style={{
                fontSize: "1.75rem",
                color: s.accentColor,
                textShadow: `0 0 20px ${s.glowColor}`,
              }}
            >
              {s.value}
            </p>

            {/* Label */}
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>

            {/* Sub / trend */}
            <p
              className="text-xs mt-1.5 flex items-center gap-1 font-medium"
              style={{ color: s.accentColor }}
            >
              <TrendArrow trend={s.trend} color={s.accentColor} />
              {s.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}
