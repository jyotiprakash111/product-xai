"use client";

import { colorways, useProductStore } from "@/lib/store";

export default function ColorSwitcher() {
  const activeColor = useProductStore((state) => state.color);
  const setColor = useProductStore((state) => state.setColor);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 backdrop-blur-xl">
      <div className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">Finish</div>
      <div className="flex items-center gap-3">
        {colorways.map((colorway) => {
          const isActive = activeColor === colorway.value;

          return (
            <button
              key={colorway.value}
              type="button"
              aria-label={`Switch to ${colorway.name}`}
              onClick={() => setColor(colorway.value)}
              className={`h-9 w-9 rounded-full border transition-transform duration-300 ${
                isActive
                  ? "scale-110 border-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.45)]"
                  : "border-white/15"
              }`}
              style={{ backgroundColor: colorway.value }}
            />
          );
        })}
      </div>
    </div>
  );
}
