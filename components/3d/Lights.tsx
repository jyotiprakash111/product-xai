"use client";

import { ContactShadows } from "@react-three/drei";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={1.05} />
      <hemisphereLight intensity={0.85} groundColor="#020617" color="#e0f2fe" />
      <directionalLight
        castShadow
        intensity={2.2}
        position={[3.4, 4.4, 3]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <directionalLight intensity={1.2} position={[-3.2, 2.4, -2.8]} color="#93c5fd" />
      <pointLight intensity={16} distance={10} decay={2} position={[0, 1.1, -3.4]} color="#67e8f9" />
      <spotLight
        angle={0.52}
        intensity={48}
        penumbra={1}
        position={[-4, 4, 3]}
        color="#7dd3fc"
      />
      <spotLight
        angle={0.58}
        intensity={32}
        penumbra={1}
        position={[4.2, 2.2, -2.8]}
        color="#c4b5fd"
      />
      <ContactShadows
        opacity={0.32}
        blur={3.2}
        scale={9}
        far={7}
        resolution={512}
        position={[0, -1.76, 0]}
      />
    </>
  );
}
