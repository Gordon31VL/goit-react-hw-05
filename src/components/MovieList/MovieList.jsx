import { Link, useLocation } from "react-router-dom";

export default function MovieList({title, id}) {
    const location = useLocation();
    return (
        <>
            <Link to={`/movies/${id}`}  state={{ from: location }}>{title}</Link>
        </>
    )

}