import { useEffect, useState } from 'react';
import FormularioCliente from '../components/forms/FormularioCliente';
import ModalConfirmacion from '../components/ui/ModalConfirmacion';
import { clienteService } from '../services/clienteService';

export default function Mantenimiento() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [clienteEditar, setClienteEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [clienteEliminar, setClienteEliminar] = useState(null);

    useEffect(() => {
        let activo = true;

        clienteService.obtenerTodos()
            .then((datos) => {
                if (activo) {
                    setClientes(Array.isArray(datos) ? datos : []);
                }
            })
            .catch(() => {
                if (activo) {
                    setError('No se pudieron cargar los clientes.');
                }
            })
            .finally(() => {
                if (activo) {
                    setCargando(false);
                }
            });

        return () => {
            activo = false;
        };
    }, []);

    const recargar = async () => {
        const datos = await clienteService.obtenerTodos();

        setClientes(Array.isArray(datos) ? datos : []);
    };

    const guardar = async (datos) => {
        try {
            setError('');

            if (clienteEditar) {
                await clienteService.actualizarCliente(
                    clienteEditar.id,
                    datos
                );
            } else {
                await clienteService.guardarCliente(datos);
            }

            setMostrarFormulario(false);
            setClienteEditar(null);
            await recargar();

        } catch {
            setError(
                'No se pudo completar la operación. Verifique los datos y el servidor.'
            );
        }
    };

    const eliminar = async () => {
        if (!clienteEliminar) {
            return;
        }

        try {
            setError('');

            await clienteService.eliminarCliente(clienteEliminar.id);
            await recargar();

        } catch {
            setError('No se pudo eliminar el cliente.');

        } finally {
            setClienteEliminar(null);
        }
    };

    return (
        <section style={{ padding: 20 }}>
            <h2>Mantenimiento de clientes</h2>

            {error && (
                <p role="alert" style={{ color: '#b00020' }}>
                    {error}
                </p>
            )}

            {mostrarFormulario ? (
                <FormularioCliente
                    key={clienteEditar?.id ?? 'nuevo'}
                    clienteInicial={clienteEditar}
                    onSubmit={guardar}
                    onCancelar={() => {
                        setMostrarFormulario(false);
                        setClienteEditar(null);
                    }}
                />
            ) : (
                <>
                    <button
                        type="button"
                        onClick={() => {
                            setClienteEditar(null);
                            setMostrarFormulario(true);
                        }}
                    >
                        Nuevo cliente
                    </button>

                    {cargando ? (
                        <p>Cargando clientes...</p>
                    ) : (
                        <table
                            style={{
                                width: '100%',
                                marginTop: 16
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {clientes.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>
                                            {c.nombre} {c.apellido1} {c.apellido2}
                                        </td>
                                        <td>{c.eMail ?? c.email ?? ''}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setClienteEditar(c);
                                                    setMostrarFormulario(true);
                                                }}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setClienteEliminar(c);
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {clientes.length === 0 && !error && (
                                    <tr>
                                        <td colSpan="4">
                                            No hay clientes registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </>
            )}

            <ModalConfirmacion
                isOpen={Boolean(clienteEliminar)}
                titulo="Eliminar cliente"
                mensaje={`¿Eliminar a ${clienteEliminar?.nombre ?? ''}?`}
                onConfirm={eliminar}
                onCancel={() => setClienteEliminar(null)}
            />
        </section>
    );
}