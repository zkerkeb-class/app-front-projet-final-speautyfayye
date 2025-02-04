'use client';

import { I18nProviderClient } from '@/locales/client';
import { ITrackExt } from '@/models/track.model';
import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

// Contexts
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
  shuffle: (tracks: ITrackExt[]) => void;
}>({
  nextTracks: undefined,
  setNextTracks: () => {},
  shuffle: () => {},
});

export const groupContext = createContext<{
  groupId: string | undefined;
  setGroupId: Dispatch<SetStateAction<string | undefined>>;
}>({
  groupId: undefined,
  setGroupId: () => {},
});

// Providers Component
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
  const [groupId, setGroupId] = useState<string | undefined>(undefined);

  // Callback Functions
  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const shuffle = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (tracks: ITrackExt[]) => {
      if (!tracks.length || !track) {
        console.warn('Cannot shuffle: tracks or current track is undefined.');
        return;
      }

      const firstTrack = tracks.find((t) => t.id === track.id);
      if (!firstTrack) {
        console.warn('Track with the specified ID not found.');
        return;
      }

      const remainingTracks = tracks.filter((t) => t.id !== track.id);
      const shuffledTracks = remainingTracks
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setNextTracks([firstTrack, ...shuffledTracks]);
    },
    [track],
  );

  // Memoized Values for Contexts
  const playerContextValue = useMemo(() => ({ isPlaying, pause, play }), [isPlaying, pause, play]);
  const trackContextValue = useMemo(() => ({ track, setTrack }), [track]);
  const nextTracksContextValue = useMemo(
    () => ({ nextTracks, setNextTracks, shuffle }),
    [nextTracks, shuffle],
  );
  const groupContextValue = useMemo(() => ({ groupId, setGroupId }), [groupId]);

  return (
    <I18nProviderClient locale={locale}>
      <groupContext.Provider value={groupContextValue}>
        <trackContext.Provider value={trackContextValue}>
          <nextTracksContext.Provider value={nextTracksContextValue}>
            <playerContext.Provider value={playerContextValue}>{children}</playerContext.Provider>
          </nextTracksContext.Provider>
        </trackContext.Provider>
      </groupContext.Provider>
    </I18nProviderClient>
  );
}
