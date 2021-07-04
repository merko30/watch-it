export type MovieStatus = 'wishlist' | 'watching' | 'watched' | 'watch-again';

export interface Movie {
  _id: string;
  id: string;
  title: string;
  poster_path: string;
  user: string;
  status: MovieStatus;
}

export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
}
