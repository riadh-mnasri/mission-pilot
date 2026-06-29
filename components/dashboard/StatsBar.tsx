/**
 * MissionPilot — Dashboard stats cards row
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import { TrendingUp, Target, MessageSquare, Euro } from "lucide-react";

const STATS = [
  { icon: Target,        label: "New today",      value: "47",   sub: "+12 vs yesterday", color: "text-blue-400",   bg: "bg-blue-500/10"   },
  { icon: TrendingUp,    label: "Best match",      value: "94%",  sub: "Java / Spark",     color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: MessageSquare, label: "Response rate",   value: "32%",  sub: "↑ +8% this month", color: "text-emerald-400",bg: "bg-emerald-500/10"},
  { icon: Euro,          label: "Avg market TJM",  value: "875€", sub: "for your stack",   color: "text-orange-400", bg: "bg-orange-500/10" },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STATS.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            <p className={`text-xs mt-1 ${s.color}`}>{s.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
