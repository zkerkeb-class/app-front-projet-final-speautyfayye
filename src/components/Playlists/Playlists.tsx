import React from 'react';
import { getPlaylists } from '@/services/playlists';
import PlayButton from '../PlayButton';
import Image from 'next/image';
import { defaultPlaylistImages } from '@/constants/data';

const Playlists = async () => {
  const playlists = await getPlaylists();

  // Limiter à 9 playlists
  const limitedPlaylists = playlists.slice(0, 9);

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">Playlists</h1>
      <div className="flex w-max space-x-4">
        {limitedPlaylists.map((playlist, index) => (
          <div
            key={playlist.id}
            className="group relative flex flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
          >
            <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-md">
              <Image
                src={
                  defaultPlaylistImages[index % defaultPlaylistImages.length] // Assigner une image par défaut
                }
                alt={playlist.title}
                fill
              />
            </div>
            <div className="flex w-full flex-col items-start gap-y-1 pt-4">
              <p className="w-full truncate font-semibold">{playlist.title}</p>
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

export default Playlists;
