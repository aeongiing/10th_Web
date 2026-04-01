import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies); // 영화 데이터 체크

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzJkZjU3MzA1MTM3N2VlNDgyYWI5MGQ5NGViODgxNCIsIm5iZiI6MTc1OTM5ODI2Ni4wMzQsInN1YiI6IjY4ZGU0OTdhNzBlMzI5YmUxNDk5MWEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G495ovi2eRP8iefZa3k_6XuFAFkQbAgkDe1VfrxQ0Vw`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul>
      {/* 옵셔널 체인 활용 (초기값 없을 때 대비)*/}
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
