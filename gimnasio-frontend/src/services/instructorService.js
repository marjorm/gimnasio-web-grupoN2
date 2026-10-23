import { apiCall } from './api';

const ENDPOINT = '/instructores';

export const instructorService = {
    //listar todos los instructores (GET /api/instructores)
    obtenerTodos: async () => {
        return await apiCall(ENDPOINT);
    },

    //obtener instructor por ID (GET /api/instructores/{id})
    obtenerPorId: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`);
    },

    //crear nuevo instructor (POST /api/instructores)
    guardarInstructor: async (instructorData) => {
        return await apiCall(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(instructorData),
        });
    },

    //actualizar instructor (PUT /api/instructores/{id})
    actualizarInstructor: async (id, instructorData) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(instructorData),
        });
    },

    // 5. Eliminar un instructor (DELETE /api/instructores/{id})
    eliminarInstructor: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'DELETE',
        });
    }
};