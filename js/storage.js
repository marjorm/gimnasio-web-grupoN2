/**
 * Modulo para la gestion del Almacenamiento Local (localStorage) y de Sesion (sessionStorage)
 */

// --- LOCAL STORAGE (Datos duraderos) ---

/**
 * guarda un objeto o valor en localStorage bajo una clave especificada
 * @param {string} clave 
 * @param {any} valor 
 */
export function guardarEnStorage(clave, valor) {
    try {
        const valorSerializado = JSON.stringify(valor);
        localStorage.setItem(clave, valorSerializado);
    } catch (error) {
        console.error(`Error al guardar '${clave}' en localStorage:`, error);
    }
}

/**
 * obtiene un valor de localStorage
 * @param {string} clave 
 * @returns {any|null}
 */
export function obtenerDeStorage(clave) {
    try {
        const item = localStorage.getItem(clave);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error al leer '${clave}' de localStorage:`, error);
        return null;
    }
}

/**
 * Elimina un objeto de localStorage
 * @param {string} clave 
 */
export function eliminarDeStorage(clave) {
    try {
        localStorage.removeItem(clave);
    } catch (error) {
        console.error(`Error al eliminar '${clave}' de localStorage:`, error);
    }
}

// --- SESSION STORAGE (Datos temporales / borradores) ---

/**
 * Guarda un borrador o dato temporal en sessionStorage
 * @param {string} clave 
 * @param {any} valor 
 */
export function guardarBorradorSession(clave, valor) {
    try {
        const valorSerializado = JSON.stringify(valor);
        sessionStorage.setItem(clave, valorSerializado);
    } catch (error) {
        console.error(`Error al guardar borrador '${clave}' en sessionStorage:`, error);
    }
}

/**
 * Obtiene un borrador guardado en sessionStorage
 * @param {string} clave 
 * @returns {any|null}
 */
export function obtenerBorradorSession(clave) {
    try {
        const item = sessionStorage.getItem(clave);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error al obtener borrador '${clave}' de sessionStorage:`, error);
        return null;
    }
}

/**
 * Elimina un borrador de sessionStorage
 * @param {string} clave 
 */
export function eliminarBorradorSession(clave) {
    try {
        sessionStorage.removeItem(clave);
    } catch (error) {
        console.error(`Error al eliminar borrador '${clave}' de sessionStorage:`, error);
    }
}