export default function CTASection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section id="cta" ref={sectionRef} className="story-panel min-h-screen">
      <div className="mx-auto flex h-full max-w-5xl items-center px-6 py-24 lg:px-10">
        <div className="w-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900/70 to-slate-900/90 p-8 text-center backdrop-blur-xl sm:p-12">
          <p data-reveal className="text-sm uppercase tracking-[0.32em] text-cyan-200">
            Final chapter
          </p>
          <h2 data-reveal className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Ready to explore iPhone 17 again?
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Revisit the reveal, compare the specs, and experience the immersive product story from the top.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#hero"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Replay experience
            </a>
            <a
              href="#details"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-cyan-300/50 hover:text-cyan-200"
            >
              Jump to specs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
