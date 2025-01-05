import React from 'react';
import { getArtists } from '@/services/artists';
import PlayButton from '../PlayButton';
import Image from 'next/image';
import { defaultArtistImages } from '@/constants/data';

const Artists = async () => {
  const artists = await getArtists();

  // Limiter à 9 artistes
  const limitedArtists = artists.slice(0, 9);

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">Artistes Populaires</h1>
      <div className="flex w-max space-x-4">
        {limitedArtists.map((artist, index) => (
          <div
            key={artist.id}
            className="group relative flex flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
          >
            <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-md">
              <Image
                src={
                  artist.picture || // Utiliser l'image spécifique à l'artiste si disponible
                  defaultArtistImages[index % defaultArtistImages.length] // Sélectionner une image par défaut en fonction de l'index
                }
                alt={artist.name}
                fill
              />
            </div>
            <div className="flex w-full flex-col items-start gap-y-1 pt-4">
              <p className="w-full truncate font-semibold">{artist.name}</p>
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

export default Artists;
