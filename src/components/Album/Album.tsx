'use client';

import React, { useEffect, useState } from 'react';
import PlayButton from '../PlayButton';
import Image from 'next/image';
import { getAlbums } from '@/services/album';
import { defaultAlbumImages } from '@/constants/data';
import { IAlbum } from '@/models/album';
import { useRouter } from 'next/navigation';

const Album = () => {
  const router = useRouter();
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const fetchedAlbums = await getAlbums();
        setAlbums(fetchedAlbums.slice(0, 9));
      } catch (error) {
        console.error('Erreur lors du chargement des albums :', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleAlbumClick = (albumId: number) => {
    router.push(`/album/${albumId}`);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Albums</h1>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {albums.map((album, index) => (
            <div
              key={album.id}
              onClick={() => handleAlbumClick(album.id)}
              className="group relative flex w-[150%] cursor-pointer flex-col items-center justify-center gap-x-4 rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
            >
              <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-md">
                <Image
                  src={album.picture || defaultAlbumImages[index % defaultAlbumImages.length]}
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
    </div>
  );
};

export default Album;
