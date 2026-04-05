import axios from 'axios';
import type { MovieResponse, MovieDetail, Credits } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};

export const fetchMoviesByCategory = async (
  category: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/${category}?language=ko-KR&page=${page}`,
    { headers }
  );
  return data;
};

export const fetchMovieDetail = async (movieId: string): Promise<MovieDetail> => {
  const { data } = await axios.get<MovieDetail>(
    `${BASE_URL}/movie/${movieId}?language=ko-KR`,
    { headers }
  );
  return data;
};

export const fetchMovieCredits = async (movieId: string): Promise<Credits> => {
  const { data } = await axios.get<Credits>(
    `${BASE_URL}/movie/${movieId}/credits?language=ko-KR`,
    { headers }
  );
  return data;
};
