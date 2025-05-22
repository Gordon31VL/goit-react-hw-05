import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <p>Error 404. Page not Found</p>
            <Link to="/">Return back</Link>
        </>
    )
}