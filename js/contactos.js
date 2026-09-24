import { noVacio, emailValido, telefonoValido, longitudValida } from './validaciones.js';
import { marcarError, marcarValido, limpiarEstado, mostrarToast } from './ui.js';
import { enviarDatos } from './api.js';
import { 
    guardarEnStorage, 
    obtenerDeStorage, 
    guardarBorradorSession, 
    obtenerBorradorSession, 
    eliminarBorradorSession 
} from './storage.js';

const CLAVE_USUARIO = 'gimnasio_contacto_usuario';
const CLAVE_BORRADOR = 'gimnasio_contacto_borrador';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-contacto');
    if (!formulario) return;

    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const inputTelefono = document.getElementById('telefono');
    const selectAsunto = document.getElementById('asunto');
    const inputMensaje = document.getElementById('mensaje');
    const btnLimpiar = document.getElementById('btn-limpiar');
    const contenedorMotivoOtro = document.getElementById('contenedor-motivo-otro');

    const camposTexto = [inputNombre, inputEmail, inputTelefono, inputMensaje];

    // cargar datos previos desde storage
    cargarDatosPrevios(inputNombre, inputEmail, inputTelefono, selectAsunto, inputMensaje, contenedorMotivoOtro);

    // =========================================================================
    // EVENTOS DEL DOM
    // =========================================================================

    //input (Autoguardado de borrador en sessionStorage)
    [...camposTexto, selectAsunto].forEach(campo => {
        campo.addEventListener('input', () => {
            guardarBorradorTemporal(inputNombre, inputEmail, inputTelefono, selectAsunto, inputMensaje);
        });
    });

    //blur (Validacion individual al perder el foco)
    camposTexto.forEach(campo => {
        campo.addEventListener('blur', () => {
            validarCampo(campo);
        });
    });

    //focus (Limpia temporalmente el mensaje de error para que el usuario redacte comodo)
    camposTexto.forEach(campo => {
        campo.addEventListener('focus', () => {
            limpiarEstado(campo);
        });
    });

    // EVENTO 4: 'change' + MANIPULACIÓN DINÁMICA DEL DOM (Crear/Eliminar nodos)
    selectAsunto.addEventListener('change', () => {
        gestionarCampoOtroDinámico(selectAsunto, contenedorMotivoOtro);
        guardarBorradorTemporal(inputNombre, inputEmail, inputTelefono, selectAsunto, inputMensaje);
    });

    //click (Limpieza total de borrador)
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            eliminarBorradorSession(CLAVE_BORRADOR);
            formulario.reset();
            gestionarCampoOtroDinámico(selectAsunto, contenedorMotivoOtro); // Elimina el campo dinámico si existía
            [...camposTexto, selectAsunto].forEach(limpiarEstado);
            mostrarToast("Se ha limpiado el borrador guardado.", "success");
        });
    }

    //submit (Validaciones finales y Fetch asincrono POST)
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const esNombreValido = validarCampo(inputNombre);
        const esEmailValido = validarCampo(inputEmail);
        const esTelefonoValido = validarCampo(inputTelefono);
        const esAsuntoValido = noVacio(selectAsunto.value);
        const esMensajeValido = validarCampo(inputMensaje);

        if (!esAsuntoValido) {
            marcarError(selectAsunto, "Por favor seleccione un motivo.");
        }

        // Validar el campo dinamico si existe en el DOM
        const inputMotivoOtro = document.getElementById('motivo-otro');
        let esMotivoOtroValido = true;
        if (inputMotivoOtro) {
            esMotivoOtroValido = noVacio(inputMotivoOtro.value) && longitudValida(inputMotivoOtro.value, 3, 50);
            if (!esMotivoOtroValido) {
                marcarError(inputMotivoOtro, "Especifique el motivo (entre 3 y 50 caracteres).");
            } else {
                marcarValido(inputMotivoOtro);
            }
        }

        if (!esNombreValido || !esEmailValido || !esTelefonoValido || !esAsuntoValido || !esMensajeValido || !esMotivoOtroValido) {
            mostrarToast("Por favor complete correctamente los campos con error.", "error");
            return;
        }

        //determinar el motivo final para adjuntarlo al texto del mensaje
        let motivoFinal = selectAsunto.value;
        if (motivoFinal === 'Otro' && inputMotivoOtro) {
            motivoFinal = `Otro (${inputMotivoOtro.value.trim()})`;
        }

        // CONCATENAMOS EL MOTIVO DIRECTAMENTE EN EL MENSAJE
        const mensajeConcatenado = `[Motivo: ${motivoFinal}]\n${inputMensaje.value.trim()}`;

        // Estructura exacta que espera el backend de Spring Boot (nombre, email, telefono, mensaje)
        const datosParaBackend = {
            nombre: inputNombre.value.trim(),
            email: inputEmail.value.trim(),
            telefono: inputTelefono.value.trim(),
            mensaje: mensajeConcatenado
        };

        try {
            // Envío con Fetch asíncrono
            await enviarDatos('/contacto', datosParaBackend);
            
            mostrarToast("¡Consulta enviada con éxito!", "success");

            // Guardar credenciales de usuario en localStorage para futuras visitas
            guardarEnStorage(CLAVE_USUARIO, {
                nombre: datosParaBackend.nombre,
                email: datosParaBackend.email,
                telefono: datosParaBackend.telefono
            });

            // Eliminar borrador de sessionStorage
            eliminarBorradorSession(CLAVE_BORRADOR);

            // Reiniciar formulario
            formulario.reset();
            gestionarCampoOtroDinámico(selectAsunto, contenedorMotivoOtro);
            [...camposTexto, selectAsunto].forEach(limpiarEstado);

            // Restaurar datos del usuario persistentes en el form
            inputNombre.value = datosParaBackend.nombre;
            inputEmail.value = datosParaBackend.email;
            inputTelefono.value = datosParaBackend.telefono;

        } catch (error) {
            mostrarToast(error.message || "No se pudo conectar con el servidor.", "error");
        }
    });
});

