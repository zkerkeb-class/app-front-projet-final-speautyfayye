// Options de filtrage et de tri
export interface ITrackFilters {
  artistId?: number;
  albumId?: number;
  category?: number;
  releaseDate?: Date;
  minDuration?: number;
  maxDuration?: number;
  playlistId?: number;
  maxNumberOfPlays?: number;
  minNumberOfPlays?: number;
  sortBy?: string; // Ex: 'duration', 'numberOfPlays', 'releaseDate'
  sortOrder?: 'asc' | 'desc'; // Ordre de tri
}
