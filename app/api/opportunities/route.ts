/**
 * MissionPilot — POST /api/opportunities
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 *
 * Receives scored opportunities from the local Playwright agent
 * and stores them in a JSON file (v1).
 *
 * Auth: Bearer token from MISSION_PILOT_API_SECRET env var.
 */

import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR     = join(process.cwd(), "data");
const STORAGE_FILE = join(DATA_DIR, "opportunities.json");
const MAX_STORED   = 500;

interface Opportunity {
  id:           string;
  score:        number;
  title:        string;
  company:      string;
  location:     string;
  description:  string;
  url:          string;
  postedAt:     string;
  tjm:          string;
  duration:     string;
  remote:       boolean;
  tags:         string[];
  draftMessage: string;
  source:       string;
  scrapedAt:    string;
}

// ── POST — receive opportunities from the local agent ───────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Verify Bearer token when a secret is configured
  const secret = process.env.MISSION_PILOT_API_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization") ?? "";
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: { opportunities: Opportunity[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body?.opportunities)) {
    return NextResponse.json({ error: "opportunities array required" }, { status: 400 });
  }

  // Assign stable IDs
  const incoming = body.opportunities.map((op) => ({
    ...op,
    id: op.id || `op-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  }));

  // Deduplicate against stored data
  const existing    = loadOpportunities();
  const existingUrls = new Set(existing.map((o) => o.url));
  const fresh       = incoming.filter((op) => !existingUrls.has(op.url));
  const merged      = [...fresh, ...existing].slice(0, MAX_STORED);

  saveOpportunities(merged);

  return NextResponse.json({ inserted: fresh.length, total: merged.length });
}

// ── GET — read stored opportunities (consumed by the dashboard) ─

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const minScore = Number(searchParams.get("minScore") ?? "0");
  const limit    = Number(searchParams.get("limit")    ?? "50");

  const all = loadOpportunities()
    .filter((op) => op.score >= minScore)
    .slice(0, limit);

  return NextResponse.json({ opportunities: all, total: all.length });
}

// ── Storage helpers ─────────────────────────────────────────────

function loadOpportunities(): Opportunity[] {
  if (!existsSync(STORAGE_FILE)) return [];
  try {
    return JSON.parse(readFileSync(STORAGE_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveOpportunities(data: Opportunity[]): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
}
