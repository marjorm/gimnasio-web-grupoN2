import { noVacio, emailValido, longitudValida } from './validaciones.js';
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
const CLAVE_BORRADOR_INSCRIPCION = 'gimnasio_inscripcion_borrador';

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-desinscripcion') || document.getElementById('form-inscripcion');
    const selectTipoInscripcion = document.getElementById('tipo_inscripcion');
    const grupoCurso = document.getElementById('grupo-curso');
    const grupoMaquina = document.getElementById('grupo-maquina');
    const selectCurso = document.getElementById('id_curso');
    const selectMaquina = document.getElementById('id_maquina');
    const listaCursos = document.getElementById('lista-cursos');

    // Campos del formulario base (Alineados con la BD Oracle)
    const inputCedula = document.getElementById('cedula');
    const inputNombre = document.getElementById('nombre');
    const inputApellido1 = document.getElementById('apellido_1');
    const inputApellido2 = document.getElementById('apellido_2');
    const inputEmail = document.getElementById('e_mail') || document.getElementById('email');
    const inputFecha = document.getElementById('fecha_inscripcion');
    const inputDireccion = document.getElementById('direccion');
    const btnLimpiar = document.getElementById('btn-limpiar-inscripcion');

    const camposEvaluables = [
        inputCedula, 
        inputNombre, 
        inputApellido1, 
        inputApellido2, 
        inputEmail, 
        inputFecha, 
        inputDireccion
    ].filter(Boolean);

    // --- CARGA ASINCRONA DE CURSOS DE LA API ---
    async function cargarCursos() {
        if (!listaCursos) return;
        try {
            const response = await fetch('http://localhost:8080/api/cursos');
            if (!response.ok) throw new Error('Error al conectar con la API');
            const cursos = await response.json();

            if (cursos.length === 0) {
                listaCursos.innerHTML = '<p>No hay cursos activos disponibles.</p>';
                return;
            }
            listaCursos.innerHTML = cursos.map(c => `
                <div style="border: 1px solid #ccc; padding: 8px; margin-bottom: 5px; border-radius: 4px;">
                    <strong>${c.nombre || c.titulo || 'Curso'}</strong>
                </div>
            `).join('');
        } catch (error) {
            console.warn('API no disponible o error de red:', error);
            listaCursos.innerHTML = '<p style="color: #666;">Cursos activos: Musculación, Yoga, Spinning.</p>';
        }
    }
    cargarCursos();

    // Restablecer datos desde localStorage / sessionStorage
    cargarDatosStorage();

    // ==========================================
    // MANEJO DE EVENTOS Y VALIDACIONES
    // ==========================================

    // EVENTO 1: 'input' (Guardar borrador automáticamente)
    camposEvaluables.forEach(campo => {
        campo.addEventListener('input', guardarBorradorLocal);
    });

    if (selectCurso) selectCurso.addEventListener('change', guardarBorradorLocal);
    if (selectMaquina) selectMaquina.addEventListener('change', guardarBorradorLocal);

    // EVENTO 2: 'blur' (Validación individual al salir del campo)
    camposEvaluables.forEach(campo => {
        campo.addEventListener('blur', () => validarCampoIndividual(campo));
    });

    // EVENTO 3: 'focus' (Limpia clases de error)
    camposEvaluables.forEach(campo => {
        campo.addEventListener('focus', () => limpiarEstado(campo));
    });

    // EVENTO 4: 'change' (Mostrar/Ocultar bloques según la selección)
    if (selectTipoInscripcion) {
        selectTipoInscripcion.addEventListener('change', (e) => {
            const valor = e.target.value;

            if (grupoCurso) grupoCurso.classList.add('campo-oculto');
            if (grupoMaquina) grupoMaquina.classList.add('campo-oculto');

            if (valor === 'curso' && grupoCurso) {
                grupoCurso.classList.remove('campo-oculto');
            } else if (valor === 'rutina' && grupoMaquina) {
                grupoMaquina.classList.remove('campo-oculto');
            }

            guardarBorradorLocal();
        });
    }

    // EVENTO 5: 'click' (Limpiar borrador y formulario)
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            eliminarBorradorSession(CLAVE_BORRADOR_INSCRIPCION);
            if (form) form.reset();
            if (grupoCurso) grupoCurso.classList.add('campo-oculto');
            if (grupoMaquina) grupoMaquina.classList.add('campo-oculto');
            camposEvaluables.forEach(limpiarEstado);
            mostrarToast('Se ha limpiado el borrador del formulario.', 'info');
        });
    }

    // EVENTO 6: 'submit' (Validación completa + Envío)
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            let esValido = true;
            camposEvaluables.forEach(campo => {
                if (!validarCampoIndividual(campo)) esValido = false;
            });

            const tipoSeleccionado = selectTipoInscripcion ? selectTipoInscripcion.value : '';
            if (!tipoSeleccionado) {
                mostrarToast('Debe seleccionar el tipo de inscripción (Curso o Rutina).', 'error');
                esValido = false;
            }

            let idOpcionSeleccionada = null;
            if (tipoSeleccionado === 'curso') {
                idOpcionSeleccionada = selectCurso ? selectCurso.value : '';
            } else if (tipoSeleccionado === 'rutina') {
                idOpcionSeleccionada = selectMaquina ? selectMaquina.value : '';
            }

            if (tipoSeleccionado && !idOpcionSeleccionada) {
                mostrarToast('Debe seleccionar un curso o máquina de la lista.', 'error');
                esValido = false;
            }

            if (!esValido) {
                mostrarToast('Por favor corrija los errores marcados en el formulario.', 'error');
                return;
            }

            mostrarToast('Enviando solicitud al servidor...', 'info');

            // Payload formateado según la tabla CLIENTE
            const payload = {
                cedula: inputCedula ? inputCedula.value.trim() : null,
                nombre: inputNombre ? inputNombre.value.trim() : null,
                apellido_1: inputApellido1 ? inputApellido1.value.trim() : null,
                apellido_2: inputApellido2 ? inputApellido2.value.trim() : null,
                e_mail: inputEmail && inputEmail.value.trim() ? inputEmail.value.trim() : null,
                fecha_inscripcion: inputFecha ? inputFecha.value : null,
                direccion: inputDireccion && inputDireccion.value.trim() ? inputDireccion.value.trim() : null,
                tipoInscripcion: tipoSeleccionado,
                idOpcion: idOpcionSeleccionada
            };

            try {
                await enviarDatos('/inscripcion', payload);
                mostrarToast('¡Inscripción registrada con éxito en el sistema!', 'success');

                if (payload.nombre && payload.e_mail) {
                    guardarEnStorage(CLAVE_USUARIO, {
                        nombre: payload.nombre,
                        email: payload.e_mail
                    });
                }

                eliminarBorradorSession(CLAVE_BORRADOR_INSCRIPCION);
                form.reset();
                if (grupoCurso) grupoCurso.classList.add('campo-oculto');
                if (grupoMaquina) grupoMaquina.classList.add('campo-oculto');
                camposEvaluables.forEach(limpiarEstado);

            } catch (error) {
                mostrarToast(error.message || 'Error de conexión al enviar la inscripción.', 'error');
            }
        });
    }

    // --- FUNCIONES AUXILIARES ---

    function validarCampoIndividual(input) {
        if (!input) return true;
        const valor = input.value.trim();
        let valido = true;
        let mensaje = '';

        // Cédula: NOT NULL (9 a 12 dígitos)
        if (input.id === 'cedula' && (!noVacio(valor) || valor.length < 9 || valor.length > 12)) {
            valido = false;
            mensaje = 'La cédula debe contener entre 9 y 12 dígitos.';
        } 
        // Nombre, Primer y Segundo Apellido: NOT NULL (VARCHAR 30)
        else if (['nombre', 'apellido_1', 'apellido_2'].includes(input.id) && (!noVacio(valor) || !longitudValida(valor, 2, 30))) {
            valido = false;
            mensaje = 'Campo requerido (2 a 30 caracteres).';
        } 
        // Correo: Opcional (NULL en BD), pero si se llena debe ser válido y max 30 chars
        else if ((input.id === 'e_mail' || input.id === 'email') && valor !== '') {
            if (!emailValido(valor) || valor.length > 30) {
                valido = false;
                mensaje = 'Ingrese un correo válido (máximo 30 caracteres).';
            }
        } 
        // Fecha de inscripción: NOT NULL
        else if (input.id === 'fecha_inscripcion' && !noVacio(valor)) {
            valido = false;
            mensaje = 'Debe seleccionar una fecha de inscripción.';
        } 
        // Dirección: Opcional (NULL en BD), pero max 50 chars si se llena
        else if (input.id === 'direccion' && valor !== '') {
            if (valor.length > 50) {
                valido = false;
                mensaje = 'La dirección no puede exceder los 50 caracteres.';
            }
        }

        if (valido) marcarValido(input);
        else marcarError(input, mensaje);

        return valido;
    }

    function guardarBorradorLocal() {
        const datos = {};
        camposEvaluables.forEach(c => datos[c.id] = c.value);
        if (selectTipoInscripcion) datos.tipoInscripcion = selectTipoInscripcion.value;
        if (selectCurso) datos.idCurso = selectCurso.value;
        if (selectMaquina) datos.idMaquina = selectMaquina.value;

        guardarBorradorSession(CLAVE_BORRADOR_INSCRIPCION, datos);
    }

    function cargarDatosStorage() {
        const usuarioGuardado = obtenerDeStorage(CLAVE_USUARIO);
        if (usuarioGuardado) {
            if (inputNombre && usuarioGuardado.nombre) inputNombre.value = usuarioGuardado.nombre;
            if (inputEmail && usuarioGuardado.email) inputEmail.value = usuarioGuardado.email;
        }

        const borrador = obtenerBorradorSession(CLAVE_BORRADOR_INSCRIPCION);
        if (borrador) {
            camposEvaluables.forEach(c => {
                if (borrador[c.id]) c.value = borrador[c.id];
            });

            if (selectTipoInscripcion && borrador.tipoInscripcion) {
                selectTipoInscripcion.value = borrador.tipoInscripcion;
                selectTipoInscripcion.dispatchEvent(new Event('change'));

                if (borrador.tipoInscripcion === 'curso' && selectCurso && borrador.idCurso) {
                    selectCurso.value = borrador.idCurso;
                } else if (borrador.tipoInscripcion === 'rutina' && selectMaquina && borrador.idMaquina) {
                    selectMaquina.value = borrador.idMaquina;
                }
            }
        }
    }
});