'use client';

import { useScopedI18n } from '@/locales/client';
import { IPlaylist } from '@/models/playlist';
import { getPlaylists } from '@/services/playlists';
import { useEffect, useState } from 'react';
import ScrollList from '../scrollList';

const Playlists = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const translation = useScopedI18n('playlist.playlists');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const fetchedPlaylists = await getPlaylists();
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error(translation('errors.loading'), error);
      }
    };

    fetchPlaylists();
  }, [translation]);

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
            // imageId={playlist.picture}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
