import { apiCall } from './api';
export const adminService = {
 listar: (ruta) => apiCall(ruta),
 guardar: (ruta, datos, id = null) => apiCall(id == null ? ruta : `${ruta}/${id}`, {
   method: id == null ? 'POST' : 'PUT',body: JSON.stringify(datos)
 }),
 eliminar: (ruta, id) => apiCall(`${ruta}/${id}`,{method:'DELETE'}),
 pagar: (id) => apiCall(`/pagos/${id}/pagar`,{method:'PUT'}),
 atender: (id) => apiCall(`/contactos/${id}/atender`,{method:'PUT'})
};
