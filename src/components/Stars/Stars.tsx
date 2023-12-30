/* eslint-disable react/no-unknown-property */

import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

import useCustomControls from '@/hooks/useCustomControls';
import useStore from '@/store';

import fragmentShader from '../../shaders/star/star.fragment.glsl';
import vertexShader from '../../shaders/star/star.vertex.glsl';

interface StarProps {
  count?: number;
}

const Stars: React.FC<StarProps> = (props) => {
  // refs
  const stars = useStore((store) => store.refs.stars);

  // controls
  const controls = useCustomControls();

  // Scene
  const getPixelRatio = useThree((context) => context.gl.getPixelRatio);
  const camera = useThree((context) => context.camera);

  const particles = useMemo(() => {
    const count = props.count ?? 5000;

    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const index = i * 3;
      positions[index + 0] = (Math.random() - 0.5) * 500;
      positions[index + 1] = Math.random() * 500;
      positions[index + 2] = (Math.random() - 0.5) * 100;
    }

    for (let i = 0; i < count; i++) {
      scales[i] = Math.random();
    }

    return { positions, scales };
  }, [props.count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 10 * getPixelRatio() },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!stars.current) return;
    // stars.current!.visible = true;

    const position = controls.stars.position;
    stars.current.position.set(position.x, position.y, position.z);
    stars.current.position.z = camera.position.z + 250;
    stars.current.material.uniforms.uSize.value = controls.stars.size;

    const count = stars.current.geometry.attributes.position.count;
    const positions = (stars.current.geometry.attributes.position as unknown as any).array as number[];

    for (let i = 0; i < count; i++) {
      const index = i * 3;
      positions[index + 0] = (Math.random() - 0.5) * controls.stars.range.x;
      positions[index + 1] = Math.random() * controls.stars.range.y;
      positions[index + 2] = (Math.random() - 0.5) * controls.stars.range.z;
    }

    stars.current.geometry.attributes.position.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls.stars.position, controls.stars.range]);

  return (
    <points ref={stars} position={[0.2, 0.1, 0.5]} visible={true}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          array={particles.scales}
          count={particles.scales.length}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </points>
  );
};

export default Stars;
