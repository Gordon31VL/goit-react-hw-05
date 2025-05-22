import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage({options}) {
    const [searchMovies, setSearchMovies] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!query) return;
        const getSearchingMovies = (async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
                setSearchMovies(response.data.results);
            } catch (error) {
                console.log(error);
            }
        });
        getSearchingMovies();
    }, [query]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements.query.value;
        setQuery(query);
    }

    return (
        <div>
            <div>
                <form onSubmit={handlerSubmit}>
                <input type="text" name="query"></input>
                <button type="submit">submit</button>
                </form>
            </div>
            <ul>
                  {searchMovies.map((movie) => {
                    return (
                      <li key={movie.id}>
                        <MovieList title={movie.title} id={movie.id}></MovieList>
                      </li>
                    )
                  })}
                </ul>
        </div>
    )
}