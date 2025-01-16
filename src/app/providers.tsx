'use client';

import { I18nProviderClient } from '@/locales/client';
import { ITrackExt } from '@/models/track';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

export const playerContext = createContext<{
  isPlaying: boolean;
  pause: Dispatch<SetStateAction<void>>;
  play: Dispatch<SetStateAction<void>>;
}>({
  isPlaying: false,
  pause: () => {},
  play: () => {},
});

export const trackContext = createContext<{
  track: ITrackExt | undefined;
  setTrack: Dispatch<SetStateAction<ITrackExt | undefined>>;
}>({
  track: undefined,
  setTrack: () => {},
});

export const nextTracksContext = createContext<{
  nextTracks: ITrackExt[] | undefined;
  setNextTracks: Dispatch<SetStateAction<ITrackExt[] | undefined>>;
  shuffle: (tracks: ITrackExt[] | undefined) => void;
}>({
  nextTracks: undefined,
  setNextTracks: () => {},
  shuffle: () => {},
});

export default function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [track, setTrack] = useState<ITrackExt | undefined>();
  const [nextTracks, setNextTracks] = useState<ITrackExt[] | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const pause = () => {
    setIsPlaying(false);
  };
  const play = () => {
    setIsPlaying(true);
  };

  const shuffle = (tracks: ITrackExt[] | undefined) => {
    if (tracks && track) {
      const firstTrack = tracks.find((t) => t.id === track.id);

      if (!firstTrack) {
        throw new Error('Track with the specified ID not found.');
      }

      const remainingTracks = tracks.filter((t) => t.id !== track.id);
      const shuffledTracks = remainingTracks
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setNextTracks([firstTrack, ...shuffledTracks]);
    }
  };

  return (
    <I18nProviderClient locale={locale}>
      <trackContext.Provider value={{ track, setTrack }}>
        <nextTracksContext.Provider value={{ nextTracks: nextTracks, setNextTracks, shuffle }}>
          <playerContext.Provider value={{ isPlaying, pause, play }}>
            {children}
          </playerContext.Provider>
        </nextTracksContext.Provider>
      </trackContext.Provider>
    </I18nProviderClient>
  );
}
