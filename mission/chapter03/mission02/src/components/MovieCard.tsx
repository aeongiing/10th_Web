import type { Movie } from '../types/movie';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title || '영화'} 영화 포스터`}
        loading="lazy"
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
  );
};

export default MovieCard;
