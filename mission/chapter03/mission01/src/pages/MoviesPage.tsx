import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {movies?.map((movie) => (
        <div
          key={movie.id}
          className="group relative overflow-hidden rounded-xl"
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
  );
};

export default MoviesPage;
