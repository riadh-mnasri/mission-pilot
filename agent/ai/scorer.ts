/**
 * MissionPilot Agent — Claude AI opportunity scorer
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Sends each raw opportunity to Claude Sonnet and gets back:
 *   - A match score (0–100)
 *   - The reasons for that score
 *   - An estimated TJM (if not explicit in the listing)
 *   - A draft outreach message personalised for this recruiter
 */

import Anthropic from "@anthropic-ai/sdk";
import { PROFILE } from "../config.js";
import { type RawOpportunity } from "../scrapers/linkedin.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Output type ─────────────────────────────────────────────────

export interface ScoredOpportunity extends RawOpportunity {
  score:        number;    // 0–100
  reasons:      string[];  // bullet points explaining the score
  tjm:          string;    // normalised TJM (from listing or AI estimate)
  duration:     string;    // extracted duration
  remote:       boolean;   // is it remote / hybrid?
  tags:         string[];  // matched stack tags
  draftMessage: string;    // Claude-generated outreach message
}

// ── Scorer ──────────────────────────────────────────────────────

/**
 * Scores a batch of raw opportunities.
 * Uses a single Claude call per opportunity (cheap with Haiku).
 */
export async function scoreOpportunities(
  raw: RawOpportunity[]
): Promise<ScoredOpportunity[]> {

  const results: ScoredOpportunity[] = [];

  for (const op of raw) {
    try {
      const scored = await scoreOne(op);
      results.push(scored);
    } catch (err) {
      // If Claude fails, push a low-scored fallback so we don't lose the data
      results.push(fallback(op, `Scoring error: ${(err as Error).message}`));
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

// ── Single opportunity ──────────────────────────────────────────

async function scoreOne(op: RawOpportunity): Promise<ScoredOpportunity> {
  const prompt = buildPrompt(op);

  const response = await client.messages.create({
    model:      "claude-haiku-4-5-20251001", // fast + cheap for scoring
    max_tokens: 800,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("");

  return parseResponse(op, text);
}

// ── Prompt ──────────────────────────────────────────────────────

function buildPrompt(op: RawOpportunity): string {
  return `You are scoring a freelance IT mission opportunity for a senior tech consultant.

## Consultant Profile
- Name: ${PROFILE.name}
- Role: ${PROFILE.role}
- Stack: ${PROFILE.stack.join(", ")}
- Target TJM: ${PROFILE.tjm.target}€/j (min: ${PROFILE.tjm.min}€/j)
- Preferred duration: ${PROFILE.duration.preferred}+ months
- Work mode: ${PROFILE.workMode}
- Location: ${PROFILE.location}
- Deal-breakers: ${PROFILE.dealBreakers.join(", ")}

## Mission Opportunity
- Title: ${op.title}
- Company: ${op.company}
- Location: ${op.location}
- TJM mentioned: ${op.tjmRaw || "not specified"}
- Posted: ${op.postedAt}
- Description:
${op.description}

## Your Task
Analyse this opportunity and respond in this EXACT JSON format (no markdown, no extra text):

{
  "score": <integer 0-100>,
  "reasons": [<string>, <string>, <string>],
  "tjm": "<estimated or confirmed TJM, e.g. '850€/j' or 'not specified'>",
  "duration": "<extracted duration, e.g. '6 months' or 'not specified'>",
  "remote": <true|false>,
  "tags": [<matched stack tags from the description, max 6>],
  "draftMessage": "<a short, professional French outreach message (3-4 sentences) personalised for this specific role and recruiter — do NOT use a template, reference the specific role title and company>"
}

Scoring guide:
- 90-100: perfect match (stack + TJM + remote/hybrid + 6+ months)
- 70-89:  good match (stack matches, minor TJM or mode compromise)
- 50-69:  partial match (some stack overlap, worth reviewing)
- 0-49:   poor match or deal-breaker present → set score to 0 if deal-breaker`;
}

// ── Response parser ─────────────────────────────────────────────

function parseResponse(op: RawOpportunity, text: string): ScoredOpportunity {
  try {
    // Extract JSON from the response (Claude sometimes adds whitespace)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      ...op,
      score:        Math.min(100, Math.max(0, Number(parsed.score) || 0)),
      reasons:      Array.isArray(parsed.reasons) ? parsed.reasons : [],
      tjm:          String(parsed.tjm || op.tjmRaw || "not specified"),
      duration:     String(parsed.duration || "not specified"),
      remote:       Boolean(parsed.remote),
      tags:         Array.isArray(parsed.tags) ? parsed.tags.slice(0, 6) : [],
      draftMessage: String(parsed.draftMessage || ""),
    };
  } catch {
    return fallback(op, "Failed to parse Claude response");
  }
}

function fallback(op: RawOpportunity, reason: string): ScoredOpportunity {
  return {
    ...op,
    score:        0,
    reasons:      [reason],
    tjm:          op.tjmRaw || "not specified",
    duration:     "not specified",
    remote:       false,
    tags:         [],
    draftMessage: "",
  };
}
