import { useCallback, useMemo, useState } from 'react';
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import { useMovieSearch } from './hooks/useMovieSearch';
import type { Movie } from './types/movie';

function App() {
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { movies, isLoading, error, search } = useMovieSearch();

  const sortedMovies = useMemo(
    () => [...movies].sort((a, b) => b.vote_average - a.vote_average),
    [movies]
  );

  const handleQueryChange = useCallback((value: string) => setQuery(value), []);
  const handleAdultChange = useCallback((value: boolean) => setIncludeAdult(value), []);
  const handleLanguageChange = useCallback((value: string) => setLanguage(value), []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      search({ query, language, includeAdult });
    },
    [search, query, language, includeAdult]
  );

  const handleMovieClick = useCallback((movie: Movie) => setSelectedMovie(movie), []);
  const handleCloseModal = useCallback(() => setSelectedMovie(null), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900">🎬 영화 검색</h1>

        <SearchForm
          query={query}
          includeAdult={includeAdult}
          language={language}
          onQueryChange={handleQueryChange}
          onAdultChange={handleAdultChange}
          onLanguageChange={handleLanguageChange}
          onSubmit={handleSubmit}
        />

        {isLoading && (
          <p className="text-center text-gray-500 text-sm">검색 중...</p>
        )}
        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}
        {!isLoading && movies.length === 0 && query && (
          <p className="text-center text-gray-400 text-sm">검색 결과가 없습니다.</p>
        )}

        <MovieList movies={sortedMovies} onMovieClick={handleMovieClick} />

        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

export default App;
