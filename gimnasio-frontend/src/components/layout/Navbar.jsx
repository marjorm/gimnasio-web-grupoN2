
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/contactos">Contactos</NavLink>
            <NavLink to="/servicios">Servicios</NavLink>
            <NavLink to="/blog">Blog</NavLink>
        </nav>
    );
}

export default Navbar;
