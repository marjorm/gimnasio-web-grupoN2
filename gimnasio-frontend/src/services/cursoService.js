import { apiCall } from './api';

const ENDPOINT = '/cursos';

export const cursoService = {
    //Obtener todos los cursos (GET /api/cursos)
    obtenerTodos: async () => {
        return await apiCall(ENDPOINT);
    },

    //Obtener un curso por su ID (GET /api/cursos/{id})
    obtenerPorId: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`);
    },

    // 3. Guardar un nuevo curso (POST /api/cursos)
    guardarCurso: async (cursoData) => {
        return await apiCall(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(cursoData),
        });
    },

    // 4. Actualizar un curso (PUT /api/cursos/{id})
    actualizarCurso: async (id, cursoData) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(cursoData),
        });
    },

    // 5. Eliminar un curso (DELETE /api/cursos/{id})
    eliminarCurso: async (id) => {
        return await apiCall(`${ENDPOINT}/${id}`, {
            method: 'DELETE',
        });
    }
};