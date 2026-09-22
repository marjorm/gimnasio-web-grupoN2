document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-desinscripcion');
    const selectPlan = document.getElementById('plan');
    const inputEdad = document.getElementById('edad');
    const alertaMenor = document.getElementById('alerta-menor');
    const contenedorDinamico = document.getElementById('contenedor-dinamico');
    const listaCursos = document.getElementById('lista-cursos');
    const toast = document.getElementById('toast-notificacion');


    function mostrarToast(mensaje) {
        if (!toast) return;
        toast.textContent = mensaje;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }


    async function cargarCursos() {
        try {
            const response = await fetch('http://localhost:8080/api/cursos');
            if (!response.ok) throw new Error('Error al conectar con la API');
            const cursos = await response.json();

            if (listaCursos) {
                if (cursos.length === 0) {
                    listaCursos.innerHTML = '<p>No hay cursos activos disponibles.</p>';
                    return;
                }
                listaCursos.innerHTML = cursos.map(c => `
                    <div style="border: 1px solid #ccc; padding: 8px; margin-bottom: 5px; border-radius: 4px;">
                        <strong>${c.nombre || c.titulo || 'Curso'}</strong>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.warn('API no disponible o error de red:', error);
            if (listaCursos) {
                listaCursos.innerHTML = '<p style="color: #666;">Cursos activos: Musculación, Yoga, Spinning.</p>';
            }
        }
    }
    cargarCursos();


    if (inputEdad && alertaMenor) {
        inputEdad.addEventListener('input', () => {
            const edad = parseInt(inputEdad.value, 10);
            if (edad && edad < 18) {
                alertaMenor.classList.remove('hidden');
            } else {
                alertaMenor.classList.add('hidden');
            }
        });
    }


    if (selectPlan && contenedorDinamico) {
        selectPlan.addEventListener('change', (e) => {
            const valor = e.target.value;
            contenedorDinamico.innerHTML = '';

            if (valor === 'anual') {
                contenedorDinamico.innerHTML = `
                    <div class="campo" style="margin-top: 10px;">
                        <label for="forma-pago">Forma de Pago (Plan Anual):</label>
                        <select id="forma-pago" name="formaPago" required>
                            <option value="">-- Seleccione forma de pago --</option>
                            <option value="contado">Contado (10% descuento)</option>
                            <option value="cuotas">Cuotas mensuales</option>
                        </select>
                    </div>
                `;
                mostrarToast('Habilitadas opciones de pago para Plan Anual.');
            } else if (valor === 'mensual' || valor === 'trimestral') {
                contenedorDinamico.innerHTML = `
                    <div class="campo" style="margin-top: 10px;">
                        <label for="fecha-inicio">Fecha de inicio preferida:</label>
                        <input type="date" id="fecha-inicio" name="fechaInicio" required>
                    </div>
                `;
            }
        });
    }


    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            mostrarToast('Enviando solicitud de desinscripción...');
        });
    }
});