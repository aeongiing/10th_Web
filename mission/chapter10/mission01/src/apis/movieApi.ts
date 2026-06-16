import axios from 'axios';
import type { MovieResponse, SearchParams } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};

export const searchMovies = async ({
  query,
  language,
  includeAdult,
}: SearchParams): Promise<MovieResponse> => {
  const { data } = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    headers: HEADERS,
    params: {
      query,
      language,
      include_adult: includeAdult,
      page: 1,
    },
  });
  return data;
};

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
