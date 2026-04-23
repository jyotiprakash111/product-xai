"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DynamicIslandOptions, IslandActivity, IslandVisualState } from "./types";

const defaultActivities: IslandActivity[] = [
  {
    id: "music-1",
    kind: "music",
    title: "Night Drive",
    subtitle: "Stereo Loop",
    accentFrom: "#22d3ee",
    accentTo: "#2563eb",
  },
  {
    id: "call-1",
    kind: "call",
    title: "Incoming call",
    subtitle: "Maya Chen",
    accentFrom: "#34d399",
    accentTo: "#059669",
    isLive: true,
  },
  {
    id: "timer-1",
    kind: "timer",
    title: "Workout timer",
    subtitle: "2m remaining",
    accentFrom: "#fb923c",
    accentTo: "#ef4444",
    isLive: true,
  },
  {
    id: "notification-1",
    kind: "notification",
    title: "Message preview",
    subtitle: "Design team: Launch assets approved",
    accentFrom: "#a78bfa",
    accentTo: "#6366f1",
  },
];

function triggerFeedback(enabled: boolean) {
  if (!enabled) {
    return;
  }

  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(7);
  }

  if (typeof window !== "undefined") {
    try {
      const context = new window.AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.frequency.value = 220;
      oscillator.type = "triangle";
      gain.gain.value = 0.0015;

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.04);

      window.setTimeout(() => {
        context.close();
      }, 120);
    } catch {
      // Ignore feedback failures in unsupported environments.
    }
  }
}

export function useDynamicIsland({
  activities,
  autoCollapseMs = 3800,
  enableFeedback = true,
}: DynamicIslandOptions = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isPinnedLiveMode, setIsPinnedLiveMode] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(24);
  const [timerSeconds, setTimerSeconds] = useState(125);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isCallMuted, setIsCallMuted] = useState(false);

  const queue = activities?.length ? activities : defaultActivities;
  const activeActivity = queue[queueIndex] ?? defaultActivities[0];
  const isLiveMode = isPinnedLiveMode || Boolean(activeActivity.isLive);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const sync = () => setIsDesktop(media.matches);
    sync();

    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      setTrackProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 190);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    if (!isExpanded || isLiveMode) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsExpanded(false);
    }, autoCollapseMs);

    return () => window.clearTimeout(timer);
  }, [autoCollapseMs, isExpanded, isLiveMode]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
        setIsPreviewing(false);

        if (!isLiveMode) {
          setIsExpanded(false);
        }
      }
    };

    window.addEventListener("pointerdown", onPointerDown);

    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [isLiveMode]);

  const visualState: IslandVisualState = useMemo(() => {
    if (isExpanded || isLiveMode) {
      return "expanded";
    }

    if (isPreviewing) {
      return "minimal";
    }

    return "idle";
  }, [isExpanded, isLiveMode, isPreviewing]);

  const goNext = () => {
    setQueueIndex((prev) => (prev + 1) % queue.length);
    setIsExpanded(true);
    triggerFeedback(enableFeedback);
  };

  const goPrev = () => {
    setQueueIndex((prev) => (prev - 1 + queue.length) % queue.length);
    setIsExpanded(true);
    triggerFeedback(enableFeedback);
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      triggerFeedback(enableFeedback);
      return next;
    });
  };

  const toggleLiveMode = () => {
    setIsPinnedLiveMode((prev) => {
      const next = !prev;
      if (next) {
        setIsExpanded(true);
      }
      triggerFeedback(enableFeedback);
      return next;
    });
  };

  return {
    rootRef,
    queue,
    queueIndex,
    activeActivity,
    visualState,
    isDesktop,
    isExpanded,
    isPreviewing,
    isLiveMode,
    isPlaying,
    trackProgress,
    timerSeconds,
    isTimerRunning,
    isCallMuted,
    setIsPreviewing,
    setIsExpanded,
    setIsPlaying,
    setIsTimerRunning,
    setIsCallMuted,
    setTimerSeconds,
    goNext,
    goPrev,
    toggleExpanded,
    toggleLiveMode,
  };
}
