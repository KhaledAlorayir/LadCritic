export interface RawgGame {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  genres: RawgGenres[];
  released?: string;
}

export interface RawgGenres {
  id: number;
  name: string;
  slug: string;
}
