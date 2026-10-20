import { useState, useEffect } from 'react';
import { maquinaService } from '../services/maquinaService';
import MensajeEstado from '../components/ui/MensajeEstado';
import ListaDatos from '../components/ui/ListaDatos';
import Tarjeta from '../components/ui/Tarjeta';

export default function Maquinas() {
    const [maquinas, setMaquinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar las máquinas al montar el componente
    useEffect(() => {
        const cargarMaquinas = async () => {
            try {
                setLoading(true);
                const data = await maquinaService.obtenerTodas();
                setMaquinas(data);
                setError(null);
            } catch (err) {
                setError('No se pudieron cargar las máquinas desde el servidor. Comprueba la conexión.');
            } finally {
                setLoading(false);
            }
        };

        cargarMaquinas();
    }, []);

    return (
        <main>
            <section>
                <h2>Máquinas del gimnasio</h2>
                <p>Conoce los equipos disponibles para entrenamiento cardiovascular, fuerza y acondicionamiento actualizados desde el sistema.</p>

                {/* Manejo de estados de carga, error o lista vacía */}
                <MensajeEstado 
                    loading={loading} 
                    error={error} 
                    mensajeVacio="No hay máquinas registradas en este momento." 
                    datosCount={maquinas.length} 
                />

                {/* Renderizado de la lista de máquinas mediante componentes */}
                <ListaDatos 
                    items={maquinas} 
                    renderItem={(maquina) => (
                        <Tarjeta titulo={`Máquina: ${maquina.descripcion}`}>
                            <p><strong>ID:</strong> {maquina.id}</p>
                            <p><strong>Estado:</strong> {maquina.estado || 'Disponible'}</p>
                        </Tarjeta>
                    )}
                />
            </section>

            <aside className="nota-informativa" style={{ marginTop: '30px' }}>
                <h2>Uso de equipos</h2>
                <p>Solicita orientación a un instructor antes de utilizar una máquina que no conozcas para evitar lesiones y asegurar un buen uso.</p>
            </aside>
        </main>
    );
}