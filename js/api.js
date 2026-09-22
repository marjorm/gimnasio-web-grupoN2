const URL_BASE = "http://localhost:8080/api";


export async function obtenerCursos() {
    try {
        const respuesta = await fetch(URL_BASE + "/cursos");

        if (!respuesta.ok) {
            throw new Error("El servidor respondió con estado " + respuesta.status);
        }

        return await respuesta.json();

    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        throw new Error("No se pudieron cargar los cursos. Verifique que el servidor esté encendido.");
    }
}


export async function enviarDatos(ruta, datos) {
    try {
        const respuesta = await fetch(URL_BASE + ruta, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error("El servidor respondió con estado " + respuesta.status);
        }

        return await respuesta.json();

    } catch (error) {
        console.error("Error al enviar los datos:", error);
        throw new Error("No se pudo enviar la información. Intente nuevamente.");
    }
}


export function obtenerCursosConPromesas() {
    return fetch(URL_BASE + "/cursos")
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Error " + respuesta.status);
            }
            return respuesta.json();
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
}