/**
 * CREAR Y ELIMINAR NODOS DEL DOM DINÁMICAMENTE
 */
function gestionarCampoOtroDinámico(selectAsunto, contenedor) {
    const existeCampo = document.getElementById('motivo-otro');

    if (selectAsunto.value === 'Otro') {
        if (!existeCampo) {
            // Crear el elemento <label>
            const label = document.createElement('label');
            label.setAttribute('for', 'motivo-otro');
            label.textContent = 'Especifique el motivo:';

            // Crear el elemento <input>
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'motivo-otro';
            input.name = 'motivo-otro';
            input.required = true;
            input.placeholder = 'Escriba la razón de su consulta...';

            // Insertar nodos al DOM
            contenedor.appendChild(label);
            contenedor.appendChild(input);

            // Asignar eventos al nuevo nodo creado
            input.addEventListener('input', () => {
                if (noVacio(input.value) && longitudValida(input.value, 3, 50)) {
                    marcarValido(input);
                }
            });
        }
    } else {
        // Eliminar del DOM si cambió de opción
        if (existeCampo) {
            contenedor.innerHTML = ''; // Elimina los nodos creados
        }
    }
}

/**
 * Validaciones dinamicas en el cliente
 */
function validarCampo(input) {
    const valor = input.value;
    let esValido = true;
    let mensajeError = "";

    switch (input.id) {
        case 'nombre':
            if (!noVacio(valor)) {
                esValido = false;
                mensajeError = "El nombre es obligatorio.";
            } else if (!longitudValida(valor, 3, 80)) {
                esValido = false;
                mensajeError = "Debe tener entre 3 y 80 caracteres.";
            }
            break;

        case 'email':
            if (!noVacio(valor)) {
                esValido = false;
                mensajeError = "El correo es obligatorio.";
            } else if (!emailValido(valor)) {
                esValido = false;
                mensajeError = "Ingrese un correo electrónico válido.";
            }
            break;

        case 'telefono':
            if (!noVacio(valor)) {
                esValido = false;
                mensajeError = "El teléfono es obligatorio.";
            } else if (!telefonoValido(valor)) {
                esValido = false;
                mensajeError = "Formato inválido (Ejemplo: 8888-8888).";
            }
            break;

        case 'mensaje':
            if (!noVacio(valor)) {
                esValido = false;
                mensajeError = "El mensaje es obligatorio.";
            } else if (!longitudValida(valor, 10, 500)) {
                esValido = false;
                mensajeError = "El mensaje debe tener entre 10 y 500 caracteres.";
            }
            break;
    }

    if (esValido) {
        marcarValido(input);
    } else {
        marcarError(input, mensajeError);
    }

    return esValido;
}

function cargarDatosPrevios(inputNombre, inputEmail, inputTelefono, selectAsunto, inputMensaje, contenedorMotivoOtro) {
    const usuarioGuardado = obtenerDeStorage(CLAVE_USUARIO);
    if (usuarioGuardado) {
        if (usuarioGuardado.nombre) inputNombre.value = usuarioGuardado.nombre;
        if (usuarioGuardado.email) inputEmail.value = usuarioGuardado.email;
        if (usuarioGuardado.telefono) inputTelefono.value = usuarioGuardado.telefono;
    }

    const borradorGuardado = obtenerBorradorSession(CLAVE_BORRADOR);
    if (borradorGuardado) {
        if (borradorGuardado.nombre) inputNombre.value = borradorGuardado.nombre;
        if (borradorGuardado.email) inputEmail.value = borradorGuardado.email;
        if (borradorGuardado.telefono) inputTelefono.value = borradorGuardado.telefono;
        if (borradorGuardado.asunto) {
            selectAsunto.value = borradorGuardado.asunto;
            gestionarCampoOtroDinámico(selectAsunto, contenedorMotivoOtro);
            if (borradorGuardado.motivoOtro) {
                const inputMotivoOtro = document.getElementById('motivo-otro');
                if (inputMotivoOtro) inputMotivoOtro.value = borradorGuardado.motivoOtro;
            }
        }
        if (borradorGuardado.mensaje) inputMensaje.value = borradorGuardado.mensaje;
    }
}

function guardarBorradorTemporal(inputNombre, inputEmail, inputTelefono, selectAsunto, inputMensaje) {
    const inputMotivoOtro = document.getElementById('motivo-otro');
    const borrador = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        telefono: inputTelefono.value,
        asunto: selectAsunto.value,
        motivoOtro: inputMotivoOtro ? inputMotivoOtro.value : '',
        mensaje: inputMensaje.value
    };
    guardarBorradorSession(CLAVE_BORRADOR, borrador);
}