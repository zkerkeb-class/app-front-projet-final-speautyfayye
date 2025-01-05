import { IArtist, Artist } from '@/models/artist';

interface ArtistAPIResponse {
  data: IArtist[];
}

export async function getArtists(): Promise<Artist[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/artist`);

  if (!response.ok) {
    throw new Error('Failed to fetch artists');
  }

  const ArtistsData: ArtistAPIResponse = await response.json();
  return ArtistsData.data.map((item) => new Artist(item));
}
