import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.js";

function Navbar() {
    const { autenticado, usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav>
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/contactos">Contactos</NavLink>
            <NavLink to="/servicios">Servicios</NavLink>
            <NavLink to="/cursos">Cursos</NavLink>
            <NavLink to="/maquinas">Máquinas</NavLink>
            <NavLink to="/instructores">Instructores</NavLink>
            <NavLink to="/blog">Blog</NavLink>

            {/* Enlaces y acciones condicionales según el estado de la sesión */}
            {autenticado ? (
                <>
                    <NavLink to="/rutinas">Rutinas</NavLink>
                    <NavLink to="/inscripcion">Verificar inscripción</NavLink>

                    {usuario?.rol === "ADMIN" && (
                        <NavLink to="/mantenimiento">Mantenimiento</NavLink>
                    )}

                    <button 
                        type="button" 
                        onClick={handleLogout} 
                        className="btn-logout"
                    >
                        Cerrar sesión ({usuario?.username || 'Usuario'})
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Acceso</NavLink>
                </>
            )}
        </nav>
    );
}

export default Navbar;
