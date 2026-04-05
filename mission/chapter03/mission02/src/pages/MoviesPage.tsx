import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { fetchMoviesByCategory } from '../apis/movieApi';
import MovieCard from '../components/MovieCard';

type Props = {
  category: 'popular' | 'upcoming' | 'top_rated' | 'now_playing';
};

const MoviesPage = ({ category }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMoviesByCategory(category, page);
        setMovies(data.results);
      } catch {
        setError('영화 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [category, page]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="rounded-lg bg-gray-700 px-4 py-2 text-white disabled:opacity-30 hover:bg-gray-600 transition-colors"
        >
          이전
        </button>
        <span className="text-gray-300">{page} 페이지</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
