import { useEffect, useState } from "react";
import * as React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

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
      <AuroraBackground showRadialGradient={true} className="bg-fixed inset-0 relative">
        <div className="absolute top-32">
          <input type="text" id="search" placeholder="" 
          className="relative z-20 bg-slate-500/20 rounded-2xl py-1.5 pr-3 pl-3 outline-none text-gray-300 backdrop-blur-none w-64 focus:w-80 focus:outline-none focus:bg-slate-400/25 transition-all duration-500"/>
        </div>
        <div className="absolute inset-x-20 inset-y-96">
          <div className="">
            <h1 className="text-4xl font-bold text-white text-left mb-2 ml-24">Popular Movies</h1>
          </div>
          <div className="bg-teal-950/0 backdrop-blur-none mx-24 z-10">
            <ul className="flex flex-row overflow-x-auto gap-8 scrollbar scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-800">
              {movies.map((movie) => (
                <li key={movie.id} className="flex-shrink-0 max-w-44 min-w-30 group">
                  <img id="movie_poster" className="rounded-lg hover:cursor-pointer" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <div className="text-white group-hover:text-teal-600 hover:cursor-pointer">{movie.title} ({movie.release_date.slice(0,4)})</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AuroraBackground>
      <div>
        <h1 className="text-9xl">Text</h1>
      </div>
    </div>
  );
}
