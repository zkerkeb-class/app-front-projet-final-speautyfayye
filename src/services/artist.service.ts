import { IArtist, IArtistExt, Artist } from '@/models/artist.model';

interface ArtistAPIResponse {
  data: IArtist[];
}

interface ArtistExtAPIResponse {
  data: IArtistExt;
}

export async function getArtists(): Promise<Artist[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/artist`);

  if (!response.ok) {
    throw new Error('Failed to fetch artists');
  }

  const ArtistsData: ArtistAPIResponse = await response.json();
  return ArtistsData.data.map((item) => new Artist(item));
}

export async function getArtistById(id: number): Promise<IArtistExt> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/artist/${id}`);
  const artistData: ArtistExtAPIResponse = await response.json();
  return artistData.data;
}
