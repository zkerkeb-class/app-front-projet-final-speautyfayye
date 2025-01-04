import React from 'react';
import Image from 'next/image';
import PlayButton from './PlayButton';

interface SongItemProps {
  title: string;
  artist: string;
  imageUrl: string;
}

const SongItem: React.FC<SongItemProps> = ({ title, artist, imageUrl }) => {
  return (
    <div className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image src={imageUrl} alt={title} fill />
      </div>
      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{title}</p>
        <p className="w-full truncate text-sm text-neutral-400">by {artist}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
