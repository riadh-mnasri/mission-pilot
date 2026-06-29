/**
 * MissionPilot Agent — Push opportunities to the MissionPilot web app
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Sends scored opportunities to the Next.js API so they appear
 * in the dashboard. Falls back to saving a local JSON file if
 * the API is not reachable.
 */

import { writeFileSync, existsSync, readFileSync } from "fs";
import { type ScoredOpportunity } from "../ai/scorer.js";
import { SCAN } from "../config.js";
import chalk from "chalk";

const API_URL    = process.env.MISSION_PILOT_API_URL    ?? "http://localhost:3000";
const API_SECRET = process.env.MISSION_PILOT_API_SECRET ?? "";
const LOCAL_CACHE = "./opportunities-cache.json";

// ── Push to API ─────────────────────────────────────────────────

/**
 * Pushes scored opportunities to the MissionPilot dashboard API.
 * Filters out low-scoring results before sending.
 */
export async function pushOpportunities(
  opportunities: ScoredOpportunity[]
): Promise<void> {

  // Filter by minimum score threshold
  const qualified = opportunities.filter((op) => op.score >= SCAN.minScore);

  console.log(chalk.blue(
    `\n📤 Sending ${qualified.length} qualified opportunities (score ≥ ${SCAN.minScore})...`
  ));

  // Always save locally as backup
  saveLocalCache(qualified);

  // Try pushing to the web app API
  try {
    const res = await fetch(`${API_URL}/api/opportunities`, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${API_SECRET}`,
      },
      body: JSON.stringify({ opportunities: qualified }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`API returned ${res.status}: ${body}`);
    }

    const data = await res.json() as { inserted: number };
    console.log(chalk.green(`✓ ${data.inserted} opportunities synced to dashboard.`));

  } catch (err) {
    console.log(chalk.yellow(
      `⚠️  Could not reach API (${(err as Error).message})\n` +
      `   Results saved locally to ${LOCAL_CACHE}`
    ));
  }
}

// ── Local cache ─────────────────────────────────────────────────

/**
 * Saves results to a local JSON file (always, as a safety backup).
 * Merges with existing cache — keeps the last 200 opportunities.
 */
function saveLocalCache(opportunities: ScoredOpportunity[]): void {
  let existing: ScoredOpportunity[] = [];

  if (existsSync(LOCAL_CACHE)) {
    try {
      existing = JSON.parse(readFileSync(LOCAL_CACHE, "utf-8"));
    } catch {
      existing = [];
    }
  }

  // Deduplicate by URL + merge
  const seen = new Set(opportunities.map((o) => o.url));
  const merged = [
    ...opportunities,
    ...existing.filter((o) => !seen.has(o.url)),
  ].slice(0, 200);

  writeFileSync(LOCAL_CACHE, JSON.stringify(merged, null, 2));
  console.log(chalk.gray(`  Local cache updated: ${merged.length} total opportunities.`));
}

/**
 * Prints a formatted summary of the top opportunities to the terminal.
 */
export function printSummary(opportunities: ScoredOpportunity[]): void {
  const qualified = opportunities
    .filter((o) => o.score >= SCAN.minScore)
    .slice(0, 10);

  if (qualified.length === 0) {
    console.log(chalk.yellow("\n⚠️  No qualified opportunities found in this scan.\n"));
    return;
  }

  console.log(chalk.bold.white("\n╔═══════════════════════════════════════════════════╗"));
  console.log(chalk.bold.white("║         TOP OPPORTUNITIES — MissionPilot          ║"));
  console.log(chalk.bold.white("╚═══════════════════════════════════════════════════╝\n"));

  qualified.forEach((op, i) => {
    const scoreColor =
      op.score >= 85 ? chalk.green :
      op.score >= 70 ? chalk.blue  :
                        chalk.yellow;

    console.log(`${chalk.bold(`${i + 1}.`)} ${scoreColor(`[${op.score}%]`)} ${chalk.white.bold(op.title)}`);
    console.log(`   ${chalk.gray("Company:")}  ${op.company}`);
    console.log(`   ${chalk.gray("TJM:")}      ${op.tjm || "not specified"}`);
    console.log(`   ${chalk.gray("Location:")} ${op.location}`);
    console.log(`   ${chalk.gray("Tags:")}     ${op.tags.join(", ") || "—"}`);
    console.log(`   ${chalk.gray("URL:")}      ${chalk.cyan(op.url)}`);

    if (op.draftMessage) {
      console.log(`\n   ${chalk.magenta("✉  Draft message:")}`);
      console.log(chalk.gray(`   "${op.draftMessage.slice(0, 200)}..."`));
    }

    console.log();
  });
}
