import { useEffect, useState } from "react";
import * as React from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  base_url: string;
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading movies...</div>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul className="flex flex-row, overflow-x-auto gap-8">
        {movies.map((movie) => (
          <li className="flex-shrink-0 w-1/6 max-w-50 min-w-30">
            <img id="movie_poster" className="rounded-lg hover:scale-105" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="">{movie.title} ({movie.release_date})</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
