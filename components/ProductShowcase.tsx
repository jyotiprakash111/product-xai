"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import CTASection from "@/components/sections/CTASection";
import CameraSection from "@/components/sections/CameraSection";
import DetailsSection from "@/components/sections/DetailsSection";
import DisplaySection from "@/components/sections/DisplaySection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";
import MaterialsSection from "@/components/sections/MaterialsSection";
import Loader from "@/components/ui/Loader";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import { useProductStory } from "@/hooks/useProductStory";

const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function ProductShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const materialsRef = useRef<HTMLElement>(null);
  const displayRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useProductStory({
    rootRef,
    sceneRef,
    heroRef,
    featuresRef,
    detailsRef,
    materialsRef,
    displayRef,
    cameraRef,
    ctaRef,
  });

  return (
    <SmoothScrollProvider>
      <div ref={rootRef} className="relative overflow-x-clip bg-[#030712] text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.15),_transparent_24%)]" />

        <div ref={sceneRef} className="h-screen p-3 md:p-4 lg:p-5">
          <Scene />
        </div>

        <div className="relative z-10 -mt-[100vh]">
          <HeroSection sectionRef={heroRef} />
          <FeaturesSection sectionRef={featuresRef} />
          <DetailsSection sectionRef={detailsRef} />
          <MaterialsSection sectionRef={materialsRef} />
          <DisplaySection sectionRef={displayRef} />
          <CameraSection sectionRef={cameraRef} />
          <CTASection sectionRef={ctaRef} />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
