import { IAlbum, Album } from '@/models/album';

interface AlbumAPIResponse {
  data: IAlbum[];
}

export async function getAlbums(): Promise<Album[]> {
  // Tableau pour stocker les ID de 1 à 9
  const ids = Array.from({ length: 9 }, (_, index) => index + 1);

  // Fetch les albums pour chaque ID en parallèle
  const fetchPromises = ids.map((id) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/album/${id}`).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch album with ID: ${id}`);
      }
      const albumData: AlbumAPIResponse = await response.json();
      return albumData.data;
    }),
  );

  // Attendre que toutes les requêtes soient terminées
  const allAlbums = await Promise.all(fetchPromises);

  // Combiner tous les albums en un seul tableau
  return allAlbums.flat();
}
