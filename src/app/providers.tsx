'use client';

import { ITrackExt } from '@/models/track';
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
  track: ITrackExt | undefined;
  setTrack: Dispatch<SetStateAction<ITrackExt | undefined>>;
}>({
  track: undefined,
  setTrack: () => {},
});

export default function Providers({ children }: any) {
  const [track, setTrack] = useState<ITrackExt | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  const pause = () => {
    setIsPlaying(false);
  };
  const play = () => {
    setIsPlaying(true);
  };

  return (
    <audioContext.Provider value={{ track, setTrack }}>
      <playerContext.Provider value={{ isPlaying, pause, play }}>{children}</playerContext.Provider>
    </audioContext.Provider>
  );
}
