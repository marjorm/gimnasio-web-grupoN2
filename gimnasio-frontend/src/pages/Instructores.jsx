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
                setInstructores(data);
                setError(null);
            } catch {
                setError('No se pudieron cargar los instructores desde el servidor. Comprueba la conexión.');
            } finally {
                setLoading(false);
            }
        };

        cargarInstructores();
    }, []);

    // Arreglo de imagenes estaticas secundarias para mantener la estetica del HTML original
    const imagenesInstructores = ['/img/instructor1.svg', '/img/instructor2.svg', '/img/instructor3.svg'];

    return (
        <div>
            <section>
                <h2>Instructores</h2>
                <p>Conoce al equipo de instructores y sus principales áreas de acompañamiento obtenidas del sistema.</p>

                {/* Manejo de estados de carga, error o lista vacía */}
                <MensajeEstado 
                    loading={loading} 
                    error={error} 
                    mensajeVacio="No hay instructores registrados en este momento." 
                    datosCount={instructores.length} 
                />

                {/* Renderizado de la lista mediante los componentes reutilizables */}
                <ListaDatos 
                    items={instructores} 
                    renderItem={(instructor, index) => (
                        <Tarjeta key={instructor.id} titulo={instructor.nombre}>
                            {/* Imagen estática de respaldo asignada por índice para conservar el diseño visual */}
                            <img 
                               src={imagenesInstructores[index % imagenesInstructores.length]}
                                alt={`Ilustración de ${instructor.nombre}`} 
                                style={{ width: 'auto', height: '140px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
                            />
                            <p><strong>ID:</strong> {instructor.id}</p>
                            <p><strong>Especialidad:</strong> {instructor.especialidad || 'Acompañamiento general'}</p>
                        </Tarjeta>
                    )}
                />
            </section>

            <aside className="nota-informativa" style={{ marginTop: '30px' }}>
                <h2>Acompañamiento</h2>
                <p>Nuestros instructores orientan a los clientes según sus objetivos, nivel de experiencia y tipo de entrenamiento.</p>
            </aside>
        </div>
    );
}