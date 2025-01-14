'use client';

import { ITrack } from '@/models/track';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

export const playerContext = createContext<{
  isPlaying: boolean;
  pause: Dispatch<SetStateAction<void>>;
  play: Dispatch<SetStateAction<void>>;
}>({
  isPlaying: false,
  pause: () => {},
  play: () => {},
});
export const audioContext = createContext<{
  track: ITrack | undefined;
  setAudio: Dispatch<SetStateAction<ITrack | undefined>>;
}>({
  track: undefined,
  setAudio: () => {},
});

export default function Providers({ children }: any) {
  const [track, setAudioId] = useState<ITrack | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  const pause = () => {
    console.log('pause');
    setIsPlaying(false);
  };
  const play = () => {
    console.log('play');
    setIsPlaying(true);
  };

  return (
    <audioContext.Provider value={{ track, setAudio: setAudioId }}>
      <playerContext.Provider value={{ isPlaying, pause, play }}>{children}</playerContext.Provider>
    </audioContext.Provider>
  );
}
