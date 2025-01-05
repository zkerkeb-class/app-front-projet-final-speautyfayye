'use client';

import React, { useEffect, useState } from 'react';
import PlayButton from '../PlayButton';
import Image from 'next/image';
import { getArtists } from '@/services/artists';
import { defaultArtistImages } from '@/constants/data';
import { IArtist } from '@/models/artist';

const Artists = () => {
  const [artists, setArtists] = useState<IArtist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const fetchedArtists = await getArtists();
        setArtists(fetchedArtists.slice(0, 9)); // Limiter à 9 artistes
      } catch (error) {
        console.error('Erreur lors du chargement des artistes :', error);
      }
    };

    fetchArtists();
  }, []); // Appeler une seule fois lors du montage

  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">Artistes Populaires</h1>
      <div className="flex w-max space-x-4">
        {artists.map((artist, index) => (
          <div
            key={artist.id}
            className="group relative flex flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
          >
            <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-md">
              <Image
                src={artist.picture || defaultArtistImages[index % defaultArtistImages.length]}
                alt={artist.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
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
