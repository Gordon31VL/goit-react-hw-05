import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage({ options }) {
    const [searchParams, setSearchMParams] = useSearchParams([]);
    const query = searchParams.get("query") || "";
    const [searchMovies, setSearchMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if (!query) return;
        const getSearchingMovies = (async () => {
            try {
                setLoading(true);
                setError(false)
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
                setSearchMovies(response.data.results);
            } catch (error) {
                console.log(error);
                setError(true)
            } finally {
                setLoading(false);
            }
        });
        getSearchingMovies();
    }, [query]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const value = form.elements.query.value;
        setSearchMParams(value ? { query: value } : {});
    }

    return (
        <div>
            <div>
                <form onSubmit={handlerSubmit}>
                    <input type="text" name="query" defaultValue={query} placeholder="Search movie"></input>
                <button type="submit">submit</button>
                </form>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>an error occurred</p>}
            <MovieList movies={searchMovies}/>
        </div>
    )
}