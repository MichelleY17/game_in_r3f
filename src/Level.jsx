import React, { useEffect, useState } from "react";

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { BlockLimbo } from "./components/BlockLimbo";
import { BlockSpinner } from "./components/BlockSpinner";
import { BlockSlide } from "./components/BlockSlide";
import { useLoader } from "@react-three/fiber";

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });



export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Starting Floor */}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
}
export function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF('/hamburger.glb')

    hamburger.scene.children.forEach((mesh) =>
    {
        mesh.castShadow = true
    })

  return (
    <group position={position}>
      {/* End Floor */}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody type="fixed" colliders="hull" position={ [ 0, 0.25, 0 ] } restitution={ 0.2 } friction={ 0 }>
            <primitive object={ hamburger.scene } scale={ 0.2 } />
        </RigidBody>
    </group>
  );
}
export function Bounds({ length = 1 }) {
  const wallTexture = useLoader(
    THREE.TextureLoader,
    "/textures/Dungeon_wall2.jpg"
  );
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={new THREE.MeshStandardMaterial({
            map: wallTexture,
          })}
          scale={[0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={new THREE.MeshStandardMaterial({
            map: wallTexture,
          })}
          scale={[0.3, 1.5, 4 * length]}
          receiveShadow
        />
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={boxGeometry}
          material={new THREE.MeshStandardMaterial({
            map: wallTexture,
          })}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />
        <CuboidCollider
          type="fixed"
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
}
export function Level({
  count = 5,
  types = [BlockSpinner, BlockSlide, BlockLimbo], seed = 0
}) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      setBlocks((prev) => [...prev, type]);
    }
  }, []);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, index) => {
        return <Block key={index} position={[0, 0, -(index + 1) * 4]} />;
      })}

      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
}
