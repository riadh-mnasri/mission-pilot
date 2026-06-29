/**
 * MissionPilot — Single opportunity card component
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import { MapPin, Clock, Building2, ExternalLink, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  LinkedIn: "text-blue-400  bg-blue-400/10  border-blue-400/20",
  Malt:     "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Comet:    "text-violet-400 bg-violet-400/10 border-violet-400/20",
  WTTJ:     "text-pink-400  bg-pink-400/10  border-pink-400/20",
};

function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 85 ? "score-high" : score >= 70 ? "score-mid" : "score-low";
  return (
    <span className={`${cls} text-xs font-bold px-2.5 py-1 rounded-full shrink-0`}>
      {score}%
    </span>
  );
}

export default function OpportunityCard({ op }: { op: Opportunity }) {
  const sourceClass = SOURCE_COLOR[op.source] ?? "text-slate-400 bg-white/5 border-white/10";

  return (
    <div className="glass rounded-2xl p-5 hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 group">
      <div className="flex items-start gap-4">

        {/* Score */}
        <div className="text-center shrink-0 pt-0.5">
          <ScoreBadge score={op.score} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-sm md:text-base truncate">{op.title}</h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{op.company}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{op.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{op.duration}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-blue-400 font-bold text-sm">{op.tjm}</p>
              <p className="text-xs text-slate-600 mt-0.5">{op.postedAt}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap mt-3">
            <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${sourceClass}`}>
              {op.source}
            </span>
            {op.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/4 text-slate-400 border border-white/6">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="h-7 text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/20">
              <Wand2 className="w-3 h-3 mr-1.5" />
              Draft message
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-500 hover:text-white">
              <ExternalLink className="w-3 h-3 mr-1.5" />
              View offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
