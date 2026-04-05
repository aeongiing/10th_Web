import { useEffect, useState } from 'react';
import type { MovieDetail, Credits } from '../types/movie';
import { fetchMovieDetail, fetchMovieCredits } from '../apis/movieApi';

const useMovieDetail = (movieId: string | undefined) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const loadData = async () => {
      setError(null);
      try {
        const [movieData, creditsData] = await Promise.all([
          fetchMovieDetail(movieId),
          fetchMovieCredits(movieId),
        ]);
        setMovie(movieData);
        setCredits(creditsData);
      } catch {
        setError('영화 정보를 불러오는 데 실패했습니다.');
      }
    };

    loadData();
  }, [movieId]);

  return { movie, credits, error };
};

export default useMovieDetail;
