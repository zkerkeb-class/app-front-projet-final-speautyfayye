'use client';

import { playerContext, trackContext } from '@/app/providers';
import TracksList from '@/components/tracksList';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Album, AlbumExt } from '@/models/album.model';
import { Artist, ArtistExt } from '@/models/artist.model';
import { Category, CategoryExt } from '@/models/category.model';
import { ITrackFilters } from '@/models/filter.model';
import { Playlist, PlaylistExt } from '@/models/playlist.model';
import { ITrackExt, Track, TrackExt } from '@/models/track.model';
import { getAlbums } from '@/services/album.service';
import { getArtists } from '@/services/artist.service';
import { getCategories } from '@/services/category.service';
import { getPlaylists } from '@/services/playlist.service';
import { getTracks } from '@/services/track.service';
import { Disc, ListMusic, Music, Tag, Users } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useScopedI18n } from '@/locales/client';
import { useContext, useEffect, useState } from 'react';

// type TabType = 'tracks' | 'albums' | 'artists' | 'playlists' | 'categories';
type sort = 'duration' | 'releaseDate' | 'alphabetic' | 'popularity' | undefined;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [tracks, setTracks] = useState<(Track | TrackExt)[]>([]);
  const [albums, setAlbums] = useState<(Album | AlbumExt)[]>([]);
  const [artists, setArtists] = useState<(Artist | ArtistExt)[]>([]);
  const [playlists, setPlaylists] = useState<(Playlist | PlaylistExt)[]>([]);
  const [categories, setCategories] = useState<(Category | CategoryExt)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const translation = useScopedI18n('searchPage');
  const [sort, setSort] = useState<sort>(undefined);

  const audio = useContext(trackContext);
  const player = useContext(playerContext);

  const handleTrackClick = (track: ITrackExt) => {
    if (audio.track && track.id === audio.track.id) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } else {
      audio.setTrack(track);
      player.play();
    }
  };

  const loadSearchResults = async () => {
    if (!query) return;

    try {
      setIsLoading(true);
      setError(null);

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

      const [tracksData, albumsData, artistsData, playlistsData, categoriesData] =
        await Promise.all([
          getTracks(filters),
          getAlbums(query || ''),
          getArtists(),
          getPlaylists(),
          getCategories(),
        ]);

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

      const formattedTracks = filteredTracks.map((track) => {
        if ('artist' in track || 'album' in track || 'category' in track) {
          return new TrackExt(track as TrackExt);
        } else {
          return new Track(track);
        }
      });

      setTracks(formattedTracks);
      setAlbums(filteredAlbums);
      setArtists(filteredArtists);
      setPlaylists(filteredPlaylists);
      setCategories(filteredCategories);
    } catch (err) {
      setError('Une erreur est survenue lors de la recherche');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // const formatDuration = (seconds: string) => {
  //   const minutes = Math.floor(Number(seconds) / 60);
  //   const secs = Math.floor(Number(seconds) % 60);
  //   return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  // };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    loadSearchResults();
  }, [query, searchParams]);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto my-8 max-w-lg">
        <CardHeader>
          <CardTitle className="text-red-500">Erreur</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Résultats pour &quot;{query}&quot;
        <Badge variant="secondary" className="ml-4">
          {tracks.length + albums.length + artists.length + playlists.length + categories.length}{' '}
          résultats
        </Badge>
      </h1>

      <Tabs className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tracks" className="space-x-2">
            <Music className="h-4 w-4" />
            <span>
              {translation('tracks')} ({tracks.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="albums" className="space-x-2">
            <Disc className="h-4 w-4" />
            <span>
              {translation('albums')} ({albums.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="artists" className="space-x-2">
            <Users className="h-4 w-4" />
            <span>
              {translation('artists')} ({artists.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="playlists" className="space-x-2">
            <ListMusic className="h-4 w-4" />
            <span>
              {translation('playlists')} ({playlists.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="space-x-2">
            <Tag className="h-4 w-4" />
            <span>
              {translation('categories')} ({categories.length})
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="mt-6">
          <div className="my-4 flex items-center justify-end">
            <p className="text-sm text-muted-foreground">
              Trier par :
              <button
                onClick={() => setSort('duration')}
                className={`ml-2 rounded-md px-2 py-1 ${
                  sort === 'duration' ? 'bg-primary' : 'bg-accent text-white'
                }`}
              >
                {translation('durationText')}
              </button>
              <button
                onClick={() => setSort('releaseDate')}
                className={`ml-2 rounded-md px-2 py-1 ${
                  sort === 'releaseDate' ? 'bg-primary' : 'bg-accent text-white'
                }`}
              >
                {translation('releaseDateText')}
              </button>
              <button
                onClick={() => setSort('alphabetic')}
                className={`ml-2 rounded-md px-2 py-1 ${
                  sort === 'alphabetic' ? 'bg-primary' : 'bg-accent text-white'
                }`}
              >
                {translation('alphabeticText')}
              </button>
              <button
                onClick={() => setSort('popularity')}
                className={`ml-2 rounded-md px-2 py-1 ${
                  sort === 'popularity' ? 'bg-primary' : 'bg-accent text-white'
                }`}
              >
                {translation('popularityText')}
              </button>
            </p>
          </div>
          <TracksList
            tracks={tracks.sort((a, b) => {
              switch (sort) {
                case 'duration':
                  return Number(a.duration) - Number(b.duration);
                case 'releaseDate':
                  return a.releaseDate > b.releaseDate ? -1 : 1;
                case 'alphabetic':
                  return a.title > b.title ? 1 : -1;
                case 'popularity':
                  return a.number_of_plays > b.number_of_plays ? -1 : 1;
                case undefined:
                default:
                  return 1;
              }
            })}
            onClick={handleTrackClick}
          />
        </TabsContent>

        <TabsContent value="albums" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <Link href={`/album/${album.id}`} key={album.id}>
                <Card className="transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{album.title}</CardTitle>
                    <CardDescription>
                      {translation('releaseDate', {
                        releaseDate: formatDate(new Date(album.releaseDate)),
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <Link href={`/artist/${artist.id}`} key={artist.id}>
                <Card className="transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{artist.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{artist.bio}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                <Card className="transition-colors hover:bg-accent/50">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{playlist.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className="transition-colors hover:bg-accent/50">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{category.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {tracks.length === 0 &&
        albums.length === 0 &&
        artists.length === 0 &&
        playlists.length === 0 &&
        categories.length === 0 && (
          <Card className="mx-auto mt-8 max-w-lg">
            <CardHeader className="text-center">
              <CardTitle>Aucun résultat</CardTitle>
              <CardDescription>
                Aucun résultat trouvé pour votre recherche &quot;{query}&quot;
              </CardDescription>
            </CardHeader>
          </Card>
        )}
    </div>
  );
}
