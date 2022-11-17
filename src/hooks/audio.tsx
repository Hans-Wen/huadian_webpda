import React, { useRef, useState } from 'react';
import fail from '@/assets/audio/fail.wav';
import pass from '@/assets/audio/pass.wav';
import unlock from '@/assets/audio/unlock.wav';
interface IAudioProps extends React.AudioHTMLAttributes<any> {
  src: string;
}
const wrapEvent = (userEvent: any, proxyEvent?: any) => {
  return (event: any) => {
    try {
      proxyEvent && proxyEvent(event);
    } finally {
      userEvent && userEvent(event);
    }
  };
};

export const useAudio = (props: IAudioProps) => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState({
    time: 0,
    duration: 0,
    paused: true,
    muted: false,
    volume: 1,
  });

  const onPlay = () => {
    setState((obj) => {
      return { ...obj, paused: false };
    });
  };
  const onPause = () => {
    setState((obj) => {
      return { ...obj, paused: true };
    });
  };
  const element = React.createElement('audio', {
    ...props,
    ref,
    onPlay: wrapEvent(props.onPlay, onPlay),
    onPause: wrapEvent(props.onPause, onPause),
    onEnded: wrapEvent(props.onEnded, onPause),
  });

  let lockPlay: boolean = false;

  const controls = {
    play: () => {
      const el = ref.current;
      if (!el) {
        return undefined;
      }

      if (!lockPlay) {
        const promise = el.play();
        const isPromise = typeof promise === 'object';

        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise.then(resetLock, resetLock);
        }

        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = ref.current;
      if (el && !lockPlay) {
        return el.pause();
      }
    },
    seek: (time: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }
      time = Math.min(state.duration, Math.max(0, time));
      el.currentTime = time;
    },
    volume: (volume: number) => {
      const el = ref.current;
      if (!el) {
        return;
      }
      volume = Math.min(1, Math.max(0, volume));
      el.volume = volume;
      setState((obj) => {
        return { ...obj, volume };
      });
    },
    mute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = true;
    },
    unmute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = false;
    },
  };

  return [
    <span style={{ display: 'none' }}>
      {element}
      {state.paused ? (
        <button onClick={controls.play}>播放</button>
      ) : (
        <button onClick={controls.pause}>暂停</button>
      )}
    </span>,
    controls,
    ref,
  ] as const;
};

export const useCustomAudio = () => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [failAudio, failcontrols] = useAudio({
    src: fail,
  });
  const [passAudio, passcontrols] = useAudio({
    src: pass,
  });
  const [unlockpassAudio, unlockpasscontrols] = useAudio({
    src: unlock,
  });
  const controls = {
    pass: () => {
      passcontrols.play();
      return;
    },
    fail: () => {
      failcontrols.play();
      return;
    },
    unlockpass: () => {
      unlockpasscontrols.play();
      return;
    },
  };

  return [
    <span>
      {passAudio}
      {failAudio}
      {unlockpassAudio}
    </span>,
    controls,
    ref,
  ] as const;
};
