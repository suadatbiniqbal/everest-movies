import axios from 'axios';

// Replace with your TMDB API key
const TMDB_API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getImageUrl = (path: string, size: string = 'original') => {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : '/placeholder.jpg';
};

export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'week') => {
  const response = await api.get(`/trending/movie/${timeWindow}`);
  return response.data.results;
};

export const getTrendingSeries = async (timeWindow: 'day' | 'week' = 'week') => {
  const response = await api.get(`/trending/tv/${timeWindow}`);
  return response.data.results;
};

export const getPopularMovies = async (page: number = 1) => {
  const response = await api.get('/movie/popular', { params: { page } });
  return response.data.results;
};

export const getPopularSeries = async (page: number = 1) => {
  const response = await api.get('/tv/popular', { params: { page } });
  return response.data.results;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos,credits,similar,recommendations' }
  });
  return response.data;
};

export const getSeriesDetails = async (seriesId: number) => {
  const response = await api.get(`/tv/${seriesId}`, {
    params: { append_to_response: 'videos,credits,similar,recommendations' }
  });
  return response.data;
};

export const getActorDetails = async (actorId: number) => {
  const response = await api.get(`/person/${actorId}`, {
    params: { append_to_response: 'movie_credits,tv_credits' }
  });
  return response.data;
};

export const searchMulti = async (query: string, page: number = 1) => {
  const response = await api.get('/search/multi', {
    params: { query, page }
  });
  return response.data.results;
};

export const getGenres = async (type: 'movie' | 'tv') => {
  const response = await api.get(`/genre/${type}/list`);
  return response.data.genres;
};

export const getMoviesByGenre = async (genreId: number, page: number = 1) => {
  const response = await api.get('/discover/movie', {
    params: { with_genres: genreId, page }
  });
  return response.data.results;
};

export const getSeriesByGenre = async (genreId: number, page: number = 1) => {
  const response = await api.get('/discover/tv', {
    params: { with_genres: genreId, page }
  });
  return response.data.results;
};

export default api;
