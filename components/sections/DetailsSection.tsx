export default function DetailsSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const quickSpecs = [
    ["Display", "6.7-inch Super Retina XDR, 120Hz ProMotion"],
    ["Chip", "A19 chip with faster on-device graphics"],
    ["Camera", "48MP main system with enhanced low-light detail"],
    ["Battery", "All-day endurance with USB-C fast charging"],
  ];

  const fullSpecs = [
    ["Build", "Titanium and glass design with Ceramic Shield front"],
    ["Brightness", "Up to 2500 nits peak outdoor brightness"],
    ["Video", "4K Dolby Vision recording and cinematic stabilization"],
    ["Connectivity", "5G, Wi-Fi 7, Bluetooth 5.4, MagSafe"],
  ];

  return (
    <section id="details" ref={sectionRef} className="story-panel min-h-screen border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl">
            <p data-reveal className="text-sm uppercase tracking-[0.32em] text-cyan-200">
              Chapter two
            </p>
            <h2 data-reveal className="text-4xl font-semibold tracking-[-0.05em] text-white">
              Every angle, now with the specs.
            </h2>
            <p data-reveal className="text-base leading-7 text-slate-300">
              The camera zoom locks onto the most important hardware cues of iPhone 17, while the panel below surfaces the technical details buyers expect to compare.
            </p>
            <div data-reveal className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm leading-6 text-slate-200">
              Highlights include a brighter OLED panel, refined edge contouring, faster silicon, and a more capable camera stack.
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {quickSpecs.map(([title, subtitle]) => (
              <div
                key={title}
                data-reveal
                className="rounded-3xl border border-white/10 bg-slate-900/55 p-5 backdrop-blur-xl"
              >
                <div className="text-sm uppercase tracking-[0.28em] text-cyan-200">{title}</div>
                <div className="mt-2 text-base leading-7 text-white">{subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold text-white">iPhone 17 spec sheet</h3>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
              Detailed overview
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {fullSpecs.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
              >
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
                <div className="mt-1 text-sm leading-6 text-slate-200">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
