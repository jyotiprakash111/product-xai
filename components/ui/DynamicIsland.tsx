"use client";

import { AnimatePresence, motion } from "framer-motion";
import ActivityContent from "@/components/ui/dynamic-island/ActivityContent";
import { createIslandShellVariants, panelVariants } from "@/components/ui/dynamic-island/animations";
import { useDynamicIsland } from "@/components/ui/dynamic-island/useDynamicIsland";
import { DynamicIslandOptions } from "@/components/ui/dynamic-island/types";

export default function DynamicIsland(options: DynamicIslandOptions) {
  const {
    rootRef,
    queue,
    queueIndex,
    activeActivity,
    visualState,
    isDesktop,
    isLiveMode,
    isPlaying,
    trackProgress,
    timerSeconds,
    isTimerRunning,
    isCallMuted,
    setIsExpanded,
    setIsPlaying,
    setIsTimerRunning,
    setIsCallMuted,
    setTimerSeconds,
    goNext,
    goPrev,
    toggleExpanded,
    toggleLiveMode,
  } = useDynamicIsland(options);

  const shellVariants = createIslandShellVariants(isDesktop);

  const activityDots = queue.map((activity, index) => {
    const isActive = index === queueIndex;

    return (
      <button
        key={activity.id}
        type="button"
        onClick={() => {
          if (index > queueIndex) {
            goNext();
          } else if (index < queueIndex) {
            goPrev();
          }
        }}
        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
          isActive ? "bg-cyan-100" : "bg-white/35"
        }`}
        aria-label={`Switch to ${activity.kind} activity`}
      />
    );
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex justify-center px-4">
      <motion.div ref={rootRef} className="pointer-events-auto">
        <motion.div
          animate={visualState}
          variants={shellVariants}
          onClick={() => {
            if (visualState !== "expanded") {
              toggleExpanded();
            }
          }}
          className="relative overflow-hidden border border-white/10 bg-black/70 p-2 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          style={{
            boxShadow:
              visualState === "expanded"
                ? "0 24px 56px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.06), 0 0 30px rgba(56,189,248,0.16)"
                : "0 10px 22px rgba(0,0,0,0.32)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.18),transparent_42%)]" />

          <AnimatePresence mode="wait" initial={false}>
            {visualState === "expanded" ? (
              <motion.div
                key="expanded"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-100">{activeActivity.kind}</p>
                    <p className="mt-1 text-sm font-medium text-white">{activeActivity.title}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLiveMode();
                      }}
                      className={`rounded-full border px-2 py-1 text-[9px] uppercase tracking-[0.18em] ${
                        isLiveMode
                          ? "border-cyan-300/55 bg-cyan-400/25 text-cyan-100"
                          : "border-white/15 bg-white/5 text-slate-300"
                      }`}
                    >
                      Live
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (!isLiveMode) {
                          setIsExpanded(false);
                        }
                      }}
                      className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <ActivityContent
                  activity={activeActivity}
                  isPlaying={isPlaying}
                  trackProgress={trackProgress}
                  timerSeconds={timerSeconds}
                  isTimerRunning={isTimerRunning}
                  isCallMuted={isCallMuted}
                  onTogglePlaying={() => setIsPlaying((prev) => !prev)}
                  onToggleTimer={() => setIsTimerRunning((prev) => !prev)}
                  onResetTimer={() => setTimerSeconds(125)}
                  onToggleMute={() => setIsCallMuted((prev) => !prev)}
                  onDeclineCall={() => {
                    if (!isLiveMode) {
                      setIsExpanded(false);
                    }
                    goNext();
                  }}
                />

                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goPrev();
                    }}
                    className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-300"
                  >
                    Prev
                  </button>
                  <div className="flex items-center gap-1.5">{activityDots}</div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goNext();
                    }}
                    className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-300"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key={visualState}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleExpanded();
                }}
                className="relative flex h-full w-full items-center justify-between gap-2 px-2"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-slate-100">
                  {visualState === "minimal" ? activeActivity.title : "Dynamic Island"}
                </span>
                <div className="h-2 w-2 rounded-full bg-slate-300/65" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
