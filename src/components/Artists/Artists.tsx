'use client';

import { IArtist } from '@/models/artist.model';
import { getArtists } from '@/services/artist.service';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ScrollList from '../scrollList';
import { useScopedI18n } from '@/locales/client';

const Artists = () => {
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const translation = useScopedI18n('artists');
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const fetchedArtists = await getArtists();
        setArtists(fetchedArtists.slice(0, 9));
      } catch (error) {
        console.error(translation('errors.loading'), error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
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
        {artists.map((artist, index) => (
          <ScrollList
            href="/artist/"
            id={artist.id}
            key={index}
            name={artist.name}
            imageId={artist.picture}
          />
        ))}
      </div>
    </div>
  );
};

export default Artists;
