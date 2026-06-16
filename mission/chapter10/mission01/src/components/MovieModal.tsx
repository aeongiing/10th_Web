import { memo } from 'react';
import type { Movie } from '../types/movie';
import { TMDB_IMAGE_BASE } from '../apis/movieApi';

interface Props {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = memo(function MovieModal({ movie, onClose }: Props) {
  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {movie.poster_path ? (
          <img
            src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-t-2xl object-cover max-h-72"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-t-2xl flex items-center justify-center text-gray-400">
            이미지 없음
          </div>
        )}

        <div className="p-5 flex flex-col gap-3">
          <h2 className="text-xl font-bold text-gray-900">{movie.title}</h2>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>📅 {movie.release_date || '-'}</span>
            {movie.adult && <span className="text-red-500 font-medium">19+</span>}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {movie.overview || '줄거리 정보가 없습니다.'}
          </p>

          <div className="flex gap-2 mt-2">
            <a
              href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm py-2 rounded-lg"
            >
              IMDb에서 검색하기
            </a>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 rounded-lg cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MovieModal;
