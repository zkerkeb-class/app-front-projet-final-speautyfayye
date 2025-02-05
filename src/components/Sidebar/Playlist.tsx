// Playlist.tsx
'use client';
import { useContext } from 'react';
import { useScopedI18n } from '@/locales/client';
import Link from 'next/link';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoLibrary } from 'react-icons/io5';
import {
  groupContext,
  nextTracksContext,
  playerContext,
  trackContext,
  trackHistoryContext,
} from '@/app/providers';
import TracksList from '../tracksList';
import { socket } from '@/app/socket';
import { ITrack } from '@/models/track.model';

const Playlist = () => {
  const translation = useScopedI18n('playlist');
  const trackHistory = useContext(trackHistoryContext);
  const audio = useContext(trackContext);
  const nextTracks = useContext(nextTracksContext);
  const player = useContext(playerContext);
  const group = useContext(groupContext);

  const truncateText = (text: string, maxLength: number = 20) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleTrackClick = (track: ITrack) => {
    if (audio.track && track.id === audio.track.id) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } else {
      if (group?.groupId) {
        socket.emit('track', {
          currentTrack: track,
          nextTracksList: [track],
          groupId: group.groupId,
        });
      } else {
        audio.setTrack(track);
        nextTracks.setNextTracks([track]);
        player.play();
      }
    }
  };

  return (
    <div className="h-[calc(88vh-12rem)] w-full space-y-4 bg-neutral-100 pb-3 dark:bg-neutral-800/30">
      <div className="flex w-full items-center justify-between px-6 py-3">
        <div className="flex w-full items-center gap-x-3 text-neutral-600 dark:text-neutral-400">
          <IoLibrary className="h-6 w-6" />
          <p className="text-sm font-semibold">{translation('library')}</p>
        </div>
        <div className="ease-in-out-duration-300 flex h-8 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-300/15 dark:text-neutral-300 dark:hover:bg-neutral-700/15">
          <HiOutlinePlus className="text-xl" />
        </div>
      </div>
      <div className="h-full w-full space-y-7 overflow-y-auto px-2">
        <div className="w-full space-y-5 rounded-md bg-neutral-200 px-5 py-3 dark:bg-neutral-700/40">
          <div className="space-y-2">
            <h6 className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-50">
              {truncateText(translation('createFirstPlaylist.title'))}
            </h6>
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-100">
              {truncateText(translation('createFirstPlaylist.description'))}
            </p>
          </div>
          <button className="h-8 w-fit rounded-full bg-neutral-900 px-4 text-sm font-semibold text-neutral-50 duration-100 ease-in-out hover:scale-105 dark:bg-neutral-50 dark:text-neutral-950">
            <Link href="/createPlaylist">{translation('createPlaylist')}</Link>
          </button>
        </div>

        {trackHistory.trackHistory.length > 0 && (
          <div className="space-y-4">
            <h2 className="px-3 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Récemments joués
            </h2>
            <div className="space-y-2">
              {trackHistory.trackHistory.map((track) => (
                <TracksList
                  key={track.id}
                  entityId={track.id}
                  tracks={[track]}
                  onClick={handleTrackClick}
                  truncateText={truncateText}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
