/* eslint-disable react/no-unknown-property */
import { Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';

import Scene from '@/components/Scene';
import OrchidModal from '@/components/Three-Modals/OrchidModal';
import { useDebugPanel } from '@/hooks';

export function FlowerPage() {
  const isDebugPanelEnabled = useDebugPanel();

  return (
    <>
      <Leva flat titleBar={true} hidden={!isDebugPanelEnabled} collapsed />

      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 300,
          zoom: 0.9,
          position: [0.2, 0.1, 0.5],
        }}
      >
        <Stage preset="rembrandt" environment="sunset">
          <OrchidModal />
        </Stage>
        <Scene />
      </Canvas>
    </>
  );
}
