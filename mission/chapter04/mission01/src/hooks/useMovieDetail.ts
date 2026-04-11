import { useCallback } from 'react';
import type { MovieDetail, Credits } from '../types/movie';
import { fetchMovieDetail, fetchMovieCredits } from '../apis/movieApi';
import useCustomFetch from './useCustomFetch';

type MovieDetailData = { movie: MovieDetail; credits: Credits } | null;

const useMovieDetail = (movieId: string | undefined) => {
  const fetchFn = useCallback(async () => {
    if (!movieId) return null;
    const [movie, credits] = await Promise.all([
      fetchMovieDetail(movieId),
      fetchMovieCredits(movieId),
    ]);
    return { movie, credits };
  }, [movieId]);

  const { data, isLoading, error } = useCustomFetch<MovieDetailData>(fetchFn);

  return {
    movie: data?.movie ?? null,
    credits: data?.credits ?? null,
    isLoading,
    error,
  };
};

export default useMovieDetail;
