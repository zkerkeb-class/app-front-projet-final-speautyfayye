import { Album } from './album';
import { Playlist } from './playlist';
import { Track } from './track';

export interface ICategory {
  id: number; // Identifiant unique de la catégorie
  name: string; // Nom de la catégorie
}

export interface ICategoryExt extends ICategory {
  albums?: Album[]; // Liste des albums associés (facultatif)
  playlists?: Playlist[]; // Liste des playlists associées (facultatif)
  tracks?: Track[]; // Liste des pistes associées (facultatif)
}

export class Category implements ICategory {
  id: number;
  name: string;

  constructor(data: ICategory) {
    this.id = data.id;
    this.name = data.name;
  }
}

export class CategoryExt extends Category implements CategoryExt {
  albums?: Album[];
  playlists?: Playlist[];
  tracks?: Track[];

  constructor(data: CategoryExt) {
    super(data);
    this.albums = data.albums ?? [];
    this.playlists = data.playlists ?? [];
    this.tracks = data.tracks ?? [];
  }
}
