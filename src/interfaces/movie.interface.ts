export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieAPIResponse = {
  page: number;
  results: MovieResult[];
  total_pages?: number;
  total_results?: number;
};

export type MovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: Pick<MovieGenre, 'id'>[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export enum ImageSizeEnum {
  W92 = 'w92',
  W154 = 'w154',
  W185 = 'w185',
  W342 = 'w342',
  W500 = 'w500',
  W780 = 'w780',
  ORIGINAL = 'original',
}

export enum DiscoverApiSortByEnum {
  POPULARITY_ASC = 'popularity.asc',
  POPULARITY_DESC = 'popularity.desc',
  // RELEASE_DATE_ASC = 'release_date.asc',
  // RELEASE_DATE_DESC = 'release_date.desc',
  TITLE_ASC = 'title.asc',
  TITLE_DESC = 'title.desc',
  REVENUE_ASC = 'revenue.asc',
  REVENUE_DESC = 'revenue.desc',
  PRIMARY_RELEASE_DATE_ASC = 'primary_release_date.asc',
  PRIMARY_RELEASE_DATE_DESC = 'primary_release_date.desc',
  ORIGINAL_TITLE_ASC = 'original_title.asc',
  ORIGINAL_TITLE_DESC = 'original_title.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
  VOTE_COUNT_ASC = 'vote_count.asc',
  VOTE_COUNT_DESC = 'vote_count.desc',
}

export type UpcomingMoviesApiResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export type Company = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};
