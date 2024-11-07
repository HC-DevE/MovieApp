const API_KEY = process.env.TMDB_API_KEY;
const token = process.env.TMDB_API_ACCES_READ_TOKEN;

export const fetchTopRatedMovies = async () => {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const options = {
    method: 'GET',
    url: `${BASE_URL}/movie/top_rated`,
    params: {api_key: API_KEY},
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(options.url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};
