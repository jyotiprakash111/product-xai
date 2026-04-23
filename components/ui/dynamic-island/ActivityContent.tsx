"use client";

import { IslandActivity } from "./types";

function formatCountdown(seconds: number) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return `${mins}:${secs}`;
}

type ActivityContentProps = {
  activity: IslandActivity;
  isPlaying: boolean;
  trackProgress: number;
  timerSeconds: number;
  isTimerRunning: boolean;
  isCallMuted: boolean;
  onTogglePlaying: () => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onToggleMute: () => void;
  onDeclineCall: () => void;
};

export default function ActivityContent({
  activity,
  isPlaying,
  trackProgress,
  timerSeconds,
  isTimerRunning,
  isCallMuted,
  onTogglePlaying,
  onToggleTimer,
  onResetTimer,
  onToggleMute,
  onDeclineCall,
}: ActivityContentProps) {
  if (activity.kind === "music") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2">
          <div
            className="h-11 w-11 rounded-xl border border-white/20"
            style={{
              backgroundImage: `linear-gradient(145deg, ${activity.accentFrom}, ${activity.accentTo})`,
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{activity.title}</p>
            <p className="truncate text-xs text-slate-300">{activity.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onTogglePlaying}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-100"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
        <div className="h-1.5 rounded-full bg-white/10">
          <div
            className="h-full rounded-full"
            style={{
              width: `${trackProgress}%`,
              backgroundImage: `linear-gradient(90deg, ${activity.accentFrom}, ${activity.accentTo})`,
            }}
          />
        </div>
      </div>
    );
  }

  if (activity.kind === "call") {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">Incoming</p>
          <p className="mt-1 text-base font-semibold text-white">{activity.subtitle}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onToggleMute}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-100"
          >
            {isCallMuted ? "Unmute" : "Mute"}
          </button>
          <button
            type="button"
            className="rounded-full border border-emerald-300/40 bg-emerald-400/25 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-emerald-100"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onDeclineCall}
            className="rounded-full border border-rose-300/40 bg-rose-500/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-rose-100"
          >
            Decline
          </button>
        </div>
      </div>
    );
  }

  if (activity.kind === "timer") {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">Countdown</p>
          <p className="mt-1 text-2xl font-semibold tracking-[0.06em] text-white">{formatCountdown(timerSeconds)}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onToggleTimer}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-100"
          >
            {isTimerRunning ? "Pause" : "Resume"}
          </button>
          <button
            type="button"
            onClick={onResetTimer}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-100"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">Notification</p>
        <p className="mt-1 text-sm font-medium text-white">{activity.subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onDeclineCall}
        className="w-full rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-100"
      >
        Dismiss
      </button>
    </div>
  );
}
