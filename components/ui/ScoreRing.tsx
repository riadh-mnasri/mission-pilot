/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — SVG circular arc score ring (speedometer-style)
 */
"use client";

interface ScoreRingProps {
  score: number;
  /** Outer diameter in px (default 52) */
  size?: number;
}

/**
 * Renders a 270-degree arc ring showing a match score.
 * - Green  (≥85): emerald
 * - Blue   (70–84): blue
 * - Amber  (<70): amber
 * Gap is positioned at the bottom of the ring.
 */
export default function ScoreRing({ score, size = 52 }: ScoreRingProps) {
  const strokeWidth = size * 0.075;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  /* 270-degree arc — gap at the bottom */
  const arcRatio = 270 / 360;
  const arcLength = circumference * arcRatio;
  const filledLength = (Math.min(100, Math.max(0, score)) / 100) * arcLength;

  const color =
    score >= 85 ? "#4ade80" :
    score >= 70 ? "#60a5fa" :
    "#facc15";

  const glowColor =
    score >= 85 ? "rgba(74,222,128,0.5)" :
    score >= 70 ? "rgba(96,165,250,0.5)" :
    "rgba(250,204,21,0.5)";

  const filterId = `glow-${score}`;

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 animate-pulse-ring"
        /* rotate so the arc starts at ~7:30 and the gap sits at the bottom */
        style={{ transform: "rotate(135deg)" }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feFlood floodColor={glowColor} result="flood" />
            <feComposite in="flood" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track (270°) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference - arcLength}`}
          strokeLinecap="round"
        />

        {/* Score arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${filledLength} ${circumference - filledLength}`}
          strokeLinecap="round"
          filter={`url(#${filterId})`}
        />
      </svg>

      {/* Score number overlay */}
      <span
        className="relative font-black tabular-nums leading-none"
        style={{
          color,
          fontSize: Math.max(10, Math.round(size * 0.265)),
        }}
      >
        {score}
      </span>
    </div>
  );
}
