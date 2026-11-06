import { useState, useEffect } from 'react';
import { rutinaService } from '../services/rutinaService';
import { useAuth } from '../context/auth.js';
import MensajeEstado from '../components/ui/MensajeEstado';

export default function Rutinas() {
    const { usuario } = useAuth();
    const rol = usuario?.rol;
    const [rutinas, setRutinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!rol) return;
        const cargarMisRutinas = async () => {
            try {
                setLoading(true);
                const dataRutinas = rol === 'CLIENTE'
                    ? await rutinaService.obtenerMisRutinas()
                    : await rutinaService.obtenerTodas();
                setRutinas(Array.isArray(dataRutinas) ? dataRutinas : []);
                setError(null);
            } catch (err) {
                console.error('Error al cargar rutinas:', err);
                setError('No se pudieron cargar sus rutinas desde el servidor. Comprueba la conexión.');
            } finally {
                setLoading(false);
            }
        };

        cargarMisRutinas();
    }, [rol]);

    return (
        <div>
            <section>
                <h2>{rol === 'CLIENTE' ? 'Mis rutinas personalizadas' : 'Rutinas registradas'}</h2>
                <p className="intro-seccion">
                    Aquí puedes consultar el detalle de las rutinas que te han sido asignadas en el gimnasio.
                </p>
            </section>

            <section aria-labelledby="rutinas-asignadas">
                <h2 id="rutinas-asignadas">Rutinas asignadas</h2>

                <MensajeEstado
                    loading={loading}
                    error={error}
                    mensajeVacio="No tienes rutinas registradas en este momento."
                    datosCount={rutinas.length}
                />

                {!loading && !error && rutinas.length > 0 && (
                    <div className="tabla-responsive" style={{ marginTop: '20px' }}>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Instructor</th>
                                <th>Máquina ID</th>
                                <th>Fecha</th>
                                <th>Duración</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rutinas.map((r) => {
                                const idVal = r.id || r.idRutina;

                                const nombreInstructor = r.instructor
                                    ? `${r.instructor.nombre || ''} ${r.instructor.apellido1 || r.instructor.apellido || ''}`.trim()
                                    : 'Sin asignar';

                                const maquinaVal = typeof r.maquina === 'object'
                                    ? (r.maquina?.id || r.maquina?.nombre || 'General')
                                    : (r.maquina || r.maquinaId || 'General');

                                const fechaVal = r.fecha_Rutina || r.fechaRutina || r.fecha || 'N/A';
                                const horasVal = r.horas ? `${r.horas} hora(s)` : 'No especificada';

                                return (
                                    <tr key={idVal}>
                                        <td><strong>{idVal}</strong></td>
                                        <td>{nombreInstructor}</td>
                                        <td>{maquinaVal}</td>
                                        <td>{fechaVal}</td>
                                        <td>{horasVal}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <aside className="nota-informativa" style={{ marginTop: '30px' }}>
                <h2>Recomendaciones</h2>
                <p>Las rutinas se asignan de acuerdo con tus objetivos personales. Sigue las instrucciones de tu instructor y mantén una buena hidratación.</p>
            </aside>
        </div>
    );
}