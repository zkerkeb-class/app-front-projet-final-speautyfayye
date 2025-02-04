'use client';
import { groupContext, playerContext, trackContext } from '@/app/providers';
import { socket } from '@/app/socket';
import TracksList from '@/components/tracksList';
import { ICategoryExt } from '@/models/category.model';
import { ITrack } from '@/models/track.model';
import { useContext } from 'react';

interface CategoryContentProps {
  category: ICategoryExt;
}

const CategoryContent = ({ category }: CategoryContentProps) => {
  const audio = useContext(trackContext);
  const player = useContext(playerContext);
  const group = useContext(groupContext);

  const handleTrackClick = (track: ITrack) => {
    if (audio.track && audio.track.id === track.id) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } else {
      if (group?.groupId) {
        socket.emit('track', {
          currentTrack: track,
          groupId: group.groupId,
        });
      } else {
        audio.setTrack(track);
        player.play();
      }
    }
  };

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto bg-gradient-to-b from-neutral-100 to-neutral-200 p-10 pb-24 dark:from-neutral-900 dark:to-black sm:pb-32">
      <div className="mb-2 space-y-2 md:mb-6">
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          {category.name}
        </h1>
        <p className="mt-2 text-sm text-neutral-300 sm:mt-3 md:mt-4 md:text-base lg:text-lg">
          {category.tracks?.length || 0} tracks
        </p>
      </div>
      <div className="mt-4 sm:mt-6">
        <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white sm:mb-6 sm:text-2xl">
          Tracks
        </h2>
        <div className="flex flex-col gap-y-1">
          {category.tracks?.length ? (
            <TracksList
              tracks={category.tracks}
              onClick={handleTrackClick}
              entityId={category.id}
            />
          ) : (
            'No tracks found.'
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
