import { Html, useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html
      className="gap-4 bg-background"
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Loader2 size={64} />
      <p className="font-bold">{progress.toFixed(2)}%</p>
    </Html>
  );
};

export default Loader;
