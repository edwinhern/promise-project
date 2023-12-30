/* eslint-disable react/no-unknown-property */
import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import confetti from 'canvas-confetti';
import { Pause, Play } from 'lucide-react';
import { random } from 'maath';
import { Suspense, useEffect, useRef, useState } from 'react';
import { suspend } from 'suspend-react';
import * as THREE from 'three';

import { Button } from '@/components/ui/button';
import useStore from '@/store';

export function ToYouPage() {
  const { currentSongIndex, songs } = useStore();
  const currentSongUrl = songs[currentSongIndex].url;

  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 1] }}>
        <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
        <Suspense fallback={null}>
          <Track position-y={0.25} position-z={-0.35} url={currentSongUrl} />
        </Suspense>
        <Stars />
      </Canvas>
      <Overlay />
    </>
  );
}

function Stars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    ref.current.material.size = 0.005;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

function Overlay() {
  const { isTrackPlaying, setIsTrackPlaying, nextSong, previousSong } = useStore();
  const handlePlayClick = () => {
    if (isTrackPlaying) {
      setIsTrackPlaying(false);
    } else {
      setIsTrackPlaying(true);
    }
  };

  const handleConfetti = () => {
    confetti();
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4">
      {/* Top section */}
      <div className="flex w-full items-center justify-end"></div>

      {/* Centered title with responsive font size */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="select-none	text-center  text-9xl font-semibold leading-none tracking-wider">Natwin</h1>
        <div className="flex items-center gap-4">
          <Button className="select-none" onClick={() => previousSong()}>
            Previous
          </Button>
          <Button onClick={handlePlayClick}>
            {!isTrackPlaying ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button className="select-none" onClick={() => nextSong()}>
            Next
          </Button>
          <Button className=" animate-pulse" onClick={handleConfetti}>
            Click me
          </Button>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex w-full items-end justify-between">
        <div className="flex items-center gap-4">
          <a className="select-none text-lg lg:text-2xl">
            &quot;You got me skinny dipping deep inside my head&quot; -Khalid{' '}
          </a>
        </div>
        <div className="hidden select-none text-lg sm:block lg:text-2xl">02.12.2019</div>
      </div>
    </div>
  );
}

interface TrackProps {
  url: string;
  y?: number;
  space?: number;
  width?: number;
  height?: number;
  obj?: THREE.Object3D;
}

function Track({
  url,
  y = 2500,
  space = 1.8,
  width = 0.01,
  height = 0.05,
  obj = new THREE.Object3D(),
  ...props
}: TrackProps) {
  const isTrackPlaying = useStore((store) => store.isTrackPlaying);
  const ref = useRef<any>();
  // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
  // integrates them with React suspense. You can use it as-is with or without r3f.
  const { gain, context, update, data } = suspend(() => createAudio(url, isTrackPlaying), [url, isTrackPlaying]);
  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination);
    // Disconnect it on unmount
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame(() => {
    const avg = update();
    // Distribute the instanced planes according to the frequency daza
    for (let i = 0; i < data.length; i++) {
      obj.position.set(i * width * space - (data.length * width * space) / 2, data[i] / y, 0);
      obj.updateMatrix();
      ref.current.setMatrixAt(i, obj.matrix);
    }
    // Set the hue according to the frequency average
    ref.current.material.color = new THREE.Color().setHSL(avg / 255, 1, 0.5);
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh castShadow ref={ref} args={[undefined, undefined, data.length]} {...props}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

async function createAudio(url: string, isTrackPlaying: boolean) {
  // Fetch audio data and create a buffer source
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new window.AudioContext();
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res));
  source.loop = true;
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  if (isTrackPlaying) {
    source.start(0);
  }
  // Create gain node and an analyser
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(gain);
  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);

  // This function gets called every frame per audio source
  const update = () => {
    analyser.getByteFrequencyData(data);
    // Calculate a frequency average
    return data.reduce((prev, cur) => prev + cur / data.length, 0);
  };

  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update,
  };
}
