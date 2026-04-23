"use client";

import { useMemo, useState } from "react";
import IphoneAdjustmentsController, {
  type IphoneAdjustments,
} from "@/components/ui/IphoneAdjustmentsController";

const appIcons = [
  { name: "Camera", from: "#5eead4", to: "#0ea5e9" },
  { name: "Photos", from: "#f9a8d4", to: "#a78bfa" },
  { name: "Maps", from: "#86efac", to: "#22c55e" },
  { name: "Weather", from: "#7dd3fc", to: "#2563eb" },
  { name: "Clock", from: "#cbd5e1", to: "#475569" },
  { name: "Mail", from: "#93c5fd", to: "#1d4ed8" },
  { name: "Store", from: "#fca5a5", to: "#ef4444" },
  { name: "Health", from: "#fda4af", to: "#e11d48" },
];

const dockIcons = [
  { name: "Phone", from: "#4ade80", to: "#16a34a" },
  { name: "Safari", from: "#7dd3fc", to: "#2563eb" },
  { name: "Messages", from: "#86efac", to: "#22c55e" },
  { name: "Music", from: "#fda4af", to: "#be123c" },
];

function AppGlyph({
  name,
  className,
  size,
}: {
  name: string;
  className: string;
  size: number;
}) {
  if (name === "Camera") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="4.6" y="7" width="14.8" height="10.8" rx="2.4" fill="rgba(255,255,255,0.08)" />
        <path d="M8.9 7l1-1.7h4.2L15 7" />
        <circle cx="12" cy="12.4" r="3.4" fill="rgba(255,255,255,0.06)" />
        <circle cx="12" cy="12.4" r="2.2" fill="rgba(15,23,42,0.75)" />
        <circle cx="12" cy="12.4" r="1.1" fill="rgba(255,255,255,0.6)" />
        <circle cx="16.8" cy="9.4" r="0.7" fill="rgba(255,255,255,0.9)" stroke="none" />
      </svg>
    );
  }

  if (name === "Photos") {
    return (
      <svg viewBox="0 0 24 24" className={className} style={{ width: size, height: size }} fill="none">
        <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.9" />
        <circle cx="12" cy="6.7" r="2" fill="#f97316" />
        <circle cx="15.7" cy="8.3" r="2" fill="#facc15" />
        <circle cx="17.3" cy="12" r="2" fill="#22c55e" />
        <circle cx="15.7" cy="15.7" r="2" fill="#14b8a6" />
        <circle cx="12" cy="17.3" r="2" fill="#3b82f6" />
        <circle cx="8.3" cy="15.7" r="2" fill="#6366f1" />
        <circle cx="6.7" cy="12" r="2" fill="#a855f7" />
        <circle cx="8.3" cy="8.3" r="2" fill="#ec4899" />
      </svg>
    );
  }

  if (name === "Maps") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M4.8 18.5l4.5-1.8 5.4 1.8 4.5-1.8V5.5l-4.5 1.8-5.4-1.8-4.5 1.8z" fill="rgba(255,255,255,0.12)" />
        <path d="M9.3 7.3v9.4M14.7 7.3v9.4" opacity="0.85" />
        <path d="M7.4 14.3c1.6-2.5 3.9-3.7 6.5-3.6" stroke="#22c55e" strokeWidth="1.8" />
        <circle cx="14.4" cy="10.8" r="2.2" fill="#ef4444" stroke="none" />
        <circle cx="14.4" cy="10.8" r="0.9" fill="white" stroke="none" />
      </svg>
    );
  }

  if (name === "Weather") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="15.8" cy="8.1" r="3.1" fill="#fde047" stroke="none" />
        <path d="M8.2 16.6h8.1a3.1 3.1 0 10-.5-6.1A4.2 4.2 0 007.1 11a2.8 2.8 0 001.1 5.6z" fill="rgba(255,255,255,0.85)" stroke="none" />
      </svg>
    );
  }

  if (name === "Clock") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="12" cy="12" r="7" fill="rgba(15,23,42,0.42)" />
        <path d="M12 8v4.1l2.8 1.7" />
        <circle cx="12" cy="12" r="0.9" fill="white" stroke="none" />
      </svg>
    );
  }

  if (name === "Mail") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="4.5" y="6.5" width="15" height="11" rx="2" fill="rgba(255,255,255,0.15)" />
        <path d="M5.4 8l6.6 5.2L18.6 8" fill="none" />
      </svg>
    );
  }

  if (name === "Store") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6.5 9.3h11l-1 8.5h-9z" fill="rgba(255,255,255,0.12)" />
        <path d="M8.8 9.3V7.6a3.2 3.2 0 016.4 0v1.7" />
        <path d="M9.7 12.4h4.6" stroke="#fef3c7" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "Health") {
    return (
      <svg viewBox="0 0 24 24" className={className} style={{ width: size, height: size }} fill="currentColor">
        <path d="M12 20.4l-1.2-1.1C6.2 15 3.4 12.5 3.4 9.3A4.2 4.2 0 017.6 5c1.7 0 2.9.8 3.7 2 1-1.2 2.2-2 3.9-2a4.2 4.2 0 014.1 4.3c0 3.2-2.8 5.7-7.4 10L12 20.4z" />
      </svg>
    );
  }

  if (name === "Phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M7.6 5.8l2.1 2.8-1.4 2.1a15 15 0 007.6 7.6l2-1.4 2.9 2.1-1.8 2.7c-.5.7-1.4 1-2.2.8A18.5 18.5 0 014.7 7.9c-.2-.8.1-1.7.8-2.1l2.1-1.4z" />
      </svg>
    );
  }

  if (name === "Safari") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="12" cy="12" r="7" fill="rgba(255,255,255,0.12)" />
        <path d="M12 12l4.4-2.6-2.6 4.4z" fill="#f43f5e" stroke="none" />
        <path d="M12 12l-4.4 2.6 2.6-4.4z" fill="#38bdf8" stroke="none" />
        <circle cx="12" cy="12" r="0.85" fill="white" stroke="none" />
      </svg>
    );
  }

  if (name === "Messages") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M5 7.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 7.5v6a2.5 2.5 0 01-2.5 2.5H11l-3.8 2.8.8-2.8H7.5A2.5 2.5 0 015 13.5v-6z" fill="rgba(255,255,255,0.22)" />
        <circle cx="9.5" cy="10.6" r="0.8" fill="white" stroke="none" />
        <circle cx="12" cy="10.6" r="0.8" fill="white" stroke="none" />
        <circle cx="14.5" cy="10.6" r="0.8" fill="white" stroke="none" />
      </svg>
    );
  }

  if (name === "Music") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M14 6v9.2a2.3 2.3 0 11-1.6-2.2V7.2L18 6v7.2a2.3 2.3 0 11-1.6-2.2V6.9L14 7.4" />
        <circle cx="10.7" cy="15.9" r="1" fill="white" stroke="none" />
        <circle cx="16.4" cy="14.1" r="1" fill="white" stroke="none" />
      </svg>
    );
  }

  return (
    <span className={className} style={{ width: size, height: size }}>
      •
    </span>
  );
}

