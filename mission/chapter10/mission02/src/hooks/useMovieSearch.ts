import { useCallback, useState } from 'react';
import { searchMovies } from '../apis/movieApi';
import type { Movie, SearchParams } from '../types/movie';

export function useMovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    if (!params.query.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMovies(params);
      setMovies(data.results);
    } catch {
      setError('검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { movies, isLoading, error, search };
}
