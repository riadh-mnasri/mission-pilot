/**
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 * MissionPilot — Dashboard sidebar navigation
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  Briefcase,
  Kanban,
  History,
  Settings,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/dashboard",          icon: Briefcase, label: "Opportunities" },
  { href: "/dashboard/pipeline", icon: Kanban,    label: "Pipeline"      },
  { href: "/dashboard/history",  icon: History,   label: "History"       },
  { href: "/dashboard/settings", icon: Settings,  label: "Settings"      },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      className="w-60 shrink-0 flex flex-col h-screen sticky top-0 border-r"
      style={{
        background:
          "linear-gradient(180deg, #090e1c 0%, #080c18 60%, #080b16 100%)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center px-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              boxShadow: "0 0 12px rgba(59,130,246,0.35)",
            }}
          >
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="gradient-text tracking-tight">MissionPilot</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active =
            path === href || (href !== "/dashboard" && path.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group"
              style={{
                background: active
                  ? "linear-gradient(90deg, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.04) 100%)"
                  : "transparent",
                color: active ? "#93c5fd" : "#64748b",
                borderRadius: "0.75rem",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#64748b";
                }
              }}
            >
              {/* Active left-line indicator */}
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                  style={{
                    background: "linear-gradient(180deg, #3b82f6, #8b5cf6)",
                    left: "-1px",
                  }}
                />
              )}
              <span style={{ color: active ? "#60a5fa" : "currentColor" }}>
                <Icon className="w-4 h-4 shrink-0 transition-colors" />
              </span>
              <span>{label}</span>
              {active && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: "#3b82f6" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div
        className="mx-3 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      {/* User section */}
      <div className="px-3 py-4">
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group"
          style={{ background: "transparent" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
          }}
        >
          {/* Avatar with gradient ring */}
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                padding: "2px",
                borderRadius: "50%",
              }}
            />
            <div
              className="relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #2d1b69 100%)",
                border: "2px solid transparent",
                backgroundClip: "padding-box",
                boxShadow: "0 0 0 2px rgba(139,92,246,0.6)",
              }}
            >
              RM
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Riadh MNASRI</p>
            <p
              className="text-xs truncate"
              style={{ color: "#4ade80", fontSize: "10px" }}
            >
              Pro plan
            </p>
          </div>

          <LogOut className="w-3.5 h-3.5 shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
