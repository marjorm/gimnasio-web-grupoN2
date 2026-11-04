import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursoService } from '../services/cursoService';
import MensajeEstado from '../components/ui/MensajeEstado';
import ListaDatos from '../components/ui/ListaDatos';
import Tarjeta from '../components/ui/Tarjeta';

export default function Cursos() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarCursos = async () => {
            try {
                setLoading(true);
                const data = await cursoService.obtenerTodos();
                setCursos(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error('Error al cargar cursos:', err);
                setError('No se pudieron cargar los cursos desde el servidor. Comprueba la conexión.');
            } finally {
                setLoading(false);
            }
        };

        cargarCursos();
    }, []);

    const irAInscripcion = (cursoId) => {
        navigate('/inscripcion', { state: { cursoSeleccionado: cursoId } });
    };

    return (
        <div>
            <section>
                <h2>Cursos disponibles</h2>
                <p className="intro-seccion">Consulta nuestra oferta de cursos actualizados desde el sistema.</p>

                <MensajeEstado
                    loading={loading}
                    error={error}
                    mensajeVacio="No hay cursos registrados en este momento."
                    datosCount={cursos.length}
                />

                {}
                <div className="cursos-grid">
                    <ListaDatos
                        items={cursos}
                        renderItem={(curso) => {
                            const idVal = curso.id || curso.idCurso;
                            const tituloCurso = curso.nombre || `Curso ID: ${idVal}`;

                            return (
                                <div className="curso-card" key={idVal}>
                                    <Tarjeta titulo={tituloCurso}>
                                        <p><strong>Descripción:</strong> {curso.descripcion || 'Sin descripción.'}</p>
                                        {curso.horario && <p><strong>Horario:</strong> {curso.horario}</p>}
                                        {curso.cupo !== undefined && <p><strong>Cupos disponibles:</strong> {curso.cupo}</p>}
                                        {curso.precio !== undefined && <p><strong>Precio:</strong> ₡{curso.precio}</p>}

                                        <button
                                            type="button"
                                            onClick={() => irAInscripcion(idVal)}
                                            style={{
                                                marginTop: 10,
                                                padding: '6px 12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Inscribirme a este curso
                                        </button>
                                    </Tarjeta>
                                </div>
                            );
                        }}
                    />
                </div>
            </section>

            <aside className="nota-informativa" style={{ marginTop: '30px' }}>
                <h2>Disponibilidad</h2>
                <p>Los cupos y horarios pueden variar según la programación académica y la cantidad de personas inscritas.</p>
            </aside>
        </div>
    );
}