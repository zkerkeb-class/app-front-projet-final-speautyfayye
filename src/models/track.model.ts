import { Album } from './album.model';
import { IArtist } from './artist.model';
import { Category } from './category.model';

export interface ITrack {
  id: number;
  title: string;
  duration: string;
  releaseDate: Date;
  trackNumber: number;
  album_id: number;
  categoryId: number;
  picture?: string;
  audio: string;
  lyrics?: string;
}

export interface ITrackExt extends ITrack {
  category?: Category | null;
  album?: Album | null;
  artist?: IArtist | null | string;
}

export class Track implements ITrack {
  id: number;
  title: string;
  duration: string;
  releaseDate: Date;
  trackNumber: number;
  album_id: number;
  categoryId: number;
  picture?: string;
  audio: string;
  lyrics?: string;

  constructor(data: ITrack) {
    this.id = data.id;
    this.title = data.title;
    this.duration = data.duration;
    this.releaseDate = new Date(data.releaseDate); // Convertit les chaînes de date en objets Date.
    this.trackNumber = data.trackNumber;
    this.album_id = data.album_id;
    this.categoryId = data.categoryId;
    this.picture = data.picture;
    this.audio = data.audio;
    this.lyrics = data.lyrics;
  }
}

export class TrackExt extends Track implements TrackExt {
  category?: Category | null;
  album?: Album | null;

  constructor(data: TrackExt) {
    super(data);
    this.category = data.category ?? null;
    this.album = data.album ?? null;
  }
}
