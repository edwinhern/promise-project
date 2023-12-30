/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Canvas, ThreeEvent, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function OrchidFlower() {
  const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const orchidModel = useLoader(GLTFLoader, '/orchid-flower.glb');

  //   useFrame(() => {
  //     if (ref.current && !ref.current.userData.isPointerOver) {
  //       ref.current.rotation.y += 0.001; // adjust the speed of auto-rotation here
  //     }
  //   });

  const onPointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (ref.current) {
      ref.current.userData.isPointerOver = true;
    }
  };

  const onPointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (ref.current) {
      ref.current.userData.isPointerOver = false;
    }
  };

  return (
    <mesh ref={ref} position={[-1, -4, 0]} scale={[1, 1, 1]} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <primitive object={orchidModel.scene} />
    </mesh>
  );
}

export function ToYouPage() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 40, up: [0, 1, 0], near: -10, far: 10 }}>
      <color attach="background" args={['#fef4ef']} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 1, 1]} intensity={0.5} />
      <directionalLight position={[-1, -1, -1]} intensity={0.5} />
      <OrchidFlower />
    </Canvas>
  );
}
