import {
    useEffect,
    useMemo,
    useState
} from "react";

import { AuthContext } from "./auth.js";

/*
 * comprobarSesion debe consultar una sesión real del backend.
 * Sin esa función, no se concede acceso a rutas privadas.
 */
export function AuthProvider({ children, comprobarSesion }) {
    const tieneVerificador =
        typeof comprobarSesion === "function";

    const [revision, setRevision] = useState(() => ({
        verificador: comprobarSesion,
        estado: tieneVerificador
            ? "verificando"
            : "sin-configurar"
    }));

    const estado =
        revision.verificador === comprobarSesion
            ? revision.estado
            : tieneVerificador
                ? "verificando"
                : "sin-configurar";

    useEffect(() => {
        if (!tieneVerificador) {
            return undefined;
        }

        let vigente = true;

        Promise.resolve()
            .then(() => comprobarSesion())
            .then((resultado) => {
                if (!vigente) return;

                setRevision({
                    verificador: comprobarSesion,
                    estado: resultado === true
                        ? "autenticado"
                        : "sin-sesion"
                });
            })
            .catch(() => {
                if (!vigente) return;

                setRevision({
                    verificador: comprobarSesion,
                    estado: "error"
                });
            });

        return () => {
            vigente = false;
        };
    }, [comprobarSesion, tieneVerificador]);

    const valor = useMemo(
        () => ({
            estado,
            autenticado: estado === "autenticado",
            verificando: estado === "verificando"
        }),
        [estado]
    );

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    );
}
