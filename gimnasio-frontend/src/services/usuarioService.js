import { apiCall } from './api';

const ENDPOINT = '/usuarios';

export const usuarioService = {
    // Registrar un nuevo usuario (Cliente, Instructor, Administrador)
    registrar: async (usuarioData) => {
        return await apiCall(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(usuarioData),
        });
    }
};