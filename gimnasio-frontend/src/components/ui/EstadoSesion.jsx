import { useAuth } from "../../context/auth.js";

const MENSAJES = {
    "sin-configurar": "Inicio de sesión no disponible",
    "verificando": "Verificando sesión",
    "autenticado": "Sesión verificada",
    "sin-sesion": "No ha iniciado sesión",
    "error": "No se pudo verificar la sesión"
};

export default function EstadoSesion() {
    const { estado } = useAuth();

    return (
        <span role="status" aria-live="polite">
            {MENSAJES[estado] ?? "Estado de sesión desconocido"}
        </span>
    );
}
