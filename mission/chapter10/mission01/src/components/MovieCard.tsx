import { memo } from 'react';
import type { Movie } from '../types/movie';
import { TMDB_IMAGE_BASE } from '../apis/movieApi';

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard = memo(function MovieCard({ movie, onClick }: Props) {
  console.log('MovieCard 렌더링:', movie.title);

  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all bg-white"
    >
      {movie.poster_path ? (
        <img
          src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          이미지 없음
        </div>
      )}
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 line-clamp-2">{movie.title}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">{movie.release_date?.slice(0, 4) ?? '-'}</span>
          <span className="text-xs text-yellow-500 font-medium">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
