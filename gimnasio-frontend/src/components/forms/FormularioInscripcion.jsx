import { useState, useEffect } from 'react';
import { esEmailValido, esRequerido } from '../../validaciones';

export default function FormularioInscripcion({
                                                  cursos: cursosProp = [],
                                                  rutinas: rutinasProp = [],
                                                  onSubmit
                                              }) {
    const [cursos, setCursos] = useState(cursosProp);
    const [rutinas, setRutinas] = useState(rutinasProp);
    const [cargandoLista, setCargandoLista] = useState(false);

    const [datos, setDatos] = useState({
        nombreCliente: '',
        correoCliente: '',
        tipoInscripcion: 'curso',
        itemId: ''
    });

    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [enviando, setEnviando] = useState(false);

    // Cargar cursos y rutinas desde el backend si no vienen por props
    useEffect(() => {
        const cargarDatosBD = async () => {
            if (cursosProp.length > 0 && rutinasProp.length > 0) return;
            setCargandoLista(true);
            try {
                const [resCursos, resRutinas] = await Promise.all([
                    fetch('http://localhost:8080/api/cursos'),
                    fetch('http://localhost:8080/api/rutinas')
                ]);

                if (resCursos.ok) {
                    const dataC = await resCursos.json();
                    setCursos(dataC);
                }
                if (resRutinas.ok) {
                    const dataR = await resRutinas.json();
                    setRutinas(dataR);
                }
            } catch (err) {
                console.error('Error al cargar datos desde Spring Boot:', err);
            } finally {
                setCargandoLista(false);
            }
        };

        cargarDatosBD();
    }, [cursosProp, rutinasProp]);

    const opciones = datos.tipoInscripcion === 'curso' ? cursos : rutinas;

    const cambiar = (evento) => {
        const { name, value } = evento.target;

        setDatos((anterior) => ({
            ...anterior,
            [name]: value,
            ...(name === 'tipoInscripcion' ? { itemId: '' } : {})
        }));

        setError('');
        setExito('');
    };

    const verificarYEnviar = async (evento) => {
        evento.preventDefault();

        if (
            !esRequerido(datos.nombreCliente) ||
            !esEmailValido(datos.correoCliente) ||
            !esRequerido(datos.itemId)
        ) {
            setError('Complete el nombre, correo válido y opción.');
            return;
        }

        const seleccionValida = opciones.some(
            (item) => String(item.id || item.idCurso || item.idRutina) === String(datos.itemId)
        );

        if (!seleccionValida) {
            setError('Seleccione una opción válida de la lista.');
            return;
        }

        setError('');
        setEnviando(true);

        try {
            const respuesta = await fetch('http://localhost:8080/api/inscripciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCliente: datos.nombreCliente,
                    correoCliente: datos.correoCliente,
                    tipo: datos.tipoInscripcion,
                    idTarget: datos.itemId
                })
            });

            if (respuesta.ok) {
                setExito('¡Inscripción registrada correctamente!');
                setDatos({
                    nombreCliente: '',
                    correoCliente: '',
                    tipoInscripcion: 'curso',
                    itemId: ''
                });
                if (onSubmit) onSubmit(datos);
            } else {
                setError('Hubo un problema al procesar la inscripción en el servidor.');
            }
        } catch (err) {
            console.error('Error enviando inscripción:', err);
            setError('No se pudo conectar con el servidor backend.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form
            onSubmit={verificarYEnviar}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                maxWidth: 420
            }}
        >
            {error && (
                <p role="alert" style={{ color: '#b00020' }}>
                    {error}
                </p>
            )}

            {exito && (
                <p role="status" style={{ color: '#2e7d32' }}>
                    {exito}
                </p>
            )}

            <label htmlFor="inscripcion-nombre">
                Nombre completo *
            </label>
            <input
                id="inscripcion-nombre"
                name="nombreCliente"
                required
                value={datos.nombreCliente}
                onChange={cambiar}
            />

            <label htmlFor="inscripcion-correo">
                Correo electrónico *
            </label>
            <input
                id="inscripcion-correo"
                name="correoCliente"
                type="email"
                required
                value={datos.correoCliente}
                onChange={cambiar}
            />

            <label htmlFor="inscripcion-tipo">
                Tipo de inscripción
            </label>
            <select
                id="inscripcion-tipo"
                name="tipoInscripcion"
                value={datos.tipoInscripcion}
                onChange={cambiar}
            >
                <option value="curso">Curso</option>
                <option value="rutina">Rutina</option>
            </select>

            <label htmlFor="inscripcion-opcion">
                Seleccionar opción *
            </label>
            <select
                id="inscripcion-opcion"
                name="itemId"
                required
                value={datos.itemId}
                onChange={cambiar}
                disabled={cargandoLista}
            >
                <option value="">
                    {cargandoLista ? 'Cargando opciones...' : 'Seleccione...'}
                </option>
                {opciones.map((item) => {
                    const idVal = item.id || item.idCurso || item.idRutina;
                    const nombreVal = item.nombre || item.descripcion || `${datos.tipoInscripcion === 'curso' ? 'Curso' : 'Rutina'} ${idVal}`;
                    return (
                        <option key={idVal} value={idVal}>
                            {nombreVal}
                        </option>
                    );
                })}
            </select>

            <button type="submit" disabled={enviando || cargandoLista}>
                {enviando ? 'Procesando...' : 'Completar inscripción'}
            </button>
        </form>
    );
}