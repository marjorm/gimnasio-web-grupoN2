import { useState, useEffect } from 'react';
import { cursoService } from '../services/cursoService';
import MensajeEstado from '../components/ui/MensajeEstado';
import ListaDatos from '../components/ui/ListaDatos';
import Tarjeta from '../components/ui/Tarjeta';

export default function Cursos() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarCursos = async () => {
            try {
                setLoading(true);
                const data = await cursoService.obtenerTodos();
                setCursos(data);
                setError(null);
            } catch {
                setError('No se pudieron cargar los cursos desde el servidor. Comprueba la conexión.');
            } finally {
                setLoading(false);
            }
        };

        cargarCursos();
    }, []);

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

                {/* Contenedor con la clase CSS original de la plantilla para la cuadrícula */}
                <div className="cursos-grid">
                    <ListaDatos 
                        items={cursos} 
                        renderItem={(curso) => (
                            <div className="curso-card">
                                <Tarjeta titulo={`Curso ID: ${curso.id}`}>
                                    <p><strong>Descripción:</strong> {curso.descripcion}</p>
                                </Tarjeta>
                            </div>
                        )}
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