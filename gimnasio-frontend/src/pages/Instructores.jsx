import { useState, useEffect } from 'react';
import { instructorService } from '../services/instructorService';
import MensajeEstado from '../components/ui/MensajeEstado';
import ListaDatos from '../components/ui/ListaDatos';
import Tarjeta from '../components/ui/Tarjeta';

export default function Instructores() {
    const [instructores, setInstructores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar los instructores al montar el componente
    useEffect(() => {
        const cargarInstructores = async () => {
            try {
                setLoading(true);
                const data = await instructorService.obtenerTodos();
                setInstructores(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error('Error al cargar instructores:', err);
                setError('No se pudieron cargar los instructores desde el servidor. Comprueba la conexión.');
            } finally {
                setLoading(false);
            }
        };

        cargarInstructores();
    }, []);

    // Arreglo de imágenes estáticas secundarias para mantener la estética del diseño visual
    const imagenesInstructores = ['/img/instructor1.svg', '/img/instructor2.svg', '/img/instructor3.svg'];

    return (
        <div>
            <section>
                <h2>Instructores</h2>
                <p className="intro-seccion">
                    Conoce al equipo de instructores y sus principales áreas de acompañamiento obtenidas del sistema.
                </p>

                {/* Manejo de estados de carga, error o lista vacía */}
                <MensajeEstado
                    loading={loading}
                    error={error}
                    mensajeVacio="No hay instructores registrados en este momento."
                    datosCount={instructores.length}
                />

                {}
                <div className="instructores-grid" style={{ marginTop: '20px' }}>
                    <ListaDatos
                        items={instructores}
                        renderItem={(instructor, index) => {
                            const idVal = instructor.id || instructor.idInstructor;
                            const nombreInstructor = instructor.nombre
                                ? `${instructor.nombre} ${instructor.apellido || ''}`.trim()
                                : `Instructor ID: ${idVal}`;

                            const imagenActual = imagenesInstructores[index % imagenesInstructores.length];

                            return (
                                <div className="instructor-card" key={idVal}>
                                    <Tarjeta titulo={nombreInstructor}>
                                        {/* Imagen estática rotativa de respaldo para conservar el diseño visual */}
                                        <img
                                            src={instructor.imagenUrl || imagenActual}
                                            alt={`Ilustración de ${nombreInstructor}`}
                                            style={{
                                                width: '100%',
                                                height: '140px',
                                                objectFit: 'contain',
                                                borderRadius: '4px',
                                                marginBottom: '10px'
                                            }}
                                        />
                                        <p><strong>ID:</strong> {idVal}</p>
                                        <p><strong>Especialidad:</strong> {instructor.especialidad || 'Acompañamiento general'}</p>
                                        {instructor.correo && <p><strong>Correo:</strong> {instructor.correo}</p>}
                                        {instructor.telefono && <p><strong>Teléfono:</strong> {instructor.telefono}</p>}
                                    </Tarjeta>
                                </div>
                            );
                        }}
                    />
                </div>
            </section>

            <aside className="nota-informativa" style={{ marginTop: '30px' }}>
                <h2>Acompañamiento</h2>
                <p>Nuestros instructores orientan a los clientes según sus objetivos, nivel de experiencia y tipo de entrenamiento.</p>
            </aside>
        </div>
    );
}