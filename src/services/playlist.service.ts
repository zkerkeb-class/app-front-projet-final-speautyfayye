import { IPlaylistExt, PlaylistExt } from '@/models/playlist.model';

interface PlaylistAPIResponse {
  data: IPlaylistExt[]; // Structure des données attendues depuis l'API
}

interface IPlaylistExtAPIResponse {
  data: IPlaylistExt;
}

export async function getPlaylists(): Promise<PlaylistExt[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/playlist`);

  if (!response.ok) {
    throw new Error('Failed to fetch playlists');
  }

  // Typage explicite des données JSON attendues
  const playlistsData: PlaylistAPIResponse = await response.json();

  // Transformation des données en instances de la classe Playlist
  return playlistsData.data.map((item) => new PlaylistExt(item));
}

// get playlist by id
export async function getPlaylistById(id: number): Promise<IPlaylistExt> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/playlist/${id}`);
  const playlistData: IPlaylistExtAPIResponse = await response.json(); // Modifié ici
  return playlistData.data;
}
