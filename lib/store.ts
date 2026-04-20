import { create } from "zustand";

export type Vec3 = [number, number, number];
export type StoryStage = "hero" | "features" | "details" | "materials" | "display" | "camera" | "cta";
export type MaterialMode = "classic" | "precision" | "hologram";

export const colorways = [
  { name: "Blue", value: "#9cc6ff" },
  { name: "Black", value: "#9ca3af" },
  { name: "Rose", value: "#f9a8d4" },
  { name: "Mint", value: "#5eead4" },
] as const;

export const STAGE_PRESETS: Record<
  StoryStage,
  {
    rotation: Vec3;
    cameraPosition: Vec3;
    lookAt: Vec3;
    shaderMix: number;
    materialMode: MaterialMode;
  }
> = {
  hero: {
    rotation: [0.08, 0.18, -0.01],
    cameraPosition: [0, 0.06, 4.55],
    lookAt: [0, 0.02, 0],
    shaderMix: 0.16,
    materialMode: "classic",
  },
  features: {
    rotation: [0.2, 0.88, -0.04],
    cameraPosition: [0.65, 0.18, 4],
    lookAt: [0.1, 0.02, 0],
    shaderMix: 0.24,
    materialMode: "precision",
  },
  details: {
    rotation: [0.12, 2.08, 0.03],
    cameraPosition: [-0.42, 0.72, 2.25],
    lookAt: [-0.42, 0.72, 0.04],
    shaderMix: 0.34,
    materialMode: "precision",
  },
  materials: {
    rotation: [-0.04, 2.55, 0.08],
    cameraPosition: [-0.72, 0.18, 3.05],
    lookAt: [-0.2, 0.14, 0],
    shaderMix: 0.78,
    materialMode: "hologram",
  },
  display: {
    rotation: [0.01, Math.PI, 0],
    cameraPosition: [0, 0.16, 3.1],
    lookAt: [0, 0.12, 0],
    shaderMix: 0.58,
    materialMode: "precision",
  },
  camera: {
    rotation: [0.16, 0.58, -0.03],
    cameraPosition: [-0.56, 0.86, 1.9],
    lookAt: [-0.42, 0.76, 0.02],
    shaderMix: 0.7,
    materialMode: "precision",
  },
  cta: {
    rotation: [0.02, 3.08, 0],
    cameraPosition: [0, 0.08, 4.28],
    lookAt: [0, 0.02, 0],
    shaderMix: 0.42,
    materialMode: "precision",
  },
};

type SceneSnapshot = {
  stage: StoryStage;
  color: string;
  hovered: boolean;
  rotation: Vec3;
  cameraPosition: Vec3;
  lookAt: Vec3;
  shaderMix: number;
  materialMode: MaterialMode;
};

type ProductStore = SceneSnapshot & {
  setStage: (stage: StoryStage) => void;
  setColor: (color: string) => void;
  setHovered: (hovered: boolean) => void;
  setSnapshot: (snapshot: Partial<SceneSnapshot>) => void;
};

const initialPreset = STAGE_PRESETS.hero;

export const useProductStore = create<ProductStore>((set) => ({
  stage: "hero",
  color: colorways[0].value,
  hovered: false,
  rotation: initialPreset.rotation,
  cameraPosition: initialPreset.cameraPosition,
  lookAt: initialPreset.lookAt,
  shaderMix: initialPreset.shaderMix,
  materialMode: initialPreset.materialMode,
  setStage: (stage) =>
    set((state) => ({
      ...state,
      stage,
      ...STAGE_PRESETS[stage],
    })),
  setColor: (color) => set({ color }),
  setHovered: (hovered) => set({ hovered }),
  setSnapshot: (snapshot) => set((state) => ({ ...state, ...snapshot })),
}));
