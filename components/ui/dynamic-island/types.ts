export type IslandVisualState = "idle" | "minimal" | "expanded";

export type IslandActivityKind = "music" | "call" | "timer" | "notification";

export type IslandActivity = {
  id: string;
  kind: IslandActivityKind;
  title: string;
  subtitle: string;
  accentFrom: string;
  accentTo: string;
  isLive?: boolean;
};

export type DynamicIslandOptions = {
  activities?: IslandActivity[];
  autoCollapseMs?: number;
  enableFeedback?: boolean;
};
