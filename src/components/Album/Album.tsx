'use client';

import { IAlbum } from '@/models/album.model';
import { getAlbums } from '@/services/album.service';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ScrollList from '../scrollList';
import { useScopedI18n } from '@/locales/client';

const Album = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const translation = useScopedI18n('albums');
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const fetchedAlbums = await getAlbums();
        setAlbums(fetchedAlbums.slice(0, 9));
      } catch (error) {
        console.error(translation('errors.loading'), error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="mb-4 h-8 w-32" />
        <div className="no-scrollbar grid auto-cols-[160px] grid-flow-col gap-4">
          {[...Array(9)].map((_, index) => (
            <div key={index}>
              <Skeleton className="h-40 w-40 rounded-md" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{translation('title')}</h1>
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

// Ajoutez ces styles dans votre fichier global.css
/*
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
*/
