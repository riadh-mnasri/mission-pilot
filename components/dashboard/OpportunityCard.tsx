/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Single opportunity card component
 */
"use client";

import { useState } from "react";
import { MapPin, Clock, Building2, ExternalLink, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScoreRing from "@/components/ui/ScoreRing";

export type Source = "LinkedIn" | "Malt" | "Comet" | "WTTJ";

export interface Opportunity {
  id: string;
  score: number;
  title: string;
  company: string;
  tjm: string;
  location: string;
  duration: string;
  remote: boolean;
  tags: string[];
  source: Source;
  postedAt: string;
  description?: string;
}

const SOURCE_COLOR: Record<Source, string> = {
  LinkedIn: "text-blue-400   bg-blue-400/10  border-blue-400/20",
  Malt:     "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Comet:    "text-violet-400 bg-violet-400/10 border-violet-400/20",
  WTTJ:     "text-pink-400   bg-pink-400/10  border-pink-400/20",
};

/** Two-letter company initial avatar */
function CompanyAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(139,92,246,0.22) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {initials}
    </div>
  );
}

/** Left-border accent color by score tier */
function accentBorderColor(score: number): string {
  if (score >= 85) return "#4ade80";
  if (score >= 70) return "#60a5fa";
  return "#facc15";
}

/** Generate a quick mock draft preview */
function draftPreview(op: Opportunity): string {
  const topTags = op.tags.slice(0, 3).join(", ");
  return (
    `Bonjour, Tech Lead Java/Cloud avec +8 ans d'expérience — ` +
    `votre mission "${op.title}" chez ${op.company} correspond parfaitement ` +
    `à mon profil (${topTags}). Disponible pour en discuter rapidement.`
  );
}

export default function OpportunityCard({ op }: { op: Opportunity }) {
  const [hovered, setHovered] = useState(false);
  const sourceClass =
    SOURCE_COLOR[op.source] ?? "text-slate-400 bg-white/5 border-white/10";
  const accentColor = accentBorderColor(op.score);

  return (
    <article
      className="relative rounded-2xl p-5 overflow-hidden transition-all duration-200 cursor-default"
      style={{
        background: hovered
          ? "rgba(255,255,255,0.045)"
          : "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderLeft: `2.5px solid ${accentColor}`,
        borderRadius: "0 1rem 1rem 0",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)"
          : "none",
        backdropFilter: "blur(16px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4">

        {/* Score ring */}
        <div className="shrink-0 pt-0.5">
          <ScoreRing score={op.score} size={52} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">

            {/* Company avatar + title + meta */}
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <CompanyAvatar name={op.company} />
              <div className="min-w-0">
                <h3 className="font-bold text-white text-sm md:text-base truncate leading-tight">
                  {op.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {op.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {op.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {op.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* TJM + date */}
            <div className="text-right shrink-0">
              <p className="text-blue-400 font-black text-base leading-tight">{op.tjm}</p>
              <p className="text-xs text-slate-600 mt-0.5">{op.postedAt}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap mt-3">
            <span
              className={`text-xs px-2 py-0.5 rounded-md border font-semibold ${sourceClass}`}
            >
              {op.source}
            </span>
            {op.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-md text-slate-400 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Draft message preview — expands on hover */}
          <div
            style={{
              maxHeight: hovered ? "72px" : "0px",
              opacity: hovered ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.28s ease-out, opacity 0.22s ease-out",
              marginTop: hovered ? "12px" : "0",
            }}
          >
            <div
              className="p-3 rounded-xl"
              style={{
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.14)",
              }}
            >
              <p className="text-xs text-slate-400 italic leading-relaxed line-clamp-2">
                {draftPreview(op)}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex gap-2 mt-4 transition-opacity duration-200"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <Button
              size="sm"
              className="h-7 text-xs shimmer-btn"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "#60a5fa",
              }}
            >
              <Wand2 className="w-3 h-3 mr-1.5" />
              Draft message
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-slate-500 hover:text-white hover:bg-white/5"
            >
              <ExternalLink className="w-3 h-3 mr-1.5" />
              View offer
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
