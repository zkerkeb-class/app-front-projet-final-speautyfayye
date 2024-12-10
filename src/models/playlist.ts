import { Track } from './track';

export interface IPlaylist {
  id: number; // L'identifiant unique de la playlist
  title: string; // Le titre de la playlist
  user_id: number; // L'identifiant de l'utilisateur qui a créé la playlist
}

export interface IPlaylistExt extends IPlaylist {
  tracks: Track[]; // La liste des pistes associées à la playlist
}

export class Playlist implements IPlaylist {
  id: number;
  title: string;
  user_id: number;

  constructor(data: IPlaylist) {
    this.id = data.id;
    this.title = data.title;
    this.user_id = data.user_id;
  }
}

export class PlaylistExt extends Playlist implements IPlaylistExt {
  tracks: Track[];

  constructor(data: IPlaylistExt) {
    super(data);
    this.tracks = data.tracks ?? [];
  }
}
