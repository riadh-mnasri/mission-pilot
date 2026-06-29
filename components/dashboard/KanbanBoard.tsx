/**
 * MissionPilot — Kanban pipeline board
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
"use client";

const COLUMNS = [
  { id: "detected",   label: "Detected",   color: "border-blue-500/30",    dot: "bg-blue-500"    },
  { id: "contacted",  label: "Contacted",  color: "border-violet-500/30",  dot: "bg-violet-500"  },
  { id: "replied",    label: "Replied",    color: "border-orange-500/30",  dot: "bg-orange-500"  },
  { id: "interview",  label: "Interview",  color: "border-yellow-500/30",  dot: "bg-yellow-500"  },
  { id: "won",        label: "Won 🏆",     color: "border-emerald-500/30", dot: "bg-emerald-500" },
];

const DEMO_CARDS: Record<string, { title: string; company: string; tjm: string }[]> = {
  detected: [
    { title: "Tech Lead Java",    company: "BNP Paribas",       tjm: "900€/j" },
    { title: "Cloud Architect",   company: "Société Générale",   tjm: "870€/j" },
    { title: "Backend Senior",    company: "Natixis",            tjm: "820€/j" },
  ],
  contacted: [
    { title: "Lead Architect AWS", company: "Crédit Agricole",   tjm: "950€/j" },
    { title: "Senior Kotlin Dev",  company: "Capgemini",         tjm: "800€/j" },
  ],
  replied: [
    { title: "Java / Spark TL",   company: "CACIB",              tjm: "920€/j" },
  ],
  interview: [
    { title: "API Architect",     company: "La Poste Group",     tjm: "840€/j" },
  ],
  won: [
    { title: "Tech Lead Backend", company: "AXA Tech",           tjm: "900€/j" },
  ],
};

export default function KanbanBoard() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((col) => {
        const cards = DEMO_CARDS[col.id] ?? [];
        return (
          <div key={col.id} className="shrink-0 w-56">
            {/* Column header */}
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${col.color} bg-white/2 mb-3`}>
              <span className={`w-2 h-2 rounded-full ${col.dot}`} />
              <span className="text-xs font-semibold text-slate-300">{col.label}</span>
              <span className="ml-auto text-xs text-slate-500">{cards.length}</span>
            </div>

            {/* Cards */}
            <div className="space-y-2.5">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="glass rounded-xl p-3 cursor-pointer hover:bg-white/6 transition-colors"
                >
                  <p className="text-xs font-semibold text-white leading-tight">{card.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{card.company}</p>
                  <p className="text-xs text-blue-400 font-medium mt-1.5">{card.tjm}</p>
                </div>
              ))}

              {/* Empty state hint */}
              {cards.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-4 text-center">
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
