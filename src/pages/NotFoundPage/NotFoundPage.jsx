import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <>
            <p>Error 404. Page not Found</p>
            <button type="button" onClick={() => navigate("/")}>Return back</button>
        </>
    )
}