import { IArtist } from './artist.model';
import { Track } from './track';

export interface IAlbum {
  id: number; // Identifiant unique de l'album
  title: string; // Titre de l'album
  releaseDate: Date; // Date de sortie de l'album
  categoryId: number; // Identifiant de la catégorie associée
  picture?: string; // URL de l'image associée (facultatif)
}

export interface IAlbumExt extends IAlbum {
  tracks: Track[] | null; // Liste des pistes associées à l'album (ou null si aucune)
  artist: IArtist | null;
}

export class Album implements IAlbum {
  id: number;
  title: string;
  releaseDate: Date;
  categoryId: number;
  picture?: string;

  constructor(data: IAlbum) {
    this.id = data.id;
    this.title = data.title;
    this.releaseDate = data.releaseDate;
    this.categoryId = data.categoryId;
    this.picture = data.picture;
  }
}

export class AlbumExt extends Album implements IAlbumExt {
  tracks: Track[] | null;
  artist: IArtist | null;

  constructor(data: AlbumExt) {
    super(data);
    this.tracks = data.tracks;
    this.artist = data.artist;
  }
}
