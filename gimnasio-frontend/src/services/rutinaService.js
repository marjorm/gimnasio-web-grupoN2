import { apiCall } from './api';

const ENDPOINT = '/rutinas';

export const rutinaService = {
    //listar todas las rutinas (GET /api/rutinas)
    obtenerTodas: async () => {
        return await apiCall(ENDPOINT);
    },

    //obtener rutina por ID (GET /api/rutinas/{id})
    obtenerPorId: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`);
    },

    //crear nueva rutina enviando el DTO (POST /api/rutinas)
    guardarRutina: async (rutinaDto) => {
        return await apiCall(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(rutinaDto),
        });
    },

    //actualizar rutina enviando el DTO (PUT /api/rutinas/{id})
    actualizarRutina: async (id, rutinaDto) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(rutinaDto),
        });
    },

    //eliminar una rutina (DELETE /api/rutinas/{id})
    eliminarRutina: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'DELETE',
        });
    }
};