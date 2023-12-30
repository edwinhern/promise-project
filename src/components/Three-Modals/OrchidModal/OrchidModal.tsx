/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';

const OrchidModel = () => {
  const orchidModel = useGLTF('/orchid-flower.glb');

  const scaleFactor = 0.3;
  const positionX = 0;
  const positionY = -3.25;
  const positionZ = -1.5;

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      <pointLight intensity={1} />
      <primitive object={orchidModel.scene} scale={scaleFactor} position={[positionX, positionY, positionZ]} />
    </mesh>
  );
};

export default OrchidModel;
