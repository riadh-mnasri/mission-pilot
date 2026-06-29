/**
 * MissionPilot — Dashboard sidebar navigation
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Briefcase, Kanban, History, Settings, ChevronRight, LogOut } from "lucide-react";

const NAV = [
  { href: "/dashboard",            icon: Briefcase,     label: "Opportunities" },
  { href: "/dashboard/pipeline",   icon: Kanban,        label: "Pipeline"      },
  { href: "/dashboard/history",    icon: History,       label: "History"       },
  { href: "/dashboard/settings",   icon: Settings,      label: "Settings"      },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen sticky top-0 bg-[#0d1424] border-r border-white/6">

      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/6">
        <Link href="/" className="flex items-center gap-2 font-bold text-base">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="gradient-text">MissionPilot</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-white/4 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 border-t border-white/6 pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/4 cursor-pointer transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            RM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Riadh MNASRI</p>
            <p className="text-xs text-slate-500 truncate">Pro plan</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
