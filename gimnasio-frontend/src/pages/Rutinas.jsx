import { useState, useEffect } from 'react';
import { rutinaService } from '../services/rutinaService';
import MensajeEstado from '../components/ui/MensajeEstado';

export default function Rutinas() {
    const [rutinas, setRutinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMisRutinas = async () => {
            try {
                setLoading(true);
                const dataRutinas = await rutinaService.obtenerMisRutinas();
                setRutinas(dataRutinas);
                setError(null);
            } catch (err) {
                setError('No se pudieron cargar sus rutinas desde el servidor.');
            } finally {
                setLoading(false);
            }
        };

        cargarMisRutinas();
    }, []);

    return (
        <div>
            <section>
                <h2>Mis rutinas personalizadas</h2>
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
                    <div className="tabla-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Instructor</th>
                                    <th>Máquina ID</th>
                                    <th>Fecha</th>
                                    <th>Duración (Horas)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rutinas.map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.id}</td>
                                        <td>
                                            {r.instructor?.nombre} {r.instructor?.apellido1}
                                        </td>
                                        <td>{r.maquina}</td>
                                        <td>{r.fecha_Rutina}</td>
                                        <td>{r.horas} hora(s)</td>
                                    </tr>
                                ))}
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