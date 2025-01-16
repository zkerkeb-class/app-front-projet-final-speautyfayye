'use client';

import { IAlbum } from '@/models/album';
import { getAlbums } from '@/services/album';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScrollList from '../scrollList';

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

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Albums</h1>
      <div className="flex space-x-4 overflow-x-scroll">
        {albums.map((album, index) => (
          <ScrollList
            href="/album/"
            id={album.id}
            key={index}
            name={album.title}
            imageId={album.picture}
          />
        ))}
      </div>
    </div>
  );
};

export default Album;
