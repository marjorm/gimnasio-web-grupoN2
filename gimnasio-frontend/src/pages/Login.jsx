import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import EstadoSesion from "../components/ui/EstadoSesion.jsx";

export default function Login() {
    const { autenticado, verificando } = useAuth();

    return (
        <div>
            <section aria-labelledby="titulo-login">
                <h2 id="titulo-login">Acceso al gimnasio</h2>
                <EstadoSesion />

                {verificando ? (
                    <p role="status">
                        Verificando su sesión...
                    </p>
                ) : autenticado ? (
                    <p role="status">
                        Su sesión ha sido verificada.
                    </p>
                ) : (
                    <>
                        <p>
                            El acceso a las funciones privadas
                            requiere iniciar sesión.
                        </p>

                        <p role="status">
                            El inicio de sesión todavía no está
                            habilitado. Se requiere integrar la
                            autenticación del servidor.
                        </p>
                    </>
                )}

                <p>
                    <Link to="/">
                        Volver al inicio
                    </Link>
                </p>
            </section>
        </div>
    );
}
