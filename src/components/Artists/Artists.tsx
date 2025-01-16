'use client';

import React, { useEffect, useState } from 'react';
import { getArtists } from '@/services/artists';
import { IArtist } from '@/models/artist';
import ScrollList from '../scrollList';

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
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Artistes Populaires</h1>
      <div className="flex space-x-4 overflow-x-scroll">
        {artists.map((artist, index) => (
          <ScrollList key={index} name={artist.name} imageId={artist.picture} />
        ))}
      </div>
    </div>
  );
};

export default Artists;
