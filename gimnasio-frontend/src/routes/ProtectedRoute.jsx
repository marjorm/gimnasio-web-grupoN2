import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
    const { autenticado, verificando } = useAuth();
    const ubicacion = useLocation();


    const tieneSesionLocal = localStorage.getItem('usuario') !== null || localStorage.getItem('token') !== null;

    if (verificando) {
        return (
            <section aria-live="polite">
                <h2>Verificando acceso</h2>
                <p role="status">Estamos comprobando su sesión.</p>
            </section>
        );
    }

    if (!autenticado && !tieneSesionLocal) {
        return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
    }

    return children;
}