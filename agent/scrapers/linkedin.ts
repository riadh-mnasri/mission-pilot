/**
 * MissionPilot Agent — LinkedIn mission scraper
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Scrapes LinkedIn Jobs search results using the authenticated session.
 * All selectors use aria roles / text content where possible (more stable
 * than brittle class names that LinkedIn changes frequently).
 */

import { type BrowserContext, type Page } from "playwright";
import {
  applyStealthPatches,
  humanDelay,
  humanScroll,
  isWithinWorkHours,
  randomInt,
} from "../browser/stealth.js";
import { PROFILE, SCAN, TIMING } from "../config.js";
import chalk from "chalk";

// ── Types ───────────────────────────────────────────────────────

export interface RawOpportunity {
  title:       string;
  company:     string;
  location:    string;
  description: string;
  url:         string;
  postedAt:    string;
  tjmRaw:      string;   // raw TJM text extracted from description (if any)
  source:      "LinkedIn";
  scrapedAt:   string;
}

// ── Constants ───────────────────────────────────────────────────

const LINKEDIN_JOBS_BASE = "https://www.linkedin.com/jobs/search/";

// LinkedIn selectors — updated for 2025/2026 DOM
const SELECTORS = {
  jobList:        ".jobs-search-results__list-item",
  jobCard:        "[data-job-id]",
  jobTitle:       ".job-card-list__title, .artdeco-entity-lockup__title",
  jobCompany:     ".job-card-container__primary-description, .artdeco-entity-lockup__subtitle",
  jobLocation:    ".job-card-container__metadata-item, .artdeco-entity-lockup__caption",
  jobLink:        "a.job-card-list__title, a[href*='/jobs/view/']",
  detailTitle:    "h1.job-details-jobs-unified-top-card__job-title, h1.jobs-unified-top-card__job-title",
  detailCompany:  ".job-details-jobs-unified-top-card__company-name a, .jobs-unified-top-card__company-name a",
  detailLocation: ".job-details-jobs-unified-top-card__bullet, .jobs-unified-top-card__bullet",
  detailDesc:     "#job-details, .jobs-description__content",
  detailPosted:   ".job-details-jobs-unified-top-card__primary-description span[aria-hidden='true']",
};

// ── Main scraper ────────────────────────────────────────────────

/**
 * Runs a full LinkedIn scan for freelance missions.
 * Iterates over all configured search queries and returns deduped results.
 */
export async function scrapeLinkedIn(
  context: BrowserContext
): Promise<RawOpportunity[]> {

  if (!isWithinWorkHours()) {
    console.log(chalk.yellow("⏰ Outside safe work hours (9am–6pm). Scan aborted."));
    return [];
  }

  const all: RawOpportunity[] = [];
  const seenUrls = new Set<string>();
  let actionCount = 0;

  for (const query of SCAN.queries) {
    if (actionCount >= TIMING.maxActionsPerSession) {
      console.log(chalk.yellow(`⚠️  Max actions (${TIMING.maxActionsPerSession}) reached. Stopping.`));
      break;
    }

    console.log(chalk.blue(`\n🔍 Searching: "${query}"...`));

    const page = await context.newPage();
    await applyStealthPatches(page);

    try {
      const results = await searchLinkedInJobs(page, query, seenUrls);
      all.push(...results);
      actionCount += results.length + 1; // +1 for the search page itself
    } catch (err) {
      console.log(chalk.red(`✗ Error on query "${query}": ${(err as Error).message}`));
    } finally {
      await page.close();
    }

    // Delay between queries — looks like you opened a new search
    await humanDelay("action");
  }

  // Deduplicate by URL (just in case two queries returned the same job)
  const unique = all.filter((op, idx) =>
    all.findIndex((o) => o.url === op.url) === idx
  );

  console.log(chalk.green(`\n✓ Found ${unique.length} unique opportunities.`));
  return unique.slice(0, SCAN.maxResults);
}

// ── Search page handler ─────────────────────────────────────────

