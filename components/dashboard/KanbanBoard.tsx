/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Kanban pipeline board
 */
"use client";

interface KanbanColumn {
  id: string;
  label: string;
  accentColor: string;
  dotColor: string;
  headerGlow: string;
}

const COLUMNS: KanbanColumn[] = [
  {
    id: "detected",
    label: "Detected",
    accentColor: "#60a5fa",
    dotColor: "#3b82f6",
    headerGlow: "rgba(59,130,246,0.15)",
  },
  {
    id: "contacted",
    label: "Contacted",
    accentColor: "#a78bfa",
    dotColor: "#8b5cf6",
    headerGlow: "rgba(139,92,246,0.15)",
  },
  {
    id: "replied",
    label: "Replied",
    accentColor: "#fb923c",
    dotColor: "#f97316",
    headerGlow: "rgba(249,115,22,0.15)",
  },
  {
    id: "interview",
    label: "Interview",
    accentColor: "#fbbf24",
    dotColor: "#f59e0b",
    headerGlow: "rgba(245,158,11,0.15)",
  },
  {
    id: "won",
    label: "Won",
    accentColor: "#34d399",
    dotColor: "#10b981",
    headerGlow: "rgba(16,185,129,0.18)",
  },
];

interface KanbanCard {
  title: string;
  company: string;
  tjm: string;
}

const DEMO_CARDS: Record<string, KanbanCard[]> = {
  detected: [
    { title: "Tech Lead Java",   company: "BNP Paribas",     tjm: "900€/j" },
    { title: "Cloud Architect",  company: "Société Générale", tjm: "870€/j" },
    { title: "Backend Senior",   company: "Natixis",          tjm: "820€/j" },
  ],
  contacted: [
    { title: "Lead Architect AWS", company: "Crédit Agricole", tjm: "950€/j" },
    { title: "Senior Kotlin Dev",  company: "Capgemini",       tjm: "800€/j" },
  ],
  replied: [
    { title: "Java / Spark TL",  company: "CACIB",            tjm: "920€/j" },
  ],
  interview: [
    { title: "API Architect",    company: "La Poste Group",   tjm: "840€/j" },
  ],
  won: [
    { title: "Tech Lead Backend", company: "AXA Tech",        tjm: "900€/j" },
  ],
};

function KanbanCardItem({
  card,
  accentColor,
}: {
  card: KanbanCard;
  accentColor: string;
}) {
  return (
    <div
      className="rounded-xl p-3 cursor-pointer transition-all duration-150 group"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(255,255,255,0.025)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.07)";
      }}
    >
      <p className="text-xs font-bold text-white leading-tight">{card.title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{card.company}</p>
      <p
        className="text-xs font-black mt-1.5 tabular-nums"
        style={{ color: accentColor }}
      >
        {card.tjm}
      </p>
    </div>
  );
}

export default function KanbanBoard() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {COLUMNS.map((col) => {
        const cards = DEMO_CARDS[col.id] ?? [];
        return (
          <div key={col.id} className="shrink-0 w-52">
            {/* Column header */}
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3"
              style={{
                background: `linear-gradient(90deg, ${col.headerGlow} 0%, transparent 100%)`,
                border: `1px solid ${col.accentColor}25`,
              }}
            >
              {/* Colored dot */}
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: col.dotColor, boxShadow: `0 0 6px ${col.dotColor}` }}
              />
              <span
                className="text-xs font-bold truncate"
                style={{ color: col.accentColor }}
              >
                {col.label}
              </span>
              {/* Count badge */}
              <span
                className="ml-auto text-xs font-black rounded-full px-1.5 py-0.5 tabular-nums"
                style={{
                  background: `${col.accentColor}18`,
                  color: col.accentColor,
                  minWidth: "20px",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {cards.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {cards.map((card) => (
                <KanbanCardItem
                  key={card.title}
                  card={card}
                  accentColor={col.accentColor}
                />
              ))}

              {/* Empty state */}
              {cards.length === 0 && (
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    border: `1px dashed ${col.accentColor}20`,
                  }}
                >
                  <p className="text-xs text-slate-600">Drop here</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
