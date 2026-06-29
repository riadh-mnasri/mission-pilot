/**
 * MissionPilot — Animated dashboard screenshot / preview card
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2 } from "lucide-react";

const PREVIEW_ITEMS = [
  {
    score: 94,
    title: "Tech Lead Java / Spark",
    company: "BNP Paribas CIB",
    tjm: "900€/j",
    location: "Remote",
    duration: "12 months",
    tags: ["Java 21", "Spark", "Azure", "Kubernetes"],
    source: "Malt",
    sourceColor: "text-orange-400",
  },
  {
    score: 87,
    title: "Cloud Architect — AWS",
    company: "Société Générale",
    tjm: "870€/j",
    location: "Hybrid · Paris",
    duration: "6 months",
    tags: ["AWS", "Terraform", "Microservices", "DDD"],
    source: "LinkedIn",
    sourceColor: "text-blue-400",
  },
  {
    score: 79,
    title: "Senior Backend Architect",
    company: "Natixis",
    tjm: "820€/j",
    location: "Remote",
    duration: "8 months",
    tags: ["Kotlin", "Spring Boot", "Kafka", "GCP"],
    source: "Comet",
    sourceColor: "text-violet-400",
  },
];

function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 90 ? "score-high" : score >= 75 ? "score-mid" : "score-low";
  return (
    <span className={`${cls} text-xs font-bold px-2.5 py-1 rounded-full`}>
      {score}% match
    </span>
  );
}

export default function DashboardPreview() {
  return (
    <div className="relative max-w-3xl mx-auto mt-8">
      {/* Glow behind card */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 rounded-3xl" />

      <div className="glass rounded-2xl p-4 md:p-6 text-left space-y-3">
        {/* Fake browser chrome */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <div className="ml-3 flex-1 h-6 rounded bg-white/5 flex items-center px-3">
            <span className="text-xs text-slate-500">app.missionpilot.io/opportunities</span>
          </div>
        </div>

        {/* Opportunity rows */}
        {PREVIEW_ITEMS.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/6 bg-white/3 p-4 hover:bg-white/6 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <ScoreBadge score={item.score} />
                  <span className={`text-xs font-medium ${item.sourceColor}`}>{item.source}</span>
                </div>
                <h3 className="font-semibold text-white text-sm md:text-base truncate">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{item.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap mt-2">
                  {item.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/6">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-blue-400 font-bold text-sm">{item.tjm}</p>
                <button className="mt-2 text-xs text-slate-500 hover:text-white transition-colors underline underline-offset-2">
                  Draft message →
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Footer hint */}
        <p className="text-center text-xs text-slate-600 pt-1">
          47 new opportunities today · Last scan 2 min ago
        </p>
      </div>
    </div>
  );
}
