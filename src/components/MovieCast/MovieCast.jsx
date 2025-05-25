import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieCast({options}) {
    const { id } = useParams();
    const [movieCast, setMovieCast] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const getResponseMovieCast = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, options);
                setMovieCast(getResponseMovieCast.data.cast);                
            } catch (error) { 
              console.log(error);
            }
        };
        getMovieDetails();
    }, [id, options])

    if (!movieCast || movieCast.length === 0) {
        return <p>No cast info</p>
    }
    return (
        <ul>
            {movieCast.map((actor) => {
                return (
                    <li key={actor.cast_id}>
                        <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}></img>
                        <p>{actor.name}</p>
                        <p>Character: {actor.character}</p>
                    </li>
                )
            })}
        </ul>
    )
}