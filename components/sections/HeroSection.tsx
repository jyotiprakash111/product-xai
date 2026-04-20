import ColorSwitcher from "@/components/ui/ColorSwitcher";

export default function HeroSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="story-panel relative flex min-h-screen items-end border-b border-white/10"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-14 pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div className="max-w-2xl">
          <div
            data-reveal
            className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-200"
          >
            iPhone 17 reveal
          </div>

          <h1
            data-reveal
            className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl"
          >
            iPhone 17
          </h1>

          <p data-reveal className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            A cinematic 3D showcase for iPhone 17, combining fluid scroll storytelling, close-up product motion, and a premium launch feel.
          </p>

          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <a
              href="#features"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore story
            </a>
            <a
              href="#details"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-cyan-300/50 hover:text-cyan-200"
            >
              View specs
            </a>
          </div>

          <div data-reveal className="mt-8 max-w-max">
            <ColorSwitcher />
          </div>
        </div>

        <div className="grid gap-4 self-end lg:pb-6">
          {[
            ["6.7-inch", "Super Retina XDR"],
            ["A19", "Next-gen performance"],
            ["48MP", "Pro-grade camera"],
          ].map(([value, label]) => (
            <div
              key={value}
              data-reveal
              className="rounded-3xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-xl"
            >
              <div className="text-2xl font-semibold text-white">{value}</div>
              <div className="mt-1 text-sm text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
