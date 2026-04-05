import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { Movie } from '../types/movie';
import useMovieDetail from '../hooks/useMovieDetail';
import { TMDB_IMAGE_BASE } from '../constants/tmdb';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const preview = (location.state as { movie?: Movie } | null)?.movie ?? null;

  const { movie, credits, error } = useMovieDetail(movieId);

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const displayTitle = movie?.title ?? preview?.title;
  const displayPoster = movie?.poster_path ?? preview?.poster_path;
  const displayOverview = movie?.overview ?? preview?.overview;
  const displayVote = movie?.vote_average ?? preview?.vote_average;
  const displayDate = movie?.release_date ?? preview?.release_date;

  if (!displayTitle) {
    return (
      <div className="min-h-screen bg-gray-950 text-white animate-pulse">
        <div className="h-80 w-full bg-gray-800" />
        <div className="mx-auto max-w-5xl px-6 pb-12">
          <div className="mb-6 mt-4 h-5 w-20 rounded bg-gray-700" />
          <div className="flex gap-8">
            <div className="-mt-32 h-72 w-48 shrink-0 rounded-xl bg-gray-700 shadow-2xl" />
            <div className="flex flex-col justify-end gap-3 flex-1">
              <div className="h-8 w-2/3 rounded bg-gray-700" />
              <div className="h-4 w-1/2 rounded bg-gray-800" />
              <div className="flex gap-2">
                <div className="h-7 w-16 rounded-full bg-gray-700" />
                <div className="h-7 w-16 rounded-full bg-gray-700" />
              </div>
              <div className="flex gap-6">
                <div className="h-4 w-20 rounded bg-gray-700" />
                <div className="h-4 w-24 rounded bg-gray-700" />
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-6 w-20 rounded bg-gray-700" />
            <div className="h-4 w-full rounded bg-gray-800" />
            <div className="h-4 w-full rounded bg-gray-800" />
            <div className="h-4 w-3/4 rounded bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  const director = credits?.crew.find((c) => c.job === 'Director');
  const topCast = credits?.cast.slice(0, 10) ?? [];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {movie?.backdrop_path ? (
        <div
          className="h-80 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${TMDB_IMAGE_BASE}/original${movie.backdrop_path})`,
          }}
        >
          <div className="h-full w-full bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>
      ) : (
        <div className="h-80 w-full bg-gray-800 animate-pulse" />
      )}

      <div className="mx-auto max-w-5xl px-6 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          ← 뒤로가기
        </button>

        <div className="flex gap-8">
          <img
            src={`${TMDB_IMAGE_BASE}/w342${displayPoster}`}
            alt={`${displayTitle || '영화'} 영화 포스터`}
            className="-mt-32 h-72 w-48 shrink-0 rounded-xl object-cover shadow-2xl"
          />

          <div className="flex flex-col justify-end">
            <h1 className="text-3xl font-bold">{displayTitle}</h1>
            {movie?.tagline && (
              <p className="mt-1 text-gray-400 italic">"{movie.tagline}"</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {movie ? (
                movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                  >
                    {genre.name}
                  </span>
                ))
              ) : (
                <>
                  <div className="h-7 w-16 rounded-full bg-gray-700 animate-pulse" />
                  <div className="h-7 w-16 rounded-full bg-gray-700 animate-pulse" />
                </>
              )}
            </div>

            <div className="mt-4 flex gap-6 text-sm text-gray-400">
              {displayVote !== undefined && (
                <span>
                  ⭐{' '}
                  <span className="text-yellow-400 font-semibold">
                    {displayVote.toFixed(1)}
                  </span>{' '}
                  / 10
                </span>
              )}
              {displayDate && <span>🗓 {displayDate}</span>}
              {movie?.runtime != null && movie.runtime > 0 && (
                <span>⏱ {movie.runtime}분</span>
              )}
              {director && <span>🎬 {director.name}</span>}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-2 text-xl font-semibold">줄거리</h2>
          <p className="leading-relaxed text-gray-300">
            {displayOverview || '줄거리 정보가 없습니다.'}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">출연진</h2>
          {topCast.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {topCast.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center">
                  {actor.profile_path ? (
                    <img
                      src={`${TMDB_IMAGE_BASE}/w185${actor.profile_path}`}
                      alt={`${actor.name} 프로필`}
                      className="h-28 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-28 w-20 items-center justify-center rounded-lg bg-gray-800 text-3xl">
                      👤
                    </div>
                  )}
                  <p className="mt-2 text-sm font-medium">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 animate-pulse">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-28 w-20 rounded-lg bg-gray-700" />
                  <div className="h-4 w-16 rounded bg-gray-700" />
                  <div className="h-3 w-12 rounded bg-gray-800" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
