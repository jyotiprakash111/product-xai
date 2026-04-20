"use client";

import { RefObject, useLayoutEffect } from "react";
import { ensureGsap } from "@/lib/gsap";
import { STAGE_PRESETS, StoryStage, useProductStore } from "@/lib/store";

type StoryRefs = {
  rootRef: RefObject<HTMLElement | null>;
  sceneRef: RefObject<HTMLDivElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  featuresRef: RefObject<HTMLElement | null>;
  detailsRef: RefObject<HTMLElement | null>;
  materialsRef: RefObject<HTMLElement | null>;
  displayRef: RefObject<HTMLElement | null>;
  cameraRef: RefObject<HTMLElement | null>;
  ctaRef: RefObject<HTMLElement | null>;
};

export function useProductStory({
  rootRef,
  sceneRef,
  heroRef,
  featuresRef,
  detailsRef,
  materialsRef,
  displayRef,
  cameraRef,
  ctaRef,
}: StoryRefs) {
  useLayoutEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const root = rootRef.current;
    const scene = sceneRef.current;

    if (!root || !scene) {
      return;
    }

    const hero = STAGE_PRESETS.hero;
    const proxy = {
      rx: hero.rotation[0],
      ry: hero.rotation[1],
      rz: hero.rotation[2],
      cx: hero.cameraPosition[0],
      cy: hero.cameraPosition[1],
      cz: hero.cameraPosition[2],
      lx: hero.lookAt[0],
      ly: hero.lookAt[1],
      lz: hero.lookAt[2],
      shaderMix: hero.shaderMix,
      materialLevel: 0,
    };

    const syncStore = () => {
      useProductStore.getState().setSnapshot({
        rotation: [proxy.rx, proxy.ry, proxy.rz],
        cameraPosition: [proxy.cx, proxy.cy, proxy.cz],
        lookAt: [proxy.lx, proxy.ly, proxy.lz],
        shaderMix: proxy.shaderMix,
        materialMode:
          proxy.materialLevel > 0.66
            ? "hologram"
            : proxy.materialLevel > 0.33
              ? "precision"
              : "classic",
      });
    };

    syncStore();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        pin: scene,
        pinSpacing: false,
        anticipatePin: 1,
      });

      const sections: Array<[RefObject<HTMLElement | null>, StoryStage]> = [
        [heroRef, "hero"],
        [featuresRef, "features"],
        [detailsRef, "details"],
        [materialsRef, "materials"],
        [displayRef, "display"],
        [cameraRef, "camera"],
        [ctaRef, "cta"],
      ];

      sections.forEach(([ref, stage]) => {
        if (!ref.current) {
          return;
        }

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => useProductStore.getState().setStage(stage),
          onEnterBack: () => useProductStore.getState().setStage(stage),
        });
      });

      const features = STAGE_PRESETS.features;
      const details = STAGE_PRESETS.details;
      const materials = STAGE_PRESETS.materials;
      const display = STAGE_PRESETS.display;
      const camera = STAGE_PRESETS.camera;
      const cta = STAGE_PRESETS.cta;

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        })
        .to(proxy, {
          rx: features.rotation[0],
          ry: features.rotation[1],
          rz: features.rotation[2],
          cx: features.cameraPosition[0],
          cy: features.cameraPosition[1],
          cz: features.cameraPosition[2],
          lx: features.lookAt[0],
          ly: features.lookAt[1],
          lz: features.lookAt[2],
          shaderMix: features.shaderMix,
          materialLevel: 0.35,
          duration: 1,
          onUpdate: syncStore,
        })
        .to(proxy, {
          rx: details.rotation[0],
          ry: details.rotation[1],
          rz: details.rotation[2],
          cx: details.cameraPosition[0],
          cy: details.cameraPosition[1],
          cz: details.cameraPosition[2],
          lx: details.lookAt[0],
          ly: details.lookAt[1],
          lz: details.lookAt[2],
          shaderMix: details.shaderMix,
          materialLevel: 0.55,
          duration: 1,
          onUpdate: syncStore,
        })
        .to(proxy, {
          rx: materials.rotation[0],
          ry: materials.rotation[1],
          rz: materials.rotation[2],
          cx: materials.cameraPosition[0],
          cy: materials.cameraPosition[1],
          cz: materials.cameraPosition[2],
          lx: materials.lookAt[0],
          ly: materials.lookAt[1],
          lz: materials.lookAt[2],
          shaderMix: materials.shaderMix,
          materialLevel: 1,
          duration: 1,
          onUpdate: syncStore,
        })
        .to(proxy, {
          rx: display.rotation[0],
          ry: display.rotation[1],
          rz: display.rotation[2],
          cx: display.cameraPosition[0],
          cy: display.cameraPosition[1],
          cz: display.cameraPosition[2],
          lx: display.lookAt[0],
          ly: display.lookAt[1],
          lz: display.lookAt[2],
          shaderMix: display.shaderMix,
          materialLevel: 0.5,
          duration: 1,
          onUpdate: syncStore,
        })
        .to(proxy, {
          rx: camera.rotation[0],
          ry: camera.rotation[1],
          rz: camera.rotation[2],
          cx: camera.cameraPosition[0],
          cy: camera.cameraPosition[1],
          cz: camera.cameraPosition[2],
          lx: camera.lookAt[0],
          ly: camera.lookAt[1],
          lz: camera.lookAt[2],
          shaderMix: camera.shaderMix,
          materialLevel: 0.82,
          duration: 1,
          onUpdate: syncStore,
        })
        .to(proxy, {
          rx: cta.rotation[0],
          ry: cta.rotation[1],
          rz: cta.rotation[2],
          cx: cta.cameraPosition[0],
          cy: cta.cameraPosition[1],
          cz: cta.cameraPosition[2],
          lx: cta.lookAt[0],
          ly: cta.lookAt[1],
          lz: cta.lookAt[2],
          shaderMix: cta.shaderMix,
          materialLevel: 0.6,
          duration: 1,
          onUpdate: syncStore,
        });

      gsap.utils.toArray<HTMLElement>(".story-panel").forEach((panel) => {
        const items = panel.querySelectorAll("[data-reveal]");

        if (!items.length) {
          return;
        }

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
            },
          },
        );
      });

      if (displayRef.current) {
        const displayStats = displayRef.current.querySelectorAll<HTMLElement>("[data-display-stat]");

        if (displayStats.length) {
          gsap.fromTo(
            displayStats,
            { scale: 0.92, rotateX: -14, y: 20 },
            {
              scale: 1,
              rotateX: 0,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: displayRef.current,
                start: "top 72%",
                end: "top 28%",
                scrub: 0.9,
              },
            },
          );
        }
      }

      if (cameraRef.current) {
        const cameraCards = cameraRef.current.querySelectorAll<HTMLElement>("[data-camera-card]");

        if (cameraCards.length) {
          gsap.fromTo(
            cameraCards,
            { autoAlpha: 0, y: 28, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cameraRef.current,
                start: "top 72%",
              },
            },
          );
        }
      }
    }, root);

    return () => ctx.revert();
  }, [rootRef, sceneRef, heroRef, featuresRef, detailsRef, materialsRef, displayRef, cameraRef, ctaRef]);
}
