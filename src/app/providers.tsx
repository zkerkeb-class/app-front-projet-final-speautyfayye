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
}>({
  nextTracks: undefined,
  setNextTracks: () => {},
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

  // Memoized Values for Contexts
  const playerContextValue = useMemo(() => ({ isPlaying, pause, play }), [isPlaying, pause, play]);
  const trackContextValue = useMemo(() => ({ track, setTrack }), [track]);
  const nextTracksContextValue = useMemo(() => ({ nextTracks, setNextTracks }), [nextTracks]);
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
