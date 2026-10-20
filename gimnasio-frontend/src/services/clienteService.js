import { apiCall } from './api';

const ENDPOINT = '/clientes';

export const clienteService = {
    //obtener todos los clientes (GET /api/clientes)
    obtenerTodos: async () => {
        return await apiCall(ENDPOINT);
    },

    //obtener un cliente por su cedula (GET /api/clientes/{cedula})
    obtenerPorCedula: async (cedula) => {
        return await apiCall(`${ENDPOINT}/${cedula}`);
    },

    //guardar nuevo cliente (POST /api/clientes)
    guardarCliente: async (clienteData) => {
        return await apiCall(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(clienteData),
        });
    },

    // actualizar cliente (PUT /api/clientes/{cedula})
    actualizarCliente: async (cedula, clienteData) => {
        return await apiCall(`${ENDPOINT}/${cedula}`, {
            method: 'PUT',
            body: JSON.stringify(clienteData),
        });
    },

    //eliminar cliente (DELETE /api/clientes/{cedula})
    eliminarCliente: async (cedula) => {
        return await apiCall(`${ENDPOINT}/${cedula}`, {
            method: 'DELETE',
        });
    }
};