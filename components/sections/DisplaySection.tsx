export default function DisplaySection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const displayStats = [
    ["ProMotion", "120Hz refresh for fluid scrolling and touch response"],
    ["Peak brightness", "Up to 2500 nits for outdoor clarity"],
    ["Color", "Wide color with deep contrast and crisp HDR detail"],
  ];

  return (
    <section id="display" ref={sectionRef} className="story-panel min-h-screen border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl sm:p-8">
            <p data-reveal className="text-sm uppercase tracking-[0.32em] text-cyan-200">
              Display section
            </p>
            <h2 data-reveal className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              A screen that stays bright, sharp, and immersive.
            </h2>
            <p data-reveal className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              The iPhone display is presented here as a dedicated follow-up section, highlighting smooth motion, high brightness, and edge-to-edge clarity.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {displayStats.map(([label, value]) => (
                <div
                  key={label}
                  data-reveal
                  data-display-stat
                  className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-4 will-change-transform"
                >
                  <div className="text-xs uppercase tracking-[0.28em] text-cyan-200">{label}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-reveal
            data-display-stat
            className="rounded-[2rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.32),_transparent_42%),radial-gradient(circle_at_center,_rgba(99,102,241,0.18),_transparent_55%),linear-gradient(160deg,rgba(15,23,42,0.88),rgba(2,6,23,0.98))] p-6 shadow-[0_0_120px_rgba(56,189,248,0.12)] sm:p-8 will-change-transform"
          >
            <div className="rounded-[1.75rem] border border-cyan-300/15 bg-slate-950/60 p-5 shadow-[0_0_80px_rgba(34,211,238,0.14)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.28em] text-slate-400">Super Retina XDR</span>
                <span className="rounded-full border border-cyan-400/25 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-200">
                  OLED
                </span>
              </div>

              <div className="rounded-[1.4rem] border border-cyan-300/30 bg-gradient-to-br from-cyan-200/30 via-sky-400/15 to-indigo-500/30 p-4 shadow-[inset_0_0_40px_rgba(125,211,252,0.12)]">
                <div className="group relative aspect-[9/19] overflow-hidden rounded-[1.2rem] border border-cyan-100/20 bg-[linear-gradient(180deg,rgba(224,247,255,0.95),rgba(125,211,252,0.42)_24%,rgba(56,189,248,0.18)_48%,rgba(15,23,42,0.88)_100%)] shadow-[0_0_60px_rgba(56,189,248,0.25)]">
                  <div className="absolute inset-y-0 left-[-30%] w-[38%] rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] opacity-80 blur-xl animate-[pulse_2.6s_ease-in-out_infinite]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.24),transparent_28%),linear-gradient(180deg,transparent,rgba(15,23,42,0.18))]" />
                </div>
              </div>

              <div className="mt-4 text-sm leading-6 text-slate-300">
                Thin bezels, high contrast, and luminous highlights help the display feel premium even in a static product story.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
