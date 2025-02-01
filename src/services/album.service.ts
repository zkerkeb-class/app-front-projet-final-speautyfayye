import { IAlbum, Album, IAlbumExt } from '@/models/album.model';

interface AlbumAPIResponse {
  data: IAlbum[];
}

interface IAlbumExtAPIResponse {
  data: IAlbumExt;
}

export async function getAlbums(category_id?: string): Promise<Album[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/album${category_id ? `?category_id=${category_id}` : ''}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }

  const albumData: AlbumAPIResponse = await response.json();
  return albumData.data.map((item) => new Album(item));
}

// Get an album by its ID
export async function getAlbumById(id: number): Promise<IAlbumExt> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/album/${id}`);
  const albumData: IAlbumExtAPIResponse = await response.json();
  return albumData.data;
}
