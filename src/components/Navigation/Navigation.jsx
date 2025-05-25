import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <header>
          <nav>
            <NavLink to='/' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
            <NavLink to='/movies' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Movies</NavLink>
          </nav>
        </header>
    )
}