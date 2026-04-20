export default function FeaturesSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const features = [
    "A19-class speed paired with smooth 120Hz visual response",
    "Interactive parallax that makes the iPhone 17 feel tactile and dimensional",
    "Scroll-locked camera choreography that spotlights the frame, display, and lenses",
  ];

  return (
    <section id="features" ref={sectionRef} className="story-panel min-h-screen border-b border-white/10">
      <div className="mx-auto grid h-full max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <div>
          <p data-reveal className="text-sm uppercase tracking-[0.32em] text-cyan-200">
            Chapter one
          </p>
          <h2 data-reveal className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Built to feel unmistakably iPhone.
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            As you scroll, iPhone 17 rotates through precision close-ups and elegant transitions, revealing its display, camera profile, and refined industrial design.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={feature}
              data-reveal
              className="rounded-3xl border border-white/10 bg-slate-900/55 p-5 text-slate-200 backdrop-blur-xl"
            >
              <div className="mb-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                0{index + 1}
              </div>
              <p className="text-base leading-7">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
