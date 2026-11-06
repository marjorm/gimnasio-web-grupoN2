import { apiCall } from './api';
export const inscripcionService = {
 mias: () => apiCall('/inscripciones/mias'),
 todas: () => apiCall('/inscripciones'),
 registrar: (datos) => apiCall('/inscripciones', { method: 'POST',body: JSON.stringify(datos) }),
 cancelar: (id) => apiCall(`/inscripciones/${id}/cancelar`,{method:'POST'}),
 alDia: () => apiCall('/inscripciones/al-dia'),
 bajaGimnasio: () => apiCall('/inscripciones/baja-gimnasio',{method:'POST'})
};
