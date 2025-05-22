import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";

export default function HomePage({tmbdAccessKey, options}) {
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

  const getTrendingMovies = (async () => {
    try {   
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options);
      const data = response.data.results;
      return data
    } catch (error) {
      console.log(error);
    }
  }, [tmbdAccessKey]);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      getTrendingMovies().then(setMovies);
    }
  }, [getTrendingMovies]);

  useEffect(() => {
    localStorage.setItem('moviesList', JSON.stringify(movies))
  }, [movies])

  return (
    <ul>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <MovieList title={movie.title} id={movie.id}></MovieList>
          </li>
        )
      })}
    </ul>
  )
  }