export default function DisplaySection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const [islandExpanded, setIslandExpanded] = useState(false);
  const defaultAdjustments: IphoneAdjustments = {
    phoneMaxWidth: 390,
    screenRatio: 17.8,
    islandCollapsedWidth: 44,
    islandExpandedWidth: 82,
    homeIconSize: 56,
    homeGlyphSize: 24,
    dockIconSize: 48,
    dockGlyphSize: 20,
  };
  const [adjustments, setAdjustments] = useState<IphoneAdjustments>(defaultAdjustments);

  const handleAdjustmentChange = (key: keyof IphoneAdjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  };

  const displayStats = useMemo(
    () => [
      ["ProMotion", "120Hz refresh for fluid controls and instant touch response"],
      ["Peak brightness", "Up to 2500 nits for clear widgets in direct sunlight"],
      ["Always-On", "Dynamic updates stay glanceable without waking the full screen"],
    ],
    [],
  );

  return (
    <section id="display" ref={sectionRef} className="story-panel min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div
            data-reveal
            data-display-stat
            className="rounded-[2rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.3),_transparent_42%),radial-gradient(circle_at_center,_rgba(99,102,241,0.16),_transparent_55%),linear-gradient(160deg,rgba(15,23,42,0.88),rgba(2,6,23,0.98))] p-6 shadow-[0_0_120px_rgba(56,189,248,0.12)] sm:p-8 will-change-transform"
          >
            <div
              className="mx-auto w-full rounded-[2.2rem] border border-slate-700/70 bg-[#090e1b] p-2 shadow-[0_30px_90px_rgba(2,6,23,0.8)]"
              style={{ maxWidth: adjustments.phoneMaxWidth }}
            >
              <div
                className="relative overflow-hidden rounded-[1.95rem] border border-slate-600/40 bg-[linear-gradient(180deg,#182744_0%,#0e162b_48%,#090f1f_100%)] p-3"
                style={{ aspectRatio: `9 / ${adjustments.screenRatio}` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-4%,rgba(125,211,252,0.16),transparent_34%)]" />

                <div className="relative mb-3 h-9 px-2 text-[11px] font-medium text-slate-200">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2">9:41</span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 tracking-[0.24em] text-slate-300">5G 100</span>

                  <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
                  <button
                    type="button"
                    onClick={() => setIslandExpanded((prev) => !prev)}
                    className={`border border-white/10 bg-black/90 px-3 transition-[width,height,border-radius,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      islandExpanded
                        ? "h-16 rounded-[1.35rem] shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                        : "h-9 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.28)]"
                    }`}
                    style={
                      islandExpanded
                        ? {
                            width: `${adjustments.islandExpandedWidth}%`,
                            transform: "translateY(0) scale(1)",
                            animation: "island-pop 460ms cubic-bezier(0.22,1,0.36,1)",
                          }
                        : {
                            width: `${adjustments.islandCollapsedWidth}%`,
                            transform: "translateY(0) scale(0.985)",
                          }
                    }
                    aria-label="Toggle Dynamic Island"
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <div
                        className={`absolute inset-0 transition-all duration-300 ease-out ${
                          islandExpanded
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-1 opacity-0"
                        }`}
                      >
                        <div className="w-full py-1 text-left">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-cyan-100">
                            <span>Live Activity</span>
                            <span></span>
                          </div>
                          <div className="mt-1 truncate text-sm font-medium text-white">System Controls</div>
                          <div className="truncate text-[11px] text-slate-300">Tap to collapse the island.</div>
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-250 ease-out ${
                          islandExpanded
                            ? "-translate-y-1 opacity-0"
                            : "translate-y-0 opacity-100"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-[0.24em] text-slate-200"></div>
                      </div>
                    </div>
                  </button>
                  </div>
                </div>

                <div className="mt-5 px-1">
                  <div className="grid grid-cols-4 gap-3">
                    {appIcons.map((app) => (
                      <button key={app.name} type="button" className="group text-center">
                        <div
                          className="mx-auto flex items-center justify-center rounded-2xl border border-white/20 text-lg font-semibold text-white shadow-[0_8px_18px_rgba(2,6,23,0.45)] transition-transform duration-300 group-hover:scale-105"
                          style={{
                            width: adjustments.homeIconSize,
                            height: adjustments.homeIconSize,
                            backgroundImage: `linear-gradient(145deg, ${app.from}, ${app.to})`,
                          }}
                          aria-hidden
                        >
                          <AppGlyph name={app.name} className="text-white" size={adjustments.homeGlyphSize} />
                        </div>
                        <div className="mt-1 text-[10px] text-slate-200">{app.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-x-3 bottom-3 rounded-[1.3rem] border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-xl">
                  <div className="grid grid-cols-4 gap-3">
                    {dockIcons.map((app) => (
                      <button key={app.name} type="button" className="text-center">
                        <div
                          className="mx-auto flex items-center justify-center rounded-xl border border-white/20 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(2,6,23,0.4)]"
                          style={{
                            width: adjustments.dockIconSize,
                            height: adjustments.dockIconSize,
                            backgroundImage: `linear-gradient(145deg, ${app.from}, ${app.to})`,
                          }}
                          aria-hidden
                        >
                          <AppGlyph name={app.name} className="text-white" size={adjustments.dockGlyphSize} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl sm:p-8">
            <p data-reveal className="text-sm uppercase tracking-[0.32em] text-cyan-200">
              Display section
            </p>
            <h2 data-reveal className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Full iPhone view focused only on Dynamic Island.
            </h2>
            <p data-reveal className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              Music, alarm, and stopwatch cards are removed. This view now presents a clean Dynamic Island interaction only.
            </p>

            {isDevelopment ? (
              <IphoneAdjustmentsController
                values={adjustments}
                onChange={handleAdjustmentChange}
                onReset={() => setAdjustments(defaultAdjustments)}
              />
            ) : null}

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
        </div>
      </div>
    </section>
  );
}
