import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth.js';

const normalizarUsuario = (datos) => {
    if (!datos || !Number.isInteger(Number(datos.id)) ||
        typeof datos.username !== 'string' ||
        !['ADMIN', 'INSTRUCTOR', 'CLIENTE'].includes(datos.rol)) {
        return null;
    }

    return { id: Number(datos.id), username: datos.username, rol: datos.rol };
};

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        let vigente = true;
        const controlador = new AbortController();

        const comprobarSesion = async () => {
            try {
                const respuesta = await fetch('/api/usuarios/sesion', {
                    credentials: 'include',
                    cache: 'no-store',
                    signal: controlador.signal
                });

                if (!respuesta.ok) {
                    if (vigente) setUsuario(null);
                    return;
                }

                const datos = await respuesta.json();
                if (vigente) setUsuario(normalizarUsuario(datos));
            } catch {
                if (vigente) setUsuario(null);
            } finally {
                if (vigente) setVerificando(false);
            }
        };

        void comprobarSesion();
        return () => {
            vigente = false;
            controlador.abort();
        };
    }, []);

    const login = useCallback(async (username, password) => {
        try {
            const respuesta = await fetch('/api/usuarios/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, passwordHash: password })
            });

            if (!respuesta.ok) {
                return {
                    success: false,
                    message: respuesta.status === 401
                        ? 'Credenciales inválidas.'
                        : `No se pudo iniciar sesión (HTTP ${respuesta.status}).`
                };
            }

            const datos = normalizarUsuario(await respuesta.json());
            if (!datos) {
                return { success: false, message: 'El servidor devolvió un usuario inválido.' };
            }

            setUsuario(datos);
            setVerificando(false);
            return { success: true, usuario: datos };
        } catch {
            return { success: false, message: 'No se pudo conectar con el backend.' };
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            const respuesta = await fetch('/api/usuarios/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (!respuesta.ok) {
                return { success: false, message: 'No se pudo cerrar la sesión en el servidor.' };
            }

            setUsuario(null);
            return { success: true };
        } catch {
            return { success: false, message: 'No hay conexión con el servidor para cerrar la sesión.' };
        }
    }, []);

    const valor = useMemo(() => ({
        estado: verificando ? 'verificando' : usuario ? 'autenticado' : 'sin-sesion',
        autenticado: !verificando && usuario !== null,
        verificando,
        usuario,
        login,
        logout
    }), [verificando, usuario, login, logout]);

    return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
