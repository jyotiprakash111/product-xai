"use client";

import { RoundedBox, shaderMaterial, useGLTF } from "@react-three/drei";
import { extend, type ThreeElement, useFrame } from "@react-three/fiber";
import { type MutableRefObject, useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Box3,
  Color,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
} from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { useProductStore } from "@/lib/store";

const HoloShellMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uTint: new Color("#7dd3fc"),
  },
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 transformed = position;
      float wave = sin((position.y * 5.0) + (uTime * 2.4)) * 0.016;
      transformed.z += wave * (0.18 + uHover * 0.42);
      vWave = wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uHover;
    uniform vec3 uTint;

    void main() {
      float scan = sin((vUv.y * 24.0) - (uTime * 3.2)) * 0.5 + 0.5;
      float edgeX = smoothstep(0.0, 0.04, vUv.x) * (1.0 - smoothstep(0.96, 1.0, vUv.x));
      float edgeY = smoothstep(0.0, 0.03, vUv.y) * (1.0 - smoothstep(0.97, 1.0, vUv.y));
      float edge = pow(edgeX * edgeY, 0.45);
      float pulse = 0.09 + scan * 0.2 + uHover * 0.16;
      float alpha = pulse * (0.55 + edge * 0.45) + abs(vWave) * 1.1;
      gl_FragColor = vec4(uTint, clamp(alpha, 0.0, 0.38));
    }
  `,
);

extend({ HoloShellMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    holoShellMaterial: ThreeElement<typeof HoloShellMaterial>;
  }
}

export default function Model() {
  const group = useRef<Group>(null);
  const { scene: source } = useGLTF("/models/iphone-15-pro-real.glb");
  const setHovered = useProductStore((state) => state.setHovered);
  const clonedScene = useMemo(() => clone(source), [source]);
  const frameMaterials = useRef<MeshStandardMaterial[]>([]);
  const screenMaterials = useRef<MeshStandardMaterial[]>([]);
  const lensMaterials = useRef<MeshStandardMaterial[]>([]);
  const glassMaterials = useRef<MeshStandardMaterial[]>([]);
  const cameraTarget = useMemo(() => new Vector3(), []);
  const lookTarget = useMemo(() => new Vector3(), []);
  const tint = useMemo(() => new Color(), []);
  const softenedTint = useMemo(() => new Color(), []);
  const glassTint = useMemo(() => new Color(), []);
  const neutralGlassTint = useMemo(() => new Color("#edf4ff"), []);
  const screenBaseTint = useMemo(() => new Color("#0b1020"), []);
  const lensHighlightTint = useMemo(() => new Color("#dbe7ff"), []);
  const lensGlowTint = useMemo(() => new Color(), []);
  const normalizedModel = useMemo(() => {
    const bounds = new Box3().setFromObject(clonedScene);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const targetHeight = 2.18;
    const scale = targetHeight / Math.max(size.y, 0.001);

    return {
      center,
      scale,
    };
  }, [clonedScene]);
  const holoMaterialRef = useRef<InstanceType<typeof HoloShellMaterial> | null>(null);

  useEffect(() => {
    frameMaterials.current = [];
    screenMaterials.current = [];
    lensMaterials.current = [];
    glassMaterials.current = [];

    const pushUnique = (bucket: MutableRefObject<MeshStandardMaterial[]>, material: MeshStandardMaterial) => {
      if (!bucket.current.includes(material)) {
        bucket.current.push(material);
      }
    };

    clonedScene.traverse((child) => {
      if (!(child instanceof Mesh)) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;

      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((material) => {
        if (!(material instanceof MeshStandardMaterial)) {
          return;
        }

        const tag = `${child.name} ${material.name}`.toLowerCase();
        const hasAlpha = material.transparent || material.opacity < 0.98;
        const hasEmission = material.emissiveIntensity > 0 || Boolean(material.emissiveMap);

        if (hasEmission || tag.includes("screen") || tag.includes("display")) {
          pushUnique(screenMaterials, material);
        } else if (hasAlpha || tag.includes("glass") || tag.includes("clear")) {
          pushUnique(glassMaterials, material);
        } else if (material.metalness > 0.78 && material.roughness < 0.22) {
          pushUnique(lensMaterials, material);
        } else {
          pushUnique(frameMaterials, material);
        }
      });
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    const snapshot = useProductStore.getState();
    const hoverMix = Math.max(snapshot.shaderMix, snapshot.hovered ? 1 : 0);
    const isDisplayStage = snapshot.stage === "display";
    const isCameraStage = snapshot.stage === "camera";
    const elapsed = state.clock.elapsedTime;

    if (!group.current) {
      return;
    }

    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      snapshot.rotation[0] + state.pointer.y * 0.12,
      4,
      delta,
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      snapshot.rotation[1] + state.pointer.x * 0.25,
      4,
      delta,
    );
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, snapshot.rotation[2], 4, delta);
    group.current.position.y = Math.sin(elapsed * 0.8) * 0.06;

    cameraTarget.set(...snapshot.cameraPosition);
    state.camera.position.lerp(cameraTarget, 0.06);

    lookTarget.set(...snapshot.lookAt);
    state.camera.lookAt(lookTarget);

    tint.set(snapshot.color);
    softenedTint.copy(tint).lerp(neutralGlassTint, 0.78);
    glassTint.copy(tint).lerp(neutralGlassTint, 0.9);
    lensGlowTint.copy(tint).lerp(lensHighlightTint, 0.58);

    frameMaterials.current.forEach((material) => {
      material.color.lerp(softenedTint, 0.01);
      material.metalness = Math.max(material.metalness, snapshot.materialMode === "hologram" ? 0.92 : 0.88);
      material.roughness = Math.min(material.roughness, snapshot.materialMode === "classic" ? 0.18 : 0.12);
      material.envMapIntensity = 2.3;

      if (material instanceof MeshPhysicalMaterial) {
        material.clearcoat = 0.7;
        material.clearcoatRoughness = 0.08;
        material.reflectivity = 0.7;
      }
    });

    glassMaterials.current.forEach((material) => {
      material.color.lerp(glassTint, 0.008);
      material.metalness = Math.max(material.metalness, 0.06);
      material.roughness = Math.min(material.roughness, 0.045);
      material.envMapIntensity = 1.8;

      if (material instanceof MeshPhysicalMaterial) {
        material.clearcoat = 1;
        material.clearcoatRoughness = 0.025;
        material.transmission = 0.02;
        material.ior = 1.5;
        material.thickness = 0.04;
        material.reflectivity = 0.55;
      }
    });

    screenMaterials.current.forEach((material) => {
      material.color.lerp(screenBaseTint, 0.06);
      material.emissive.lerp(isDisplayStage ? new Color("#dff7ff") : tint, isDisplayStage ? 0.1 : 0.02);
      material.emissiveIntensity = MathUtils.damp(
        material.emissiveIntensity,
        isDisplayStage ? 0.62 + Math.sin(elapsed * 2.2) * 0.06 + hoverMix * 0.28 : 0.05 + hoverMix * 0.1,
        5,
        delta,
      );
      material.metalness = Math.max(material.metalness, 0.12);
      material.roughness = Math.min(material.roughness, isDisplayStage ? 0.06 : 0.1);
      material.envMapIntensity = isDisplayStage ? 1.35 : 0.45;

      if (material instanceof MeshPhysicalMaterial) {
        material.clearcoat = 1;
        material.clearcoatRoughness = isDisplayStage ? 0.02 : 0.07;
      }
    });

    lensMaterials.current.forEach((material, index) => {
      const shimmer = isCameraStage
        ? (Math.sin(elapsed * 4.2 + index * 1.3) * 0.5 + 0.5) * (0.75 + hoverMix * 0.25)
        : 0;

      material.color.lerp(lensHighlightTint, 0.03 + shimmer * 0.035);
      material.emissive.copy(isCameraStage ? lensGlowTint : screenBaseTint).lerp(lensHighlightTint, shimmer * 0.45);
      material.emissiveIntensity = MathUtils.damp(
        material.emissiveIntensity,
        isCameraStage ? 0.2 + shimmer * 0.52 + hoverMix * 0.22 : 0.04,
        5,
        delta,
      );
      material.metalness = Math.max(material.metalness, 1);
      material.roughness = Math.min(material.roughness, isCameraStage ? 0.014 - shimmer * 0.006 : 0.03);
      material.envMapIntensity = isCameraStage ? 3.1 + shimmer * 0.75 : 2.55;

      if (material instanceof MeshPhysicalMaterial) {
        material.clearcoat = 1;
        material.clearcoatRoughness = Math.max(0.01, 0.035 - shimmer * 0.02);
        material.reflectivity = 0.7 + shimmer * 0.15;
      }
    });

    if (holoMaterialRef.current) {
      holoMaterialRef.current.uniforms.uTime.value = elapsed;
      holoMaterialRef.current.uniforms.uHover.value = MathUtils.damp(
        holoMaterialRef.current.uniforms.uHover.value,
        hoverMix,
        4,
        delta,
      );
      (holoMaterialRef.current.uniforms.uTint.value as Color).lerp(tint, 0.08);
    }
  });

  return (
    <group ref={group} position={[0, -0.02, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <group
        scale={normalizedModel.scale}
        position={[
          -normalizedModel.center.x * normalizedModel.scale,
          -normalizedModel.center.y * normalizedModel.scale - 0.01,
          -normalizedModel.center.z * normalizedModel.scale,
        ]}
      >
        <primitive object={clonedScene} rotation={[0.015, 0.045, 0]} />
      </group>

      <RoundedBox args={[1.22, 2.24, 0.12]} radius={0.16} smoothness={8} scale={[1.01, 0.98, 1.01]}>
        <holoShellMaterial
          ref={holoMaterialRef}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </RoundedBox>
    </group>
  );
}

useGLTF.preload("/models/iphone-15-pro-real.glb");
