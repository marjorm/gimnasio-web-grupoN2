export const esRequerido = (valor) =>
    valor !== null && valor !== undefined && String(valor).trim().length > 0;

export const esEmailValido = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));

export const esTelefonoValido = (telefono) =>
    /^\d{8}$/.test(String(telefono));

const esEnteroPositivo = (valor) =>
    /^\d+$/.test(String(valor)) &&
    Number.isInteger(Number(valor)) &&
    Number(valor) > 0 &&
    Number(valor) <= 2147483647;

export const validarFormularioCliente = (datos) => {
    const errores = {};

    if (!esEnteroPositivo(datos.id)) {
        errores.id = 'Indique una cédula numérica válida.';
    }

    for (const campo of ['nombre', 'apellido1', 'apellido2']) {
        const valor = String(datos[campo] || '').trim();

        if (valor.length < 2 || valor.length > 30) {
            errores[campo] = 'Debe contener entre 2 y 30 caracteres.';
        }
    }

    if (String(datos.direccion || '').length > 50) {
        errores.direccion = 'Máximo 50 caracteres.';
    }

    const correo = String(datos.eMail || '').trim();

    if (correo && (!esEmailValido(correo) || correo.length > 30)) {
        errores.eMail = 'Correo inválido o mayor a 30 caracteres.';
    }

    const hoy = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
    ).toISOString().slice(0, 10);

    const fecha = String(datos.fechaInscripcion || '');

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(fecha) ||
        Number.isNaN(Date.parse(fecha)) ||
        fecha > hoy
    ) {
        errores.fechaInscripcion = 'Indique una fecha válida, no futura.';
    }

    for (const campo of ['celular', 'telHabitacion']) {
        if (!esTelefonoValido(datos[campo])) {
            errores[campo] = 'Indique 8 dígitos numéricos.';
        }
    }

    return errores;
};