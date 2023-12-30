import { useControls } from 'leva';

// scene
function useSceneControl() {
  const scene = useControls(
    'scene',
    {
      orbitControls: { value: true },
      zenMode: { value: false },
      fogAndBg: {
        value: '#021119',
      },
      fogDensity: {
        min: 0,
        max: 100,
        step: 0.01,
        value: 3.5,
      },
    },
    { collapsed: true }
  );

  return scene;
}

// audio
function useAudioControl() {
  const audio = useControls(
    'audio',
    {
      volume: {
        min: 0,
        max: 1,
        step: 0.01,
        value: 0.5,
      },
    },
    { collapsed: true }
  );

  return audio;
}

// stars
function useStarsControl() {
  const stars = useControls(
    'stars',
    {
      position: {
        value: {
          x: 0,
          y: -300,
          z: 5,
        },
        step: 1,
      },
      size: {
        min: 0,
        max: 20,
        step: 0.01,
        value: 4,
      },
      range: {
        value: {
          x: 500,
          y: 500,
          z: 100,
        },
        step: 1,
      },
    },
    { collapsed: true }
  );

  return stars;
}

// all controls in one place
function useCustomControls() {
  const scene = useSceneControl();
  const audio = useAudioControl();
  const stars = useStarsControl();

  return {
    audio,
    scene,
    stars,
  } as const;
}

export default useCustomControls;
