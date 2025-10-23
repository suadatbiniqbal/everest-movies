export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
}

export interface Series {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  biography?: string;
  birthday?: string;
  place_of_birth?: string;
  known_for_department?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

export interface AdminSettings {
  maintenanceMode: boolean;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface Analytics {
  totalViews: number;
  uniqueUsers: number;
  popularMovies: Array<{ id: number; title: string; views: number }>;
  dailyViews: Array<{ date: string; count: number }>;
}
