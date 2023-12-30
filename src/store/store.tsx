import { createRef, MutableRefObject } from 'react';
import { create } from 'zustand';

type StarsRef = THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null;
type AudioRef = THREE.PositionalAudio | null;

type SongDetails = {
  url: string;
};

export type State = {
  songs: SongDetails[];
  currentSongIndex: number;
  isTrackPlaying: boolean;
  refs: {
    audio: MutableRefObject<AudioRef>;
    stars: MutableRefObject<StarsRef>;
  };
};

type Actions = {
  setIsTrackPlaying: (isPlaying: boolean) => void;
  setCurrentSongIndex: (index: number) => void;
  nextSong: () => void;
  previousSong: () => void;
};

// refs
const stars = createRef<StarsRef>() as MutableRefObject<StarsRef>;
stars.current = null;

const audio = createRef<AudioRef>() as MutableRefObject<AudioRef>;
audio.current = null;

const useStore = create<State & Actions>((set) => ({
  songs: [{ url: '/music/Floating.mp3' }, { url: '/music/RockYourWorld.mp3' }],
  currentSongIndex: 0,
  isTrackPlaying: false,
  refs: { audio, stars },
  setIsTrackPlaying: (isTrackPlaying) => set(() => ({ isTrackPlaying })),
  setCurrentSongIndex: (index) => set({ currentSongIndex: index }),
  nextSong: () =>
    set((state) => ({
      currentSongIndex: (state.currentSongIndex + 1) % state.songs.length,
    })),
  previousSong: () =>
    set((state) => ({
      currentSongIndex: (state.currentSongIndex - 1 + state.songs.length) % state.songs.length,
    })),
}));

export default useStore;
