/**
 * MissionPilot — Footer
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import Link from "next/link";
import { Zap } from "lucide-react";

const LINKS = {
  Product:  ["Features", "How it works", "Pricing", "Changelog"],
  Support:  ["Documentation", "FAQ", "Contact"],
  Legal:    ["Privacy Policy", "Terms of Service", "GDPR"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="gradient-text">MissionPilot</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI-powered freelance prospecting. Stop scrolling. Start winning missions.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© 2026 <span className="text-slate-400">Riadh MNASRI</span>. All rights reserved.</p>
          <p>Data hosted in France &middot; GDPR compliant</p>
        </div>
      </div>
    </footer>
  );
}
