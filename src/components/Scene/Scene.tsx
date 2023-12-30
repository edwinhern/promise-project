/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { FC, Suspense } from 'react';

import Loader from '@/components/Loader/';
import { useCustomControls, useDebugPanel } from '@/hooks';

import Stars from '../Stars/Stars';

const Scene: FC = () => {
  // check if debug panel is enabled
  const isDebugPanelEnabled = useDebugPanel();
  const controls = useCustomControls();

  return (
    <>
      {isDebugPanelEnabled && <Perf position="top-left" showGraph={false} minimal />}

      <OrbitControls
        enabled={controls.scene.orbitControls}
        makeDefault
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        dampingFactor={0.3}
      />

      <Suspense fallback={<Loader />}>
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} color="#ffdfba" />
        <ambientLight intensity={Math.PI / 0.8} />
        <Stars />
      </Suspense>
    </>
  );
};

export default Scene;
