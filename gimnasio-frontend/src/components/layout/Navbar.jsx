
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/contactos">Contactos</NavLink>
            <NavLink to="/servicios">Servicios</NavLink>
            <NavLink to="/cursos">Cursos</NavLink>
            <NavLink to="/rutinas">Rutinas</NavLink>
            <NavLink to="/maquinas">Máquinas</NavLink>
            <NavLink to="/instructores">Instructores</NavLink>
            <NavLink to="/inscripcion">Verificar inscripción</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/login">Acceso</NavLink>
        </nav>
    );
}

export default Navbar;
