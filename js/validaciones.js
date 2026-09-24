export function noVacio(valor) {
    return valor.trim().length > 0;
}

export function longitudValida(valor, min, max) {
    const largo = valor.trim().length;
    return largo >= min && largo <= max;
}

export function emailValido(valor) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return patron.test(valor.trim());
}

export function telefonoValido(valor) {
    const patron = /^[0-9]{4}-?[0-9]{4}$/;
    return patron.test(valor.trim());
}

export function numeroEnRango(valor, min, max) {
    const numero = Number(valor);
    return !Number.isNaN(numero) && numero >= min && numero <= max;
}
