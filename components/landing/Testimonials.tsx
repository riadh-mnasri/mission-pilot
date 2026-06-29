/**
 * MissionPilot — Social proof / testimonials section
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */

const TESTIMONIALS = [
  {
    quote:
      "I spent 8 hours a week on LinkedIn before MissionPilot. Now I check a curated list every morning and spend maybe 20 minutes. Signed two missions in my first month.",
    name: "Julien M.",
    title: "Senior Backend Engineer · 10 yrs XP",
    tjm: "↑ TJM +80€/j",
  },
  {
    quote:
      "The AI scoring is eerily accurate. It filters out the noise perfectly — I only see roles that actually match my Java/Kotlin stack and remote preference. Game changer.",
    name: "Sarah K.",
    title: "Tech Lead / Architect · Paris",
    tjm: "3× response rate",
  },
  {
    quote:
      "The personalized message generator alone is worth it. Recruiters actually reply because the message speaks directly to their requirement. Feels human, not templated.",
    name: "Mehdi B.",
    title: "Cloud Architect · AWS & Azure",
    tjm: "Mission signed in 4 days",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Freelancers who
            <span className="gradient-text"> ship faster</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 flex flex-col gap-4">
              <p className="text-slate-300 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-xs text-slate-500">{t.title}</p>
                <span className="inline-block mt-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                  {t.tjm}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
