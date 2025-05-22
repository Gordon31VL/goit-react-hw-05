import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function MovieReviews() {
    const { id, options } = useOutletContext();
    const [movieReviews, setMovieReviews] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const getResponseMovieReviews = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, options);
                setMovieReviews(getResponseMovieReviews.data.results);
                
            } catch (error) { 
              console.log(error);
            }
        };
        getMovieDetails();
    }, [id, options])
    
    if (!movieReviews || movieReviews.length === 0) {
        return <p>No reviews info</p>
    }

    return (
        <ul>
            {movieReviews.map((reviews) => {
                return (
                    <li key={reviews.id}>
                        <h3>{reviews.author}</h3>
                        <p>{reviews.content}</p>
                    </li>
                )
            })}
        </ul>
    )
    
}