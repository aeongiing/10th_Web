import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

type Props = {
  category: 'popular' | 'upcoming' | 'top_rated' | 'now_playing';
};

const MoviesPage = ({ category }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const prevCategoryRef = useRef(category);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchPage = page;
    if (prevCategoryRef.current !== category) {
      prevCategoryRef.current = category;
      fetchPage = 1;
      setPage(1);
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${fetchPage}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovies(data.results);
      } catch {
        setError('영화 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
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
          <div
            key={movie.id}
            onClick={() => navigate(`/movies/${movie.id}`)}
            className="group relative cursor-pointer overflow-hidden rounded-xl"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h2 className="text-center text-sm font-bold text-white">
                {movie.title}
              </h2>
              <p className="mt-2 line-clamp-4 text-center text-xs text-gray-200">
                {movie.overview}
              </p>
            </div>
          </div>
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
