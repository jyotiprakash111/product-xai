"use client";

import { Environment, Float, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lights from "@/components/3d/Lights";
import Model from "@/components/3d/Model";

export default function Scene() {
  return (
    <div className="h-full w-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_45%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.94))] shadow-[0_0_120px_rgba(34,211,238,0.08)]">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.1, 4.8], fov: 28 }}
      >
        <fog attach="fog" args={["#030712", 6, 14]} />
        <Suspense fallback={null}>
          <Lights />
          <Float speed={1.25} rotationIntensity={0.12} floatIntensity={0.28}>
            <Model />
          </Float>
          <Sparkles count={90} speed={0.35} scale={[6, 4, 4]} size={1.4} color="#7dd3fc" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
