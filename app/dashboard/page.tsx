/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Opportunities dashboard page
 */
import StatsBar from "@/components/dashboard/StatsBar";
import OpportunityCard, { type Opportunity } from "@/components/dashboard/OpportunityCard";
import {
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* Demo data — replace with real API calls */
const DEMO_OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    score: 94,
    title: "Tech Lead Java / Spark",
    company: "BNP Paribas CIB",
    tjm: "900€/j",
    location: "Remote",
    duration: "12 months",
    remote: true,
    tags: ["Java 21", "Spark", "Azure", "Kubernetes", "Kafka"],
    source: "Malt",
    postedAt: "2h ago",
  },
  {
    id: "2",
    score: 87,
    title: "Cloud Architect — AWS / Terraform",
    company: "Société Générale",
    tjm: "870€/j",
    location: "Hybrid · Paris 9e",
    duration: "6 months",
    remote: false,
    tags: ["AWS", "Terraform", "Microservices", "DDD", "Spring Boot"],
    source: "LinkedIn",
    postedAt: "4h ago",
  },
  {
    id: "3",
    score: 82,
    title: "Senior Backend Architect",
    company: "Natixis",
    tjm: "820€/j",
    location: "Remote",
    duration: "8 months",
    remote: true,
    tags: ["Kotlin", "Spring Boot", "Kafka", "GCP", "Hexagonal"],
    source: "Comet",
    postedAt: "5h ago",
  },
  {
    id: "4",
    score: 78,
    title: "Tech Lead Microservices",
    company: "Crédit Agricole CIB",
    tjm: "850€/j",
    location: "Hybrid · Paris 15e",
    duration: "12 months",
    remote: false,
    tags: ["Java", "Docker", "Kubernetes", "CI/CD", "Scrum"],
    source: "Malt",
    postedAt: "6h ago",
  },
  {
    id: "5",
    score: 74,
    title: "API Architect — Open Banking",
    company: "La Poste Groupe",
    tjm: "840€/j",
    location: "Remote",
    duration: "6 months",
    remote: true,
    tags: ["Spring Boot", "API REST", "OpenAPI", "Azure", "OAuth2"],
    source: "WTTJ",
    postedAt: "8h ago",
  },
  {
    id: "6",
    score: 71,
    title: "Senior Java Developer — Data Platform",
    company: "AXA Tech",
    tjm: "800€/j",
    location: "Hybrid · Paris 8e",
    duration: "9 months",
    remote: false,
    tags: ["Java 17", "Spark", "Databricks", "Delta Lake", "Python"],
    source: "LinkedIn",
    postedAt: "10h ago",
  },
];

const FILTER_CHIPS = [
  { label: "All",      active: true  },
  { label: "Remote",   active: false },
  { label: "> 850€/j", active: false },
  { label: "≥ 80%",    active: false },
  { label: "Malt",     active: false },
];

export default function OpportunitiesPage() {
  return (
    <div className="p-6 max-w-5xl animate-fade-in">

      {/* ── Page header ───────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Today&rsquo;s Opportunities
            </h1>
            {/* Live indicator */}
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#34d399",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <Wifi className="w-2.5 h-2.5" />
              Live
            </span>
          </div>
          <p className="text-sm text-slate-500">
            47 missions matched your profile
            <span className="text-slate-600 mx-2">·</span>
            Last scan 2 min ago
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-slate-400 hover:text-white h-8 text-xs gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Sort
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5 shimmer-btn"
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.25)",
              color: "#60a5fa",
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Scan now
          </Button>
        </div>
      </div>

      {/* ── Search + filter chips ─────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Search input */}
        <div
          className="relative flex-1 min-w-48 max-w-xs"
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search opportunities…"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl text-slate-300 placeholder:text-slate-600 outline-none focus:ring-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.label}
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
              style={
                chip.active
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.12) 100%)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      color: "#93c5fd",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#64748b",
                    }
              }
            >
              {chip.active && <Sparkles className="w-2.5 h-2.5 inline mr-1 opacity-70" />}
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <StatsBar />

      {/* ── Opportunities list ─────────────────────────────────── */}
      <div className="space-y-2.5">
        {DEMO_OPPORTUNITIES.map((op) => (
          <OpportunityCard key={op.id} op={op} />
        ))}
      </div>

      <p className="text-center text-xs text-slate-600 mt-10 pb-6">
        Showing top 6 of 47 opportunities
        <span className="mx-2">·</span>
        <span
          className="text-blue-400 cursor-pointer hover:underline underline-offset-2"
        >
          Load more
        </span>
      </p>
    </div>
  );
}
