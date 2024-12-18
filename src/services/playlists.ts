import { Playlist, IPlaylist } from '@/models/playlist';

interface PlaylistAPIResponse {
  data: IPlaylist[]; // Structure des données attendues depuis l'API
}

export async function getPlaylists(): Promise<Playlist[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/playlists/1`);

  if (!response.ok) {
    throw new Error('Failed to fetch playlists');
  }

  // Typage explicite des données JSON attendues
  const playlistsData: PlaylistAPIResponse = await response.json();

  // Transformation des données en instances de la classe Playlist
  return playlistsData.data.map((item) => new Playlist(item));
}
