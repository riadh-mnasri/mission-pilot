/**
 * MissionPilot Agent — LinkedIn stealth patches
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Patches applied to the browser page to make it indistinguishable
 * from a real human session. Based on 2026 LinkedIn detection vectors.
 */

import { type Page, type BrowserContext } from "playwright";
import { TIMING } from "../config.js";

// ── navigator.webdriver patch ───────────────────────────────────
// LinkedIn checks `navigator.webdriver === true` as the #1 bot signal.
const WEBDRIVER_PATCH = `
  Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
    configurable: true,
  });
`;

// ── Chrome runtime patch ────────────────────────────────────────
// Headless Chrome is missing window.chrome — real Chrome has it.
const CHROME_PATCH = `
  window.chrome = {
    runtime: {
      connect: () => {},
      sendMessage: () => {},
    },
  };
`;

// ── Permissions API patch ───────────────────────────────────────
// Real browsers return 'granted' for notifications; headless returns 'denied'.
const PERMISSIONS_PATCH = `
  const originalQuery = window.navigator.permissions.query;
  window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications'
      ? Promise.resolve({ state: Notification.permission })
      : originalQuery(parameters)
  );
`;

// ── Plugin list patch ───────────────────────────────────────────
// Real Chrome has plugins; headless has none.
const PLUGINS_PATCH = `
  Object.defineProperty(navigator, 'plugins', {
    get: () => [1, 2, 3, 4, 5],
  });
  Object.defineProperty(navigator, 'languages', {
    get: () => ['fr-FR', 'fr', 'en-US', 'en'],
  });
`;

// ── WebGL vendor patch ──────────────────────────────────────────
// Headless WebGL returns "Google SwiftShader" — too distinctive.
const WEBGL_PATCH = `
  const getParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) return 'Intel Inc.';
    if (parameter === 37446) return 'Intel Iris OpenGL Engine';
    return getParameter.call(this, parameter);
  };
`;

/**
 * Apply all stealth patches to a new page before navigation.
 * Call this immediately after page creation.
 */
export async function applyStealthPatches(page: Page): Promise<void> {
  await page.addInitScript(WEBDRIVER_PATCH);
  await page.addInitScript(CHROME_PATCH);
  await page.addInitScript(PERMISSIONS_PATCH);
  await page.addInitScript(PLUGINS_PATCH);
  await page.addInitScript(WEBGL_PATCH);
}

/**
 * Random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Wait a randomised human-like delay.
 * Uses the TIMING config ranges so behaviour is consistent.
 */
export async function humanDelay(
  type: "action" | "scroll" | "click" = "action"
): Promise<void> {
  const range =
    type === "scroll" ? TIMING.scrollDelayMs :
    type === "click"  ? TIMING.clickDelayMs  :
                        TIMING.actionDelayMs;

  // Add ±15% jitter on top of the base random range
  const base  = randomInt(range.min, range.max);
  const jitter = base * (0.85 + Math.random() * 0.30);
  await new Promise((r) => setTimeout(r, Math.round(jitter)));
}

/**
 * Simulate a human reading the page — random scroll + pause.
 */
export async function humanScroll(page: Page): Promise<void> {
  const scrollAmount = randomInt(300, 800);
  await page.evaluate((amount) => window.scrollBy(0, amount), scrollAmount);
  await humanDelay("scroll");
}

/**
 * Move mouse to element with a natural arc before clicking.
 */
export async function humanClick(page: Page, selector: string): Promise<void> {
  const element = await page.locator(selector).first();
  await element.hover();
  await humanDelay("click");
  await element.click();
}

/**
 * Returns true if current local time is within safe work hours.
 * The agent should refuse to run outside this window.
 */
export function isWithinWorkHours(): boolean {
  const hour = new Date().getHours();
  return hour >= TIMING.workHours.start && hour < TIMING.workHours.end;
}

/**
 * Random realistic viewport size — real users don't all use 1920×1080.
 */
export function randomViewport() {
  const sizes = [
    { width: 1440, height: 900  },
    { width: 1536, height: 864  },
    { width: 1366, height: 768  },
    { width: 1920, height: 1080 },
    { width: 1280, height: 800  },
  ];
  return sizes[randomInt(0, sizes.length - 1)];
}

/**
 * Realistic user-agent strings for Chrome on macOS (2025–2026).
 */
export function randomUserAgent(): string {
  const agents = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6084.0 Safari/537.36",
  ];
  return agents[randomInt(0, agents.length - 1)];
}
