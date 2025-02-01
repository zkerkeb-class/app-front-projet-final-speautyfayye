'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTracks } from '@/services/track.service'; // Service pour les pistes
import { getAlbums } from '@/services/album.service'; // Service pour les albums
import { getArtists } from '@/services/artist.service'; // Service pour les artistes
import { getPlaylists } from '@/services/playlist.service'; // Service pour les playlists
import { Track, TrackExt } from '@/models/track.model'; // Modèles pour les pistes
import { Album, AlbumExt } from '@/models/album.model'; // Modèle pour les albums
import { Artist, ArtistExt } from '@/models/artist.model'; // Modèle pour les artistes
import { Playlist, PlaylistExt } from '@/models/playlist.model'; // Modèle pour les playlists
import { ITrackFilters } from '@/models/filter.model'; // Interface pour les filtres
import { Category, CategoryExt } from '@/models/category.model';
import { getCategories } from '@/services/category.service';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q'); // Récupérer la requête de recherche
  const [tracks, setTracks] = useState<(Track | TrackExt)[]>([]); // État pour les pistes
  const [albums, setAlbums] = useState<(Album | AlbumExt)[]>([]); // État pour les albums
  const [artists, setArtists] = useState<(Artist | ArtistExt)[]>([]); // État pour les artistes
  const [playlists, setPlaylists] = useState<(Playlist | PlaylistExt)[]>([]); // État pour les playlists
  const [categories, setCategories] = useState<(Category | CategoryExt)[]>([]); // État pour les catégories
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

  // Fonction pour charger les résultats de recherche
  const loadSearchResults = async () => {
    if (!query) return; // Ne rien faire si la requête est vide

    try {
      setIsLoading(true);
      setError(null);

      // Définir les filtres de recherche pour les pistes
      const filters: ITrackFilters = {
        artistId: searchParams.has('artistId') ? Number(searchParams.get('artistId')) : undefined,
        albumId: searchParams.has('albumId') ? Number(searchParams.get('albumId')) : undefined,
        category: searchParams.has('category') ? Number(searchParams.get('category')) : undefined,
        releaseDate: searchParams.has('releaseDate')
          ? new Date(searchParams.get('releaseDate') as string)
          : undefined,
        minDuration: searchParams.has('minDuration')
          ? Number(searchParams.get('minDuration'))
          : undefined,
        maxDuration: searchParams.has('maxDuration')
          ? Number(searchParams.get('maxDuration'))
          : undefined,
        playlistId: searchParams.has('playlistId')
          ? Number(searchParams.get('playlistId'))
          : undefined,
        maxNumberOfPlays: searchParams.has('maxNumberOfPlays')
          ? Number(searchParams.get('maxNumberOfPlays'))
          : undefined,
        minNumberOfPlays: searchParams.has('minNumberOfPlays')
          ? Number(searchParams.get('minNumberOfPlays'))
          : undefined,
      };

      // Appeler les services pour récupérer les résultats
      const [tracksData, albumsData, artistsData, playlistsData, categoriesData] =
        await Promise.all([
          getTracks(filters), // Récupérer les pistes
          getAlbums(query || ''), // Récupérer les albums
          getArtists(), // Récupérer les artistes
          getPlaylists(), // Récupérer les playlists
          getCategories(), // Récupérer les catégories
        ]);

      // Filtrer les résultats en fonction de la requête (si nécessaire)
      const filteredTracks = tracksData.filter((track) =>
        track.title.toLowerCase().includes(query.toLowerCase()),
      );
      const filteredAlbums = albumsData.filter((album) =>
        album.title.toLowerCase().includes(query.toLowerCase()),
      );
      const filteredArtists = artistsData.filter((artist) =>
        artist.name.toLowerCase().includes(query.toLowerCase()),
      );
      const filteredPlaylists = playlistsData.filter((playlist) =>
        playlist.title.toLowerCase().includes(query.toLowerCase()),
      );
      const filteredCategories = categoriesData.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase()),
      );

      // Convertir les résultats en instances de Track ou TrackExt
      const formattedTracks = filteredTracks.map((track) => {
        if ('artist' in track || 'album' in track || 'category' in track) {
          return new TrackExt(track as TrackExt);
        } else {
          return new Track(track);
        }
      });

      // Mettre à jour les états
      setTracks(formattedTracks);
      setAlbums(filteredAlbums);
      setArtists(filteredArtists);
      setPlaylists(filteredPlaylists);
      setCategories(filteredCategories);
    } catch (err) {
      setError('Failed to fetch search results');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // format duration
  const formatDuration = (seconds: string) => {
    const minutes = Math.floor(Number(seconds) / 60);
    const secs = Math.floor(Number(seconds) % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Charger les résultats au montage du composant ou lorsque la requête change
  useEffect(() => {
    loadSearchResults();
  }, [query, searchParams]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Résultats de recherche pour : {query}</h1>

      {isLoading && <p>Chargement en cours...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && (
        <>
          {/* Afficher les pistes */}
          {tracks.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Pistes</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tracks.map((track) => (
                  <div key={track.id} className="rounded-lg border p-4">
                    <h2 className="text-lg font-semibold">{track.title}</h2>
                    {/* {'artist' in track && (
                      <p className="text-sm text-gray-500">
                        Artiste :{' '}
                        {typeof track.artist === 'string'
                          ? track.artist
                          : track.artist?.name || 'Inconnu'}
                      </p>
                    )} */}
                    <p className="text-sm text-gray-500">
                      Durée : {formatDuration(track.duration)}
                    </p>
                    {'album' in track && track.album && (
                      <p className="text-sm text-gray-500">Album : {track.album.title}</p>
                    )}
                    {'category' in track && track.category && (
                      <p className="text-sm text-gray-500">Catégorie : {track.category.name}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Afficher les catégories */}
          {categories.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Catégories</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                  <div key={category.id} className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Afficher les albums */}
          {albums.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Albums</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {albums.map((album) => (
                  <div key={album.id} className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">{album.title}</h3>
                    <p className="text-sm text-gray-500">
                      Date de sortie : {new Date(album.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Afficher les artistes */}
          {artists.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Artistes</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {artists.map((artist) => (
                  <div key={artist.id} className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">{artist.name}</h3>
                    <p className="text-sm text-gray-500">{artist.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Afficher les playlists */}
          {playlists.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Playlists</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">{playlist.title}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Aucun résultat trouvé */}
          {tracks.length === 0 &&
            albums.length === 0 &&
            artists.length === 0 &&
            playlists.length === 0 && <p>Aucun résultat trouvé.</p>}
        </>
      )}
    </div>
  );
}
