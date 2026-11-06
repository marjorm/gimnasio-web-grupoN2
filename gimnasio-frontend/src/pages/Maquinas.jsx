import { useState, useEffect } from 'react';
import { maquinaService } from '../services/maquinaService';
import MensajeEstado from '../components/ui/MensajeEstado';
import ListaDatos from '../components/ui/ListaDatos';
import Tarjeta from '../components/ui/Tarjeta';

export default function Maquinas() {
    const [maquinas, setMaquinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const cargarMaquinas = async () => {
            try {
                setLoading(true);
                const data = await maquinaService.obtenerTodas();
                setMaquinas(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error('Error al consultar inventario de máquinas:', err);
                setError('No se pudieron cargar las máquinas desde el servidor. Comprueba la conexión.');
            } finally {
                setLoading(false);
            }
        };

        cargarMaquinas();
    }, []);

    return (
        <div>
            <section>
                <h2>Máquinas del gimnasio</h2>
                <p className="intro-seccion">
                    Conoce los equipos disponibles para entrenamiento cardiovascular, fuerza y acondicionamiento actualizados desde el sistema.
                </p>

                {}
                <MensajeEstado
                    loading={loading}
                    error={error}
                    mensajeVacio="No hay máquinas registradas en este momento."
                    datosCount={maquinas.length}
                />

                {}
                <div className="maquinas-grid" style={{ marginTop: '20px' }}>
                    <ListaDatos
                        items={maquinas}
                        renderItem={(maquina) => {
                            const idVal = maquina.id || maquina.idMaquina;
                            const tituloTarjeta = maquina.nombre || maquina.descripcion || `Máquina ID: ${idVal}`;

                            return (
                                <div className="maquina-card" key={idVal}>
                                    <Tarjeta titulo={tituloTarjeta}>
                                        <p><strong>ID:</strong> {idVal}</p>
                                        <p><strong>Estado:</strong> {maquina.estado || 'Disponible'}</p>
                                        {maquina.ubicacion && (
                                            <p><strong>Ubicación:</strong> {maquina.ubicacion}</p>
                                        )}
                                        {maquina.descripcion && maquina.nombre && (
                                            <p><strong>Detalles:</strong> {maquina.descripcion}</p>
                                        )}
                                    </Tarjeta>
                                </div>
                            );
                        }}
                    />
                </div>
            </section>

            <aside className="nota-informativa" style={{ marginTop: '30px' }}>
                <h2>Uso de equipos</h2>
                <p>Solicita orientación a un instructor antes de utilizar una máquina que no conozcas para evitar lesiones y asegurar un buen uso.</p>
            </aside>
        </div>
    );
}