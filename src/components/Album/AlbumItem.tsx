import React from 'react';
import Image from 'next/image';
import PlayButton from '../PlayButton';

interface AlbumItemProps {
  name: string;
  imageUrl: string;
  bio?: string;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ name, imageUrl, bio }) => {
  return (
    <div className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800">
            <span className="text-neutral-400">No Image</span>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{name}</p>
        <p className="w-full truncate text-sm text-neutral-400">{bio}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default AlbumItem;
// Compare this snippet from app-front-projet-final-speautyfayye/src/components/Album/AlbumItem.tsx:
