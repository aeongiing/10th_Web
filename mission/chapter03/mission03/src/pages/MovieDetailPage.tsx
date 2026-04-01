import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { MovieDetail, Credits } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        };
        const [movieRes, creditsRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            { headers }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            { headers }
          ),
        ]);
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch {
        setError('영화 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

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

  if (!movie) return null;

  const director = credits?.crew.find((c) => c.job === 'Director');
  const topCast = credits?.cast.slice(0, 10) ?? [];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* 배경 이미지 */}
      {movie.backdrop_path && (
        <div
          className="h-80 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="h-full w-full bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          ← 뒤로가기
        </button>

        <div className="flex gap-8">
          {/* 포스터 */}
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            className="-mt-32 h-72 w-48 shrink-0 rounded-xl object-cover shadow-2xl"
          />

          {/* 기본 정보 */}
          <div className="flex flex-col justify-end">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            {movie.tagline && (
              <p className="mt-1 text-gray-400 italic">"{movie.tagline}"</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-6 text-sm text-gray-400">
              <span>
                ⭐{' '}
                <span className="text-yellow-400 font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>{' '}
                / 10
              </span>
              <span>🗓 {movie.release_date}</span>
              {movie.runtime > 0 && <span>⏱ {movie.runtime}분</span>}
              {director && <span>🎬 {director.name}</span>}
            </div>
          </div>
        </div>

        {/* 줄거리 */}
        <div className="mt-8">
          <h2 className="mb-2 text-xl font-semibold">줄거리</h2>
          <p className="leading-relaxed text-gray-300">
            {movie.overview || '줄거리 정보가 없습니다.'}
          </p>
        </div>

        {/* 출연진 */}
        {topCast.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">출연진</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {topCast.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
