import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";

export default function HomePage({ options }) {
  const [movies, setMovies] = useState(() => {
    const parseData = localStorage.getItem("moviesList");
    if (!parseData || parseData === "undefined") return [];
    try {
      const data = JSON.parse(parseData);
      return data;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!movies || movies.length === 0) {
      const getTrendingMovies = async () => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options);
          setMovies(response.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      getTrendingMovies();
    }
  }, [options]);

  useEffect(() => {
    localStorage.setItem('moviesList', JSON.stringify(movies))
  }, [movies])

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <MovieList title={movie.title} id={movie.id}></MovieList>
            </li>
          )
        })}
        </ul>
    </>
  )}