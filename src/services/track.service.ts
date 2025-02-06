import { ITrackFilters } from '@/models/filter.model';
import { ITrack, ITrackExt, Track } from '@/models/track.model'; // Assurez-vous d'importer les interfaces et classes nécessaires
interface TrackAPIResponse {
  data: ITrack[]; // Structure des données attendues depuis l'API
}

interface ITrackExtAPIResponse {
  data: ITrackExt;
}

export async function getTracks(filters: ITrackFilters = {}): Promise<Track[]> {
  // Construire l'URL avec les paramètres de requête
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API}/track`);

  // Ajouter les filtres à l'URL
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch tracks');
  }

  // Typage explicite des données JSON attendues
  const tracksData: TrackAPIResponse = await response.json();

  // Transformation des données en instances de la classe Track
  return tracksData.data.map((item) => new Track(item));
}

// Récupérer une piste par son ID
export async function getTrackById(id: number): Promise<ITrackExt> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/track/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch track');
  }

  const trackData: ITrackExtAPIResponse = await response.json();
  return trackData.data;
}

export async function getMostPlayedTracks(): Promise<Track[]> {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_API}/track/most-played`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/track/most-played`);

  if (!response.ok) {
    throw new Error('Failed to fetch most played tracks');
  }

  const tracksData: TrackAPIResponse = await response.json();

  return tracksData.data.map((item) => new Track(item));
}
