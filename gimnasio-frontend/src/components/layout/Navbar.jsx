import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';

export default function Navbar() {
    const { autenticado, usuario, logout } = useAuth();
    const navigate = useNavigate();
    const [errorSalida, setErrorSalida] = useState('');

    const handleLogout = async () => {
        setErrorSalida('');
        const resultado = await logout();
        if (resultado.success) {
            navigate('/login');
        } else {
            setErrorSalida(resultado.message || 'No se pudo cerrar la sesión.');
        }
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
            {autenticado ? (
                <>
                    <NavLink to="/rutinas">Rutinas</NavLink>
                    {(usuario?.rol === 'CLIENTE' || usuario?.rol === 'ADMIN') && (
                        <NavLink to="/inscripcion">Verificar inscripción</NavLink>
                    )}
                    {usuario?.rol === 'ADMIN' && <NavLink to="/mantenimiento">Mantenimiento</NavLink>}
                    <button type="button" onClick={handleLogout} className="btn-logout">
                        Cerrar sesión ({usuario?.username || 'Usuario'})
                    </button>
                </>
            ) : (
                <NavLink to="/login">Acceso</NavLink>
            )}
            {errorSalida && <p role="alert">{errorSalida}</p>}
        </nav>
    );
}
