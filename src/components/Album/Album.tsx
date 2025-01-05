import React from 'react';
import PlayButton from '../PlayButton';
import Image from 'next/image';
import { getAlbums } from '@/services/album';
import { defaultAlbumImages } from '@/constants/data';

const Album = async () => {
  const albums = await getAlbums();

  // Limiter à 9 albums
  const limitedAlbums = albums.slice(0, 9);

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">Albums</h1>
      <div className="flex w-max space-x-4">
        {limitedAlbums.map((album, index) => (
          <div
            key={album.id}
            className="group relative flex flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
          >
            <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-md">
              <Image
                src={
                  album.picture || // Utiliser l'image spécifique à l'album si disponible
                  defaultAlbumImages[index % defaultAlbumImages.length] // Image par défaut cyclique
                }
                alt={album.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="flex w-full flex-col items-start gap-y-1 pt-4">
              <p className="w-full truncate font-semibold">{album.title}</p>
            </div>
            <div className="absolute bottom-4 right-4">
              <PlayButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
