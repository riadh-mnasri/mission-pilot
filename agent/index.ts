/**
 * MissionPilot Agent — Entry point / CLI
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Usage:
 *   npm run session   → save your LinkedIn session (run once)
 *   npm run scan      → run a full LinkedIn scan
 *
 * The agent:
 *   1. Checks work-hour safety window (9am–6pm)
 *   2. Loads your saved LinkedIn session
 *   3. Searches LinkedIn for freelance missions
 *   4. Scores each opportunity with Claude AI
 *   5. Pushes results to the MissionPilot dashboard
 *   6. Prints a summary to the terminal
 */

import "dotenv/config";
import chalk from "chalk";
import ora from "ora";
import { saveSession, createAuthenticatedContext, hasSession } from "./browser/session.js";
import { scrapeLinkedIn } from "./scrapers/linkedin.js";
import { scoreOpportunities } from "./ai/scorer.js";
import { pushOpportunities, printSummary } from "./sync/api.js";
import { isWithinWorkHours } from "./browser/stealth.js";
import { TIMING } from "./config.js";

// ── CLI entry point ─────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes("--save-session") || args.includes("-s")) {
  await saveSession();
  process.exit(0);
}

if (args.includes("--scan") || args.includes("--help") || args.length === 0) {
  await runScan();
  process.exit(0);
}

// ── Main scan ───────────────────────────────────────────────────

async function runScan(): Promise<void> {
  printBanner();

  // Safety: refuse to run outside work hours
  if (!isWithinWorkHours()) {
    console.log(chalk.yellow(
      `⏰  MissionPilot only runs between ${TIMING.workHours.start}h and ${TIMING.workHours.end}h\n` +
      `    to stay below LinkedIn's detection radar.\n` +
      `    Current time: ${new Date().toLocaleTimeString("fr-FR")}\n`
    ));
    return;
  }

  // Check session exists
  if (!hasSession()) {
    console.log(chalk.red("✗ No LinkedIn session found.\n"));
    console.log(chalk.gray("  Run `npm run session` first to save your session.\n"));
    return;
  }

  // Check API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(chalk.red("✗ ANTHROPIC_API_KEY is not set in .env\n"));
    return;
  }

  let context;

  // ── Step 1: Load session ──────────────────────────────────────
  const sessionSpinner = ora("Loading LinkedIn session...").start();
  try {
    context = await createAuthenticatedContext();
    sessionSpinner.succeed("LinkedIn session loaded.");
  } catch (err) {
    sessionSpinner.fail(`Session error: ${(err as Error).message}`);
    return;
  }

  // ── Step 2: Scrape LinkedIn ───────────────────────────────────
  const scrapeSpinner = ora("Scanning LinkedIn for missions...").start();
  let raw;
  try {
    raw = await scrapeLinkedIn(context);
    scrapeSpinner.succeed(`Found ${raw.length} raw opportunities.`);
  } catch (err) {
    scrapeSpinner.fail(`Scraping error: ${(err as Error).message}`);
    await context.browser()?.close();
    return;
  } finally {
    await context.browser()?.close();
  }

  if (raw.length === 0) {
    console.log(chalk.yellow("\n⚠️  No opportunities found. Try broadening your search queries in config.ts\n"));
    return;
  }

  // ── Step 3: Score with Claude AI ──────────────────────────────
  const scoreSpinner = ora(`Scoring ${raw.length} opportunities with Claude AI...`).start();
  let scored;
  try {
    scored = await scoreOpportunities(raw);
    scoreSpinner.succeed(`Scored ${scored.length} opportunities.`);
  } catch (err) {
    scoreSpinner.fail(`Scoring error: ${(err as Error).message}`);
    return;
  }

  // ── Step 4: Push to dashboard ─────────────────────────────────
  await pushOpportunities(scored);

  // ── Step 5: Print summary ─────────────────────────────────────
  printSummary(scored);

  console.log(chalk.gray(
    `Next scan recommended: ${getNextScanTime()}\n` +
    `Dashboard: ${process.env.MISSION_PILOT_API_URL ?? "http://localhost:3000"}/dashboard\n`
  ));
}

// ── Helpers ─────────────────────────────────────────────────────

function printBanner(): void {
  console.log(chalk.bold.blue(`
  ⚡ MissionPilot Agent v1.0
  ─────────────────────────────
  AI-powered LinkedIn prospecting
  Copyright © 2026 Riadh MNASRI
  `));
}

function getNextScanTime(): string {
  // Suggest next scan 2h from now, within work hours
  const next = new Date();
  next.setHours(next.getHours() + 2);
  if (next.getHours() >= TIMING.workHours.end) {
    next.setDate(next.getDate() + 1);
    next.setHours(TIMING.workHours.start, 0, 0, 0);
    return `Tomorrow at ${TIMING.workHours.start}:00`;
  }
  return next.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
