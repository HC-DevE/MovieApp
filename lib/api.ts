import axios from 'axios';
import {ImageSizeEnum} from '../src/interfaces/movie.interface';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const API_KEY = process.env.TMDB_API_KEY;
const token = process.env.TMDB_API_ACCES_READ_TOKEN;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const buildImageUrl = (
  path: string | undefined,
  size: ImageSizeEnum = ImageSizeEnum.W500,
): string | null => {
  if (!path) {
    return null;
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

export const getTopRatedMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

// export const searchMovies = async (query: string) => {
//   try {
//     const response = await tmdbApi.get('/search/movie', {
//       params: {
//         api_key: API_KEY,
//         query,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     console.error('Error searching for movies:', error);
//     throw error;
//   }
// };

export const searchMovies = async (query: string) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {api_key: API_KEY, query},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error('Error searching for movies:', error);
    throw error;
  }
};
