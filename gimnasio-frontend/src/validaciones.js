export const esRequerido = (valor) => {
    if (valor === null || valor === undefined) return false;
    return valor.toString().trim().length > 0;
};

export const esEmailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const esTelefonoValido = (telefono) => {
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return regex.test(telefono);
};

export const validarFormularioCliente = (datos) => {
    const errores = {};

    if (!esRequerido(datos.nombre)) {
        errores.nombre = 'El nombre es obligatorio.';
    }

    if (!esRequerido(datos.correo)) {
        errores.correo = 'El correo electrónico es obligatorio.';
    } else if (!esEmailValido(datos.correo)) {
        errores.correo = 'El formato del correo electrónico no es válido.';
    }

    if (datos.telefono && !esTelefonoValido(datos.telefono)) {
        errores.telefono = 'El teléfono no tiene un formato válido.';
    }

    return errores;
};