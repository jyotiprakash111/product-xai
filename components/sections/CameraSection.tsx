export default function CameraSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const cameraHighlights = [
    ["48MP Fusion", "High-detail stills with richer texture and cleaner low-light capture"],
    ["Telephoto reach", "Tighter framing for portraits, products, and distant scenes"],
    ["Night video", "Better stabilization and brighter highlights after sunset"],
  ];

  return (
    <section id="camera" ref={sectionRef} className="story-panel min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl sm:p-8">
            <p data-reveal className="text-sm uppercase tracking-[0.32em] text-cyan-200">
              Camera section
            </p>
            <h2 data-reveal className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Turn it around and the lenses take over.
            </h2>
            <p data-reveal className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              After the display reveal, the story shifts to the rear camera system with a tighter view on the sensor array, lens depth, and pro-grade capture tools.
            </p>

            <div className="mt-8 grid gap-3">
              {cameraHighlights.map(([label, value]) => (
                <div
                  key={label}
                  data-reveal
                  data-camera-card
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
            className="rounded-[2rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.28),_transparent_42%),linear-gradient(160deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-6 shadow-[0_0_120px_rgba(56,189,248,0.12)] sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Main", "48MP sensor", "Fast, detailed, balanced in mixed light"],
                ["Ultra Wide", "Macro-ready", "Expands scenes while preserving edge detail"],
                ["Telephoto", "Optical reach", "Closer framing with a steadier handheld feel"],
                ["Capture", "Pro controls", "Spatial video, night mode, and cinematic polish"],
              ].map(([title, tag, desc]) => (
                <div
                  key={title}
                  data-camera-card
                  className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.26em] text-cyan-200">{tag}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
