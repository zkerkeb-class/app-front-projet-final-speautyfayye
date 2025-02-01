'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTracks } from '@/services/track.service';
import { getAlbums } from '@/services/album.service';
import { getArtists } from '@/services/artist.service';
import { getPlaylists } from '@/services/playlist.service';
import { getCategories } from '@/services/category.service';
import { Track, TrackExt } from '@/models/track.model';
import { Album, AlbumExt } from '@/models/album.model';
import { Artist, ArtistExt } from '@/models/artist.model';
import { Playlist, PlaylistExt } from '@/models/playlist.model';
import { Category, CategoryExt } from '@/models/category.model';
import { ITrackFilters } from '@/models/filter.model';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Music, Disc, Users, ListMusic, Tag } from 'lucide-react';

type TabType = 'tracks' | 'albums' | 'artists' | 'playlists' | 'categories';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [tracks, setTracks] = useState<(Track | TrackExt)[]>([]);
  const [albums, setAlbums] = useState<(Album | AlbumExt)[]>([]);
  const [artists, setArtists] = useState<(Artist | ArtistExt)[]>([]);
  const [playlists, setPlaylists] = useState<(Playlist | PlaylistExt)[]>([]);
  const [categories, setCategories] = useState<(Category | CategoryExt)[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('tracks');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      // Set active tab based on which category has the most results
      const resultCounts = {
        tracks: formattedTracks.length,
        albums: filteredAlbums.length,
        artists: filteredArtists.length,
        playlists: filteredPlaylists.length,
        categories: filteredCategories.length,
      };

      const maxCategory = Object.entries(resultCounts).reduce((a, b) =>
        b[1] > a[1] ? b : a,
      )[0] as TabType;

      setActiveTab(maxCategory);
    } catch (err) {
      setError('Une erreur est survenue lors de la recherche');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: string) => {
    const minutes = Math.floor(Number(seconds) / 60);
    const secs = Math.floor(Number(seconds) % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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

      <Tabs value={activeTab} defaultValue={activeTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tracks" className="space-x-2">
            <Music className="h-4 w-4" />
            <span>Pistes ({tracks.length})</span>
          </TabsTrigger>
          <TabsTrigger value="albums" className="space-x-2">
            <Disc className="h-4 w-4" />
            <span>Albums ({albums.length})</span>
          </TabsTrigger>
          <TabsTrigger value="artists" className="space-x-2">
            <Users className="h-4 w-4" />
            <span>Artistes ({artists.length})</span>
          </TabsTrigger>
          <TabsTrigger value="playlists" className="space-x-2">
            <ListMusic className="h-4 w-4" />
            <span>Playlists ({playlists.length})</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="space-x-2">
            <Tag className="h-4 w-4" />
            <span>Catégories ({categories.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <Card key={track.id} className="transition-colors hover:bg-accent/50">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{track.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Durée : {formatDuration(track.duration)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {'album' in track && track.album && (
                        <Badge variant="outline">{track.album.title}</Badge>
                      )}
                      {'category' in track && track.category && (
                        <Badge variant="secondary">{track.category.name}</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <Card key={album.id} className="transition-colors hover:bg-accent/50">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{album.title}</CardTitle>
                  <CardDescription>
                    Sortie le{' '}
                    {new Date(album.releaseDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <Card key={artist.id} className="transition-colors hover:bg-accent/50">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{artist.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{artist.bio}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="transition-colors hover:bg-accent/50">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{playlist.title}</CardTitle>
                </CardHeader>
              </Card>
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
