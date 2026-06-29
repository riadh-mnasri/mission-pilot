/**
 * MissionPilot Agent — LinkedIn session management
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Saves and restores your LinkedIn session cookies so the agent
 * never has to log in programmatically (which LinkedIn detects).
 *
 * Workflow:
 *   1. Run `npm run session` once → opens a real Chrome window
 *   2. Log in to LinkedIn manually in that window
 *   3. Press Enter in the terminal → cookies are saved to session.json
 *   4. All future scans reuse those cookies silently
 */

import { chromium, type BrowserContext } from "playwright";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { applyStealthPatches, randomViewport, randomUserAgent } from "./stealth.js";
import chalk from "chalk";

const SESSION_FILE = process.env.SESSION_FILE ?? "./session.json";
const LINKEDIN_BASE = "https://www.linkedin.com";

// ── Save session ────────────────────────────────────────────────

/**
 * Opens a visible (headed) Chrome browser window, navigates to LinkedIn,
 * and waits for the user to log in manually before saving cookies.
 */
export async function saveSession(): Promise<void> {
  console.log(chalk.blue("\n📋 Session Setup — MissionPilot\n"));
  console.log(chalk.gray("1. A Chrome window will open on LinkedIn."));
  console.log(chalk.gray("2. Log in to LinkedIn manually."));
  console.log(chalk.gray("3. Once you are on your feed, come back here and press Enter.\n"));

  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });

  const context = await browser.newContext({
    viewport:  randomViewport(),
    userAgent: randomUserAgent(),
    locale:    "fr-FR",
    timezoneId: "Europe/Paris",
  });

  const page = await context.newPage();
  await applyStealthPatches(page);
  await page.goto(LINKEDIN_BASE, { waitUntil: "domcontentloaded" });

  // Wait for the user to log in manually
  await new Promise<void>((resolve) => {
    process.stdout.write(chalk.yellow("→ Press Enter once you are logged in and on your LinkedIn feed: "));
    process.stdin.once("data", () => resolve());
  });

  // Verify the user is actually logged in
  const isLoggedIn = await page.locator("nav[aria-label]").count() > 0
    || await page.locator(".global-nav").count() > 0;

  if (!isLoggedIn) {
    console.log(chalk.red("\n✗ Could not detect LinkedIn login. Please try again.\n"));
    await browser.close();
    return;
  }

  // Save cookies + storage state
  const storageState = await context.storageState();
  writeFileSync(SESSION_FILE, JSON.stringify(storageState, null, 2));
  console.log(chalk.green(`\n✓ Session saved to ${SESSION_FILE}`));
  console.log(chalk.gray("  You can now run `npm run scan` to start prospecting.\n"));

  await browser.close();
}

// ── Load session ────────────────────────────────────────────────

/**
 * Creates a browser context pre-loaded with your saved LinkedIn session.
 * Throws if the session file does not exist.
 */
export async function createAuthenticatedContext(): Promise<BrowserContext> {
  if (!existsSync(SESSION_FILE)) {
    throw new Error(
      `Session file not found: ${SESSION_FILE}\n` +
      `Run \`npm run session\` first to save your LinkedIn session.`
    );
  }

  const storageState = JSON.parse(readFileSync(SESSION_FILE, "utf-8"));

  const browser = await chromium.launch({
    headless: true,   // runs silently in the background
    args: [
      "--no-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
  });

  const context = await browser.newContext({
    storageState,
    viewport:   randomViewport(),
    userAgent:  randomUserAgent(),
    locale:     "fr-FR",
    timezoneId: "Europe/Paris",
    // Mimic real browser headers
    extraHTTPHeaders: {
      "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    },
  });

  return context;
}

/**
 * Checks whether a saved session file exists.
 */
export function hasSession(): boolean {
  return existsSync(SESSION_FILE);
}
