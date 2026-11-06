/** E5: modelo de datos de la petición de inscripción; conserva la separación de capas. */
export function crearSolicitudInscripcion({ tipo, itemId, clienteId, rol }) {
  const id = Number(itemId);
  if (!['CURSO', 'RUTINA'].includes(tipo) || !Number.isInteger(id) || id <= 0) {
    throw new Error('Seleccione un curso o una rutina válida.');
  }
  const solicitud = { tipo, itemId: id };
  if (rol === 'ADMIN') {
    const cliente = Number(clienteId);
    if (!Number.isInteger(cliente) || cliente <= 0) {
      throw new Error('Ingrese una cédula de cliente válida.');
    }
    solicitud.clienteId = cliente;
  }
  return solicitud;
}
