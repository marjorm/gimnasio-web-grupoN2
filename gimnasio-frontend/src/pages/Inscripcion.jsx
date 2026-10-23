import { useEffect, useState } from 'react';
import FormularioInscripcion from '../components/forms/FormularioInscripcion';
import { cursoService } from '../services/cursoService';
import { rutinaService } from '../services/rutinaService';

export default function Inscripcion() {
    const [cursos, setCursos] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        let activo = true;

        Promise.all([
            cursoService.obtenerTodos(),
            rutinaService.obtenerTodas()
        ])
            .then(([listaCursos, listaRutinas]) => {
                if (!activo) return;

                setCursos(Array.isArray(listaCursos) ? listaCursos : []);
                setRutinas(Array.isArray(listaRutinas) ? listaRutinas : []);
            })
            .catch(() => {
                if (activo) {
                    setError(
                        'No se pudieron cargar cursos y rutinas. Verifique el servidor.'
                    );
                }
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, []);

    const verificarInscripcion = () => {
        setMensaje(
            'Los datos del formulario son válidos, pero NO se registró ' +
            'ninguna inscripción. El servicio de inscripciones del backend ' +
            'todavía no está implementado.'
        );
    };

    return (
        <section style={{ padding: 20 }}>
            <h2>Inscripción a cursos y rutinas</h2>

            <p>
                Esta sección permite revisar los datos de una solicitud.
                Actualmente no registra inscripciones.
            </p>

            {cargando && <p>Cargando opciones...</p>}

            {error && (
                <p role="alert" style={{ color: '#b00020' }}>
                    {error}
                </p>
            )}

            {mensaje && (
                <p role="status">{mensaje}</p>
            )}

            {!cargando && !error && (
                <FormularioInscripcion
                    cursos={cursos}
                    rutinas={rutinas}
                    onSubmit={verificarInscripcion}
                />
            )}
        </section>
    );
}