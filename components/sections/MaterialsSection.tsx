export default function MaterialsSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section id="materials" ref={sectionRef} className="story-panel min-h-screen border-b border-white/10">
      <div className="mx-auto grid h-full max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <div>
          <p data-reveal className="text-sm uppercase tracking-[0.32em] text-cyan-200">
            Chapter three
          </p>
          <h2 data-reveal className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Finishes worthy of iPhone 17.
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            The custom shader adds a premium presentation layer over the phone body, simulating a polished launch-stage glow across each color finish.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            ["Holographic shell", "A GLSL overlay adds subtle scan light and hover ripple depth"],
            ["Premium finishes", "Preview black, silver, blue, and rose-inspired looks live on the model"],
            ["Optimized rendering", "Lazy scene loading and restrained rerenders keep motion smooth"],
          ].map(([title, desc]) => (
            <div
              key={title}
              data-reveal
              className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-5 backdrop-blur-xl"
            >
              <div className="text-lg font-semibold text-white">{title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-300">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
