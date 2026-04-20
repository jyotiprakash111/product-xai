import fs from "fs";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

class NodeFileReader {
  constructor() {
    this.result = null;
    this.onloadend = null;
  }

  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    this.onloadend?.();
  }

  async readAsDataURL(blob) {
    const buffer = Buffer.from(await blob.arrayBuffer());
    const mime = blob.type || "application/octet-stream";
    this.result = `data:${mime};base64,${buffer.toString("base64")}`;
    this.onloadend?.();
  }
}

globalThis.FileReader = NodeFileReader;

function createRoundedRectShape(width, height, radius) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

function createRoundedSlab(width, height, depth, radius, material, name) {
  const geometry = new THREE.ExtrudeGeometry(createRoundedRectShape(width, height, radius), {
    depth,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: Math.min(radius * 0.18, 0.045),
    bevelThickness: Math.min(depth * 0.35, 0.03),
    curveSegments: 20,
  });

  geometry.center();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

const scene = new THREE.Scene();
const phone = new THREE.Group();
phone.name = "iPhone15Pro";

const titaniumMaterial = new THREE.MeshPhysicalMaterial({
  color: "#9ca3af",
  metalness: 1,
  roughness: 0.16,
  clearcoat: 0.3,
  clearcoatRoughness: 0.18,
  name: "TitaniumFrameMaterial",
});

const backGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#cbd5e1",
  metalness: 0.18,
  roughness: 0.08,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  name: "BackGlassMaterial",
});

const screenMaterial = new THREE.MeshPhysicalMaterial({
  color: "#050816",
  emissive: "#0b1225",
  emissiveIntensity: 0.2,
  metalness: 0.22,
  roughness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.03,
  name: "ScreenGlassMaterial",
});

const accentMaterial = new THREE.MeshStandardMaterial({
  color: "#111827",
  metalness: 0.78,
  roughness: 0.24,
  name: "AccentMaterial",
});

const lensMetalMaterial = new THREE.MeshStandardMaterial({
  color: "#94a3b8",
  metalness: 1,
  roughness: 0.18,
  name: "LensMetalMaterial",
});

const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#dbeafe",
  metalness: 0.4,
  roughness: 0.04,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  name: "LensGlassMaterial",
});

const sensorMaterial = new THREE.MeshStandardMaterial({
  color: "#e2e8f0",
  emissive: "#f8fafc",
  emissiveIntensity: 0.08,
  metalness: 0.4,
  roughness: 0.3,
  name: "SensorMaterial",
});

const frame = createRoundedSlab(1.48, 2.92, 0.18, 0.23, titaniumMaterial, "TitaniumFrame");
phone.add(frame);

const backGlass = createRoundedSlab(1.34, 2.78, 0.024, 0.2, backGlassMaterial, "BackGlassPanel");
backGlass.position.z = -0.095;
phone.add(backGlass);

const screen = createRoundedSlab(1.24, 2.62, 0.018, 0.15, screenMaterial, "ScreenPanel");
screen.position.z = 0.099;
phone.add(screen);

const dynamicIsland = createRoundedSlab(0.36, 0.12, 0.014, 0.06, accentMaterial, "DynamicIsland");
dynamicIsland.position.set(0, 1.02, 0.11);
phone.add(dynamicIsland);

const cameraBump = createRoundedSlab(0.74, 0.78, 0.075, 0.15, titaniumMaterial, "CameraBump");
cameraBump.position.set(-0.22, 0.76, -0.125);
phone.add(cameraBump);

for (const [x, y] of [
  [-0.39, 0.94],
  [-0.12, 0.94],
  [-0.255, 0.67],
]) {
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.04, 48), lensMetalMaterial);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(x, y, -0.08);
  ring.name = "LensRing";
  ring.castShadow = true;
  phone.add(ring);

  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.092, 0.05, 48), lensGlassMaterial);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(x, y, -0.056);
  lens.name = "LensGlass";
  lens.castShadow = true;
  phone.add(lens);
}

const flash = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.025, 32), sensorMaterial);
flash.rotation.x = Math.PI / 2;
flash.position.set(-0.08, 0.62, -0.09);
flash.name = "FlashSensor";
phone.add(flash);

const lidar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.025, 32), accentMaterial);
lidar.rotation.x = Math.PI / 2;
lidar.position.set(-0.42, 0.62, -0.09);
lidar.name = "LidarSensor";
phone.add(lidar);

const actionButton = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.18, 0.045), accentMaterial);
actionButton.position.set(-0.76, 0.65, 0);
actionButton.name = "ActionButton";
phone.add(actionButton);

const volumeUp = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.24, 0.045), accentMaterial);
volumeUp.position.set(-0.76, 0.28, 0);
volumeUp.name = "VolumeUp";
phone.add(volumeUp);

const volumeDown = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.24, 0.045), accentMaterial);
volumeDown.position.set(-0.76, -0.04, 0);
volumeDown.name = "VolumeDown";
phone.add(volumeDown);

const sideButton = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.42, 0.045), accentMaterial);
sideButton.position.set(0.76, 0.22, 0);
sideButton.name = "SideButton";
phone.add(sideButton);

const chargePort = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.035, 0.04), accentMaterial);
chargePort.position.set(0, -1.47, 0);
chargePort.name = "ChargePort";
phone.add(chargePort);

for (const x of [-0.3, -0.22, -0.14, 0.14, 0.22, 0.3]) {
  const grille = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.02, 16), accentMaterial);
  grille.rotation.z = Math.PI / 2;
  grille.position.set(x, -1.47, 0);
  grille.name = "SpeakerGrille";
  phone.add(grille);
}

scene.add(phone);

const exporter = new GLTFExporter();
const result = await exporter.parseAsync(scene, {
  binary: false,
  onlyVisible: true,
});

fs.mkdirSync("public/models", { recursive: true });
fs.writeFileSync("public/models/iphone-15-pro.gltf", JSON.stringify(result, null, 2));
console.log("Generated public/models/iphone-15-pro.gltf");
