import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./auth.js"; // Importar el contexto compartido

export function AuthProvider({ children, comprobarSesion }) {
    const tieneVerificador = typeof comprobarSesion === "function";

    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem('usuario');
        return guardado ? JSON.parse(guardado) : null;
    });

    const [revision, setRevision] = useState(() => ({
        verificador: comprobarSesion,
        estado: tieneVerificador ? "verificando" : "sin-configurar"
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
                    estado: resultado === true ? "autenticado" : "sin-sesion"
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

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, passwordHash: password })
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const data = await response.json();
            
            setUsuario(data);
            localStorage.setItem('usuario', JSON.stringify(data));
            setRevision(prev => ({ ...prev, estado: "autenticado" }));
            
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/usuarios/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error("Error al cerrar sesión en el servidor:", error);
        } finally {
            setUsuario(null);
            localStorage.removeItem('usuario');
            setRevision(prev => ({ ...prev, estado: "sin-sesion" }));
        }
    };

    const valor = useMemo(
        () => ({
            estado,
            autenticado: estado === "autenticado" || usuario !== null,
            verificando: estado === "verificando",
            usuario,
            login,
            logout
        }),
        [estado, usuario]
    );

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    );
}