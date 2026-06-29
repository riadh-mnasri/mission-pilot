/**
 * MissionPilot — How it works section
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */

const STEPS = [
  {
    num: "01",
    title: "Set up your profile",
    desc: "Enter your stack, daily rate, work-mode preference, and mission duration. Takes 3 minutes, one time.",
  },
  {
    num: "02",
    title: "AI scans 24/7",
    desc: "MissionPilot monitors LinkedIn, Malt, and Comet around the clock, extracting missions and scoring them against your profile.",
  },
  {
    num: "03",
    title: "Review top matches",
    desc: "Open your dashboard each morning. You'll see the best opportunities ranked by match score — fully filtered for you.",
  },
  {
    num: "04",
    title: "Send the perfect message",
    desc: "One click generates a personalized outreach message. Review, tweak if needed, copy and send. Done in under a minute.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white/2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From setup to
            <span className="gradient-text"> signed mission</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No complex setup. No browser extensions. Just results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-blue-600/30" />

          {STEPS.map((step) => (
            <div key={step.num} className="relative text-center">
              <div className="inline-flex w-14 h-14 rounded-full bg-gradient-to-br from-blue-600/30 to-violet-600/30 border border-white/10 items-center justify-center mb-5 text-blue-400 font-bold text-lg">
                {step.num}
              </div>
              <h3 className="font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
