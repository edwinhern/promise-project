import { createRef, MutableRefObject } from 'react';
import { create } from 'zustand';

type StarsRef = THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null;
type MoonRef = THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial> | null;
type AudioRef = THREE.PositionalAudio | null;

export type State = {
  audioAnalyser?: THREE.AudioAnalyser;
  isTrackPlaying: boolean;
  refs: {
    audio: MutableRefObject<AudioRef>;
    pause: MutableRefObject<{ value: boolean }>;
    moon: MutableRefObject<MoonRef>;
    reverse: MutableRefObject<{ value: boolean }>;
    stars: MutableRefObject<StarsRef>;
  };
};

type Actions = {
  setAudioAnalyser: (audioAnalyser: THREE.AudioAnalyser) => void;
  setIsTrackPlaying: (isPlaying: boolean) => void;
};

// refs
export const pause = createRef<{ value: boolean }>() as MutableRefObject<{
  value: boolean;
}>;
pause.current = { value: false };

export const reverse = createRef<{ value: boolean }>() as MutableRefObject<{
  value: boolean;
}>;
reverse.current = { value: false };

const stars = createRef<StarsRef>() as MutableRefObject<StarsRef>;
stars.current = null;

const moon = createRef<MoonRef>() as MutableRefObject<MoonRef>;
moon.current = null;

const audio = createRef<AudioRef>() as MutableRefObject<AudioRef>;
audio.current = null;

const useStore = create<State & Actions>((set) => ({
  audioAnalyser: undefined, // will be assigned when the audio track is loaded
  isTrackPlaying: false,
  refs: {
    audio,
    moon,
    pause,
    reverse,
    stars,
  },
  setAudioAnalyser: (audioAnalyser) => set(() => ({ audioAnalyser })),
  setIsTrackPlaying: (isTrackPlaying) => set(() => ({ isTrackPlaying })),
}));

export default useStore;
