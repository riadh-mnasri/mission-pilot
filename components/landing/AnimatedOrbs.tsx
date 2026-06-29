/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Three floating CSS gradient orbs for hero background
 */
"use client";

/**
 * Purely decorative — pointer-events: none, aria-hidden.
 * Animation keyframes are defined in globals.css (.orb-1, .orb-2, .orb-3).
 */
export default function AnimatedOrbs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  );
}
