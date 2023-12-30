/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { FC, Suspense } from 'react';

import Loader from '@/components/Loader/';
import { useCameraControl, useCustomControls, useDebugPanel, useWindowSize } from '@/hooks';

import Stars from '../Stars/Stars';

const Scene: FC = () => {
  // check if debug pannel is enabled
  const isDebugPanelEnabled = useDebugPanel();
  const controls = useCustomControls();

  // handle updates from the debug panel
  useCameraControl();
  useWindowSize();

  // eslint-disable-next-line no-console
  console.log('rendered');

  return (
    <>
      <color args={[controls.scene.fogAndBg]} attach="background" />

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

      <fogExp2 attach="fog" color={controls.scene.fogAndBg} density={controls.scene.fogDensity / 100} />

      <Suspense fallback={<Loader />}>
        <ambientLight intensity={Math.PI / 0.8} />
        <Stars />
      </Suspense>
    </>
  );
};

export default Scene;
