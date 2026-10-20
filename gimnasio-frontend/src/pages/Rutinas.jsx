import { useState, useEffect } from 'react';
import { rutinaService } from '../services/rutinaService';
import { clienteService } from '../services/clienteService';
import MensajeEstado from '../components/ui/MensajeEstado';

export default function Rutinas() {
    const [rutinas, setRutinas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar clientes y rutinas al iniciar
    useEffect(() => {
        const cargarDatosIniciales = async () => {
            try {
                setLoading(true);
                const [dataRutinas, dataClientes] = await Promise.all([
                    rutinaService.obtenerTodas(),
                    clienteService.obtenerTodos()
                ]);
                setRutinas(dataRutinas);
                setClientes(dataClientes);
                setError(null);
            } catch (err) {
                setError('No se pudieron cargar las rutinas desde el servidor.');
            } finally {
                setLoading(false);
            }
        };

        cargarDatosIniciales();
    }, []);

    // Filtrar rutinas según el cliente seleccionado (Simulando el acceso por usuario)
    const rutinasFiltradas = clienteSeleccionado 
        ? rutinas.filter(r => r.cliente?.id === Number(clienteSeleccionado) || r.clienteId === Number(clienteSeleccionado))
        : rutinas;

    return (
        <main>
            <section>
                <h2>Consulta de rutinas personalizadas</h2>
                <p className="intro-seccion">
                    <em>Nota de desarrollo:</em> Selecciona un cliente para simular su vista de rutinas asignadas.
                </p>

                {/* Selector temporal para simular el inicio de sesión del cliente */}
                <div style={{ marginBottom: '20px', padding: '15px', background: '#f4f6f9', borderRadius: '8px' }}>
                    <label htmlFor="select-cliente" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                        Simular cliente (Cédula):
                    </label>
                    <select 
                        id="select-cliente"
                        value={clienteSeleccionado} 
                        onChange={(e) => setClienteSeleccionado(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">-- Ver todas las rutinas --</option>
                        {clientes.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.id} - {c.nombre} {c.apellido}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <section aria-labelledby="rutinas-asignadas">
                <h2 id="rutinas-asignadas">Rutinas asignadas</h2>

                <MensajeEstado 
                    loading={loading} 
                    error={error} 
                    mensajeVacio="No hay rutinas registradas para este cliente." 
                    datosCount={rutinasFiltradas.length} 
                />

                {!loading && !error && rutinasFiltradas.length > 0 && (
                    <div className="tabla-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Instructor</th>
                                    <th>Máquina ID</th>
                                    <th>Fecha</th>
                                    <th>Duración (Horas)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rutinasFiltradas.map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.id}</td>
                                        <td>
                                            {r.cliente?.nombre} {r.cliente?.apellido1} ({r.cliente?.id})
                                        </td>
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
                <h2>Rutinas personalizadas</h2>
                <p>Las rutinas se asignan de acuerdo con los objetivos y necesidades específicas de cada cliente inscrito.</p>
            </aside>
        </main>
    );
}