import axios from 'axios';
import {
  Company,
  DiscoverApiSortByEnum,
  ImageSizeEnum,
  MovieCredits,
  MovieDetails,
  MovieGenre,
  MovieResult,
  UpcomingMoviesApiResponse,
} from '../src/interfaces/movie.interface';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const API_KEY = process.env.TMDB_API_KEY;
const token = process.env.TMDB_API_ACCES_READ_TOKEN;
const ACCOUNT_ID = process.env.TMDB_ACCOUNT_ID;
const MARVEL_COMPANY_IDS = [420];

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  // params: {
  //   api_key: API_KEY,
  // },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const buildImageUrl = (
  path: string,
  size: ImageSizeEnum = ImageSizeEnum.W780,
) => {
  if (!path) {
    return '';
  }
  return `${IMAGE_BASE_URL}${size}${path}`;
};

export const getPopularMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getTopRatedMovies = async (): Promise<MovieResult[]> => {
  try {
    const response = await tmdbApi.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<MovieResult[]> => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw error;
  }
};

export const getSimilarMovies = async (
  movieId: number,
): Promise<MovieResult[]> => {
  try {
    const response = await tmdbApi.get(
      `/movie/${movieId}/similar?language=en-US&page=1`,
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

export const getDiscoverMovies = async ({
  isMarvel,
  genreIds,
  sortBy,
  companyIds,
}: {
  isMarvel?: boolean;
  genreIds?: number[];
  sortBy?: DiscoverApiSortByEnum;
  companyIds?: number[];
} = {}): Promise<MovieResult[]> => {
  const companiesIds = isMarvel
    ? [...MARVEL_COMPANY_IDS, ...(companyIds || [])]
    : companyIds;
  const params = {
    sort_by: sortBy,
    with_genres: genreIds?.join('|'),
    with_companies: companiesIds?.join('|'),
  };
  try {
    const response = await tmdbApi.get('/discover/movie', {params});
    return response.data.results;
  } catch (error) {
    console.error('Error fetching discover movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async (
  time_window: 'day' | 'week' = 'day',
): Promise<MovieResult[]> => {
  try {
    const response = await tmdbApi.get('/trending/movie/' + time_window);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getMovieGenres = async (): Promise<MovieGenre[]> => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movie list genres:', error);
    throw error;
  }
};

export const getNowPlayingMovies = async (): Promise<MovieResult[]> => {
  try {
    const response = await tmdbApi.get('/movie/now_playing');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
};

export const searchCompany = async (query: string): Promise<Company[]> => {
  try {
    const response = await tmdbApi.get('/search/company', {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for company:', error);
    throw error;
  }
};

export const getUpcomingMovies =
  async (): Promise<UpcomingMoviesApiResponse> => {
    try {
      const response = await tmdbApi.get('/movie/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  };

export const getMovieCredits = async (
  movieId: number,
): Promise<MovieCredits> => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const getFavoriteMovies = async (): Promise<MovieResult[]> => {
  try {
    const response = await tmdbApi.get(
      `/account/${ACCOUNT_ID}/favorite/movies`,
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    throw error;
  }
};

export const getWatchlistMovies = async (): Promise<MovieResult[]> => {
  try {
    const response = await tmdbApi.get(
      `/account/${ACCOUNT_ID}/watchlist/movies`,
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching watchlist movies:', error);
    throw error;
  }
};

export const addToFavorite = async (movieId: number) => {
  try {
    const response = await tmdbApi.post(`/account/${ACCOUNT_ID}/favorite`, {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    });
    console.log('response', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error adding to favorite:', error);
    throw error;
  }
};

export const addToWatchlist = async (movieId: number) => {
  try {
    const response = await tmdbApi.post(`/account/${ACCOUNT_ID}/watchlist`, {
      media_type: 'movie',
      media_id: movieId,
      watchlist: true,
    });
    console.log('response', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    throw error;
  }
};
