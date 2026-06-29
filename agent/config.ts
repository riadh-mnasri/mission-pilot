/**
 * MissionPilot Agent — User profile & scan configuration
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Edit this file to match your freelance profile.
 * The AI scorer uses this to compute match scores (0–100).
 */

export const PROFILE = {
  name:     "Riadh MNASRI",
  role:     "Senior Tech Lead & Cloud Architect",

  // Stack — ordered by expertise (first = strongest)
  stack:    [
    "Java 21", "Kotlin", "Spring Boot", "Apache Spark",
    "Azure", "Kubernetes", "Kafka", "Microservices",
    "DDD", "Hexagonal Architecture", "Docker", "Terraform",
  ],

  // Daily rate range in €
  tjm: { min: 800, target: 900, max: 1000 },

  // Mission duration in months
  duration: { min: 3, preferred: 6 },

  // Work mode preference: "remote" | "hybrid" | "onsite"
  workMode: "hybrid" as const,

  // Location (used for "Hybrid" filter)
  location: "Paris, Île-de-France",

  // Deal-breakers — missions matching these are scored 0
  dealBreakers: [
    "PHP", "WordPress", "Ruby", "full présentiel 5j",
  ],
};

// ── Scan behaviour ──────────────────────────────────────────────

export const SCAN = {
  // LinkedIn search queries (tried in order)
  queries: [
    "mission freelance tech lead java",
    "mission freelance architecte cloud java",
    "mission freelance lead développeur kotlin",
    "mission freelance spark azure",
  ],

  // Max opportunities to collect per scan session
  maxResults: 30,

  // Min score to keep an opportunity (0–100)
  minScore: 60,

  // Max messages sent per day (safety cap — never exceed LinkedIn limits)
  maxDailyMessages: 15,
};

// ── Anti-detection timing ───────────────────────────────────────

export const TIMING = {
  // Delay between page actions (ms) — randomised within this range
  actionDelayMs:  { min: 8_000,  max: 45_000 },

  // Delay between scrolls
  scrollDelayMs:  { min: 1_500,  max: 4_000  },

  // Delay between search result clicks
  clickDelayMs:   { min: 3_000,  max: 12_000 },

  // Safe operating hours (24h, local time) — never act outside this window
  workHours:      { start: 9, end: 18 },

  // Max actions per session before the agent stops itself
  maxActionsPerSession: 20,
};
