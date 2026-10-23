import {
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";

import { useAuth } from "../context/auth.js";

export default function ProtectedRoute({ children }) {
    const { autenticado, verificando } = useAuth();
    const ubicacion = useLocation();

    if (verificando) {
        return (
            <section aria-live="polite">
                <h2>Verificando acceso</h2>
                <p role="status">
                    Estamos comprobando su sesión.
                </p>
            </section>
        );
    }

    if (!autenticado) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ desde: ubicacion.pathname }}
            />
        );
    }

    return children ?? <Outlet />;
}
