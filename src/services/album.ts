import { IAlbum, Album } from '@/models/album';

interface AlbumAPIResponse {
  data: IAlbum;
}

export async function getAlbums(): Promise<Album[]> {
  // Create an array of IDs from 1 to 9
  const ids = Array.from({ length: 9 }, (_, index) => index + 1);

  // Fetch albums for each ID in parallel
  const fetchPromises = ids.map((id) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/album/${id}`).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch album with ID: ${id}`);
      }
      const albumData: AlbumAPIResponse = await response.json();
      return new Album(albumData.data); // Create an instance of Album
    }),
  );

  // Wait for all requests to complete
  const allAlbums = await Promise.all(fetchPromises);

  // Return the array of Album instances
  return allAlbums;
}

// Get an album by its ID
export async function getAlbumById(id: number): Promise<Album> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/album/${id}`);
  const albumData: AlbumAPIResponse = await response.json();
  return new Album(albumData.data); // Create an instance of Album
}