async function searchLinkedInJobs(
  page: Page,
  query: string,
  seenUrls: Set<string>
): Promise<RawOpportunity[]> {

  // Build URL: French market, freelance/contract filter, last 24h
  const params = new URLSearchParams({
    keywords: query,
    location: PROFILE.location,
    f_TP:     "1",   // posted in last 24h
    f_JT:     "C",   // contract type
    f_E:      "4,5", // seniority: director + executive (often used for TL roles)
    sortBy:   "DD",  // date descending
  });

  const url = `${LINKEDIN_JOBS_BASE}?${params.toString()}`;

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await humanDelay("scroll");

  // Check for CAPTCHA / auth wall
  if (await isBlockedPage(page)) {
    throw new Error("LinkedIn is showing a CAPTCHA or auth wall. Try refreshing your session.");
  }

  // Scroll down slowly to trigger lazy-loading job cards
  for (let i = 0; i < 3; i++) {
    await humanScroll(page);
  }

  // Collect visible job card URLs
  const cardLinks = await page.evaluate((sel) => {
    const links: string[] = [];
    document.querySelectorAll(sel).forEach((el) => {
      const href = el.getAttribute("href");
      if (href) links.push(href.split("?")[0]);
    });
    return links;
  }, SELECTORS.jobLink);

  const newLinks = cardLinks
    .map((l) => (l.startsWith("http") ? l : `https://www.linkedin.com${l}`))
    .filter((l) => !seenUrls.has(l))
    .slice(0, 10); // max 10 results per query for safety

  console.log(chalk.gray(`  Found ${newLinks.length} new jobs to inspect.`));

  const results: RawOpportunity[] = [];

  for (const jobUrl of newLinks) {
    seenUrls.add(jobUrl);
    try {
      const op = await scrapeJobDetail(page, jobUrl);
      if (op) {
        results.push(op);
        console.log(chalk.gray(`  ✓ ${op.title} @ ${op.company}`));
      }
    } catch (err) {
      console.log(chalk.gray(`  ✗ Could not scrape ${jobUrl}: ${(err as Error).message}`));
    }

    // Human-like delay between job views
    await humanDelay("click");
  }

  return results;
}

// ── Job detail page ─────────────────────────────────────────────

async function scrapeJobDetail(
  page: Page,
  url: string
): Promise<RawOpportunity | null> {

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await humanDelay("scroll");

  // Scroll a bit to simulate reading
  await humanScroll(page);

  const title    = await extractText(page, SELECTORS.detailTitle);
  const company  = await extractText(page, SELECTORS.detailCompany);
  const location = await extractText(page, SELECTORS.detailLocation);
  const desc     = await extractText(page, SELECTORS.detailDesc);
  const posted   = await extractText(page, SELECTORS.detailPosted);

  if (!title || !company) return null;

  // Extract TJM mention from description (e.g. "800€/jour", "900 €/j", "TJM 850")
  const tjmMatch = desc.match(/(\d{3,4})\s*[€$]?\s*\/?(?:jour|j\b|day|TJM)/i)
    ?? desc.match(/TJM[:\s]*(\d{3,4})/i);
  const tjmRaw = tjmMatch ? `${tjmMatch[1]}€/j` : "";

  return {
    title:     title.trim(),
    company:   company.trim(),
    location:  location.trim(),
    description: desc.slice(0, 2000), // cap at 2000 chars for the AI scorer
    url,
    postedAt:  posted.trim() || "recently",
    tjmRaw,
    source:    "LinkedIn",
    scrapedAt: new Date().toISOString(),
  };
}

// ── Helpers ─────────────────────────────────────────────────────

async function extractText(page: Page, selector: string): Promise<string> {
  try {
    return await page.locator(selector).first().innerText({ timeout: 3_000 });
  } catch {
    return "";
  }
}

async function isBlockedPage(page: Page): Promise<boolean> {
  const url = page.url();
  // LinkedIn redirects to /checkpoint/ for security checks or /login for expired sessions
  return url.includes("/checkpoint/") || url.includes("/login") || url.includes("/authwall");
}
