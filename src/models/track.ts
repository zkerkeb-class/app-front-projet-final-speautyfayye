import { Album } from './album';
import { Category } from './category';

export interface ITrack {
  id: number;
  title: string;
  duration: string;
  releaseDate: Date;
  trackNumber: number;
  albumId: number;
  categoryId: number;
  picture?: string;
  audio: string;
}

export interface ITrackExt extends ITrack {
  category?: Category | null;
  album?: Album | null;
}

export class Track implements ITrack {
  id: number;
  title: string;
  duration: string;
  releaseDate: Date;
  trackNumber: number;
  albumId: number;
  categoryId: number;
  picture?: string;
  audio: string;

  constructor(data: ITrack) {
    this.id = data.id;
    this.title = data.title;
    this.duration = data.duration;
    this.releaseDate = new Date(data.releaseDate); // Convertit les chaînes de date en objets Date.
    this.trackNumber = data.trackNumber;
    this.albumId = data.albumId;
    this.categoryId = data.categoryId;
    this.picture = data.picture;
    this.audio = data.audio;
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
