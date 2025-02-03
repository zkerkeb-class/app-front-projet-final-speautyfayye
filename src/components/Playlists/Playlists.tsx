'use client';

import { useScopedI18n } from '@/locales/client';
import { IPlaylistExt } from '@/models/playlist.model';
import { getPlaylists } from '@/services/playlist.service';
import { useEffect, useState } from 'react';
import ScrollList from '../scrollList';
import { Skeleton } from '../ui/skeleton';

const Playlists = () => {
  const [playlists, setPlaylists] = useState<IPlaylistExt[]>([]);
  const translation = useScopedI18n('playlist.playlists');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const fetchedPlaylists = await getPlaylists();
        console.log('🚀 ~ fetchPlaylists ~ fetchedPlaylists:', fetchedPlaylists);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error(translation('errors.loading'), error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [translation]);

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
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">{translation('title')}</h1>
      <div className="flex space-x-4 overflow-x-scroll">
        {playlists.map((playlist, index) => (
          <ScrollList
            href="/playlist/"
            id={playlist.id}
            key={index}
            name={playlist.title}
            imageId={playlist.tracks[0]?.picture}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
