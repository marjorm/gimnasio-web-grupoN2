import { apiCall } from './api';

const ENDPOINT = '/maquinas';

export const maquinaService = {
    //listar todas las maquinas (GET /api/maquinas)
    obtenerTodas: async () => {
        return await apiCall(ENDPOINT);
    },

    //obtener una maquina por ID (GET /api/maquinas/{id})
    obtenerPorId: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`);
    },

    //crear nueva maquina (POST /api/maquinas)
    guardarMaquina: async (maquinaData) => {
        return await apiCall(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(maquinaData),
        });
    },

    //actualizar maquina (PUT /api/maquinas/{id})
    actualizarMaquina: async (id, maquinaData) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(maquinaData),
        });
    },

    //eliminar maquina (DELETE /api/maquinas/{id})
    eliminarMaquina: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'DELETE',
        });
    }
};