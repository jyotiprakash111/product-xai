"use client";

type IphoneAdjustments = {
  phoneMaxWidth: number;
  screenRatio: number;
  islandCollapsedWidth: number;
  islandExpandedWidth: number;
  homeIconSize: number;
  homeGlyphSize: number;
  dockIconSize: number;
  dockGlyphSize: number;
};

type SliderItem = {
  key: keyof IphoneAdjustments;
  label: string;
  min: number;
  max: number;
  step: number;
};

const sliders: SliderItem[] = [
  { key: "phoneMaxWidth", label: "Phone width", min: 320, max: 430, step: 1 },
  { key: "screenRatio", label: "Phone height ratio", min: 15.5, max: 19.5, step: 0.1 },
  { key: "islandCollapsedWidth", label: "Island collapsed", min: 38, max: 62, step: 1 },
  { key: "islandExpandedWidth", label: "Island expanded", min: 72, max: 96, step: 1 },
  { key: "homeIconSize", label: "Home icon size", min: 44, max: 72, step: 1 },
  { key: "homeGlyphSize", label: "Home glyph size", min: 16, max: 36, step: 1 },
  { key: "dockIconSize", label: "Dock icon size", min: 38, max: 64, step: 1 },
  { key: "dockGlyphSize", label: "Dock glyph size", min: 14, max: 30, step: 1 },
];

export type { IphoneAdjustments };

export default function IphoneAdjustmentsController({
  values,
  onChange,
  onReset,
}: {
  values: IphoneAdjustments;
  onChange: (key: keyof IphoneAdjustments, value: number) => void;
  onReset: () => void;
}) {
  return (
    <div data-reveal className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">iPhone controller</div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-3">
        {sliders.map((slider) => (
          <label key={slider.key} className="grid gap-1">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>{slider.label}</span>
              <span className="font-medium text-cyan-100">{values[slider.key]}</span>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={values[slider.key]}
              onChange={(event) => onChange(slider.key, Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-cyan-300"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
