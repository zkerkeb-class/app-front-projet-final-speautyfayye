export interface IArtist {
  id: number;
  name: string;
  category_id: number;
  bio: string;
  picture?: string;
}
export interface IArtistExt extends IArtist {
  category: string;
}

export class Artist implements IArtist {
  id: number;
  name: string;
  category_id: number;
  bio: string;
  picture?: string;

  constructor(data: IArtist) {
    this.id = data.id;
    this.name = data.name;
    this.category_id = data.category_id;
    this.bio = data.bio;
    this.picture = data.picture;
  }
}

export class ArtistExt extends Artist implements IArtistExt {
  category: string;

  constructor(data: IArtistExt) {
    super(data);
    this.category = data.category;
  }
}
