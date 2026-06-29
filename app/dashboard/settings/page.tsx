/**
 * MissionPilot — Profile & Settings page
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configure your profile, stack, and scan preferences</p>
      </div>

      {/* Profile section */}
      <section className="glass rounded-2xl p-6 mb-4">
        <h2 className="text-sm font-semibold text-white mb-4">Your Profile</h2>
        <div className="grid gap-4">
          {[
            { label: "Full name",        placeholder: "Riadh MNASRI",        type: "text"   },
            { label: "LinkedIn URL",     placeholder: "linkedin.com/in/...",  type: "url"    },
            { label: "Daily rate (€/j)", placeholder: "850",                 type: "number" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs text-slate-400 mb-1.5 block">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="glass rounded-2xl p-6 mb-4">
        <h2 className="text-sm font-semibold text-white mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {["Java 21", "Kotlin", "Spring Boot", "Apache Spark", "Azure", "Kubernetes", "Kafka", "DDD"].map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 border border-blue-500/20 cursor-pointer hover:bg-blue-600/30 transition-colors">
              {t} ×
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add a technology..."
          className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
        />
      </section>

      {/* Preferences */}
      <section className="glass rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4">Scan Preferences</h2>
        <div className="space-y-4">
          {[
            { label: "Minimum daily rate", value: "800€/j" },
            { label: "Minimum duration",   value: "6 months" },
            { label: "Work mode",          value: "Remote / Hybrid" },
            { label: "Location",           value: "Paris, Île-de-France" },
          ].map((p) => (
            <div key={p.label} className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{p.label}</span>
              <span className="text-sm text-white font-medium">{p.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
