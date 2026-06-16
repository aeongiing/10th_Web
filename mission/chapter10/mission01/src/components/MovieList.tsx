import { memo } from 'react';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieList = memo(function MovieList({ movies, onMovieClick }: Props) {
  console.log('MovieList 렌더링');

  if (movies.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
});

export default MovieList;
