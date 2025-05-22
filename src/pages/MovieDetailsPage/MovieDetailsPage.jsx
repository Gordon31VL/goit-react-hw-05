import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import BackLink from "../../components/BackLink/BackLink";
import axios from "axios";
import { useEffect, useState } from "react";
import movieDetailsPageCss from "./MovieDetailsPage.module.css"

export default function MovieDetailsPage({options}) {
    const [movie, setMovie] = useState(null);


    const { id } = useParams();
    const location = useLocation();
    const backLinkHref = location.state?.from?.pathname || '/movies';
    
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const getResponseMovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
                setMovie(getResponseMovie.data);
                
            } catch (error) { 
              console.log(error);
            }
        };
        getMovieDetails();
    }, [id, options])
    
    
    if (!movie) {
        return <p>Movie not found</p>;
    }
    
    return (
        <div>      
            <BackLink to={backLinkHref}>Back to movies list</BackLink>
            <div>
                <div className={movieDetailsPageCss.box}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}></img>
                    </div>

                    <div>
                        <h1>{movie.title} ({movie.release_date.slice(0, 4)})</h1>
                        <p>User Score: {(movie.vote_average * 10).toFixed(0)}%</p>
                        <hgroup>
                            <h2>Overview</h2>
                            <p>{movie.overview}</p>
                        </hgroup>
                        <hgroup>
                            <h2>Genres</h2>
                            <p>
                                {movie.genres && movie.genres.length > 0
                                ? movie.genres.map(genre => <span key={genre.id}>{genre.name} </span>)
                                : "No genres"}
                            </p>
                        </hgroup>
                    </div>
                </div>
                
                
                <div>
                    <p>Additional infomation</p>
                    <ul>
                        <li><Link to="cast">Cast</Link></li>
                        <li><Link to="reviews">Reviews</Link></li>
                    </ul>
                </div>
                <Outlet context={{ id, options }}/>
                </div>
        </div>
    )
}