import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
    const contexto = useContext(AuthContext);


    if (contexto === null) {
        return {
            estado: "sin-sesion",
            autenticado: false,
            verificando: false,
            usuario: null,
            login: async () => ({ success: false }),
            logout: async () => {}
        };
    }

    return contexto;
}