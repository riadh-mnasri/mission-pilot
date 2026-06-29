/**
 * MissionPilot — Opportunities dashboard page
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import StatsBar from "@/components/dashboard/StatsBar";
import OpportunityCard, { type Opportunity } from "@/components/dashboard/OpportunityCard";
import { Filter, RefreshCw, SlidersHorizontal } from "lucide-react";
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

export default function OpportunitiesPage() {
  return (
    <div className="p-6 max-w-5xl">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Today&rsquo;s Opportunities</h1>
          <p className="text-sm text-slate-500 mt-0.5">47 new missions matched your profile · Last scan 2 min ago</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 text-xs">
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            Filter
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
            Sort
          </Button>
          <Button size="sm" className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/20 h-8 text-xs">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Scan now
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StatsBar />

      {/* Opportunities list */}
      <div className="space-y-3">
        {DEMO_OPPORTUNITIES.map((op) => (
          <OpportunityCard key={op.id} op={op} />
        ))}
      </div>

      <p className="text-center text-xs text-slate-600 mt-8 pb-4">
        Showing top 6 of 47 opportunities · <span className="text-blue-400 cursor-pointer hover:underline">Load more</span>
      </p>
    </div>
  );
}
