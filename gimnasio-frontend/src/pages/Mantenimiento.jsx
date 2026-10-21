import React, { useState, useEffect } from 'react';
import FormularioCliente from '../components/forms/FormularioCliente';
import ModalConfirmacion from '../components/ui/ModalConfirmacion';
import {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} from '../services/clienteService';

const Mantenimiento = () => {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [clienteEditar, setClienteEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [clienteAEliminar, setClienteAEliminar] = useState(null);

    const cargarClientes = async () => {
        try {
            setCargando(true);
            setError(null);
            if (obtenerClientes) {
                const data = await obtenerClientes();
                setClientes(data || []);
            }
        } catch (err) {
            setError('No se pudieron cargar los datos de los clientes.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const handleGuardar = async (formData) => {
        try {
            if (clienteEditar && clienteEditar.id) {
                await actualizarCliente(clienteEditar.id, formData);
            } else {
                await crearCliente(formData);
            }
            setMostrarFormulario(false);
            setClienteEditar(null);
            await cargarClientes();
        } catch (err) {
            setError('Ocurrió un error al guardar los datos del cliente.');
        }
    };

    const handleConfirmarEliminar = async () => {
        if (!clienteAEliminar) return;
        try {
            await eliminarCliente(clienteAEliminar.id);
            setClienteAEliminar(null);
            await cargarClientes();
        } catch (err) {
            setError('Ocurrió un error al intentar eliminar el cliente.');
            setClienteAEliminar(null);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Mantenimiento de Clientes</h2>

            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            {!mostrarFormulario ? (
                <>
                    <button
                        onClick={() => { setClienteEditar(null); setMostrarFormulario(true); }}
                        style={{ marginBottom: '15px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
                    >
                        + Nuevo Cliente
                    </button>

                    {cargando ? (
                        <p>Cargando clientes...</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Nombre</th>
                                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Correo</th>
                                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clientes.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                                        No hay clientes registrados.
                                    </td>
                                </tr>
                            ) : (
                                clientes.map((c) => (
                                    <tr key={c.id}>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{c.id}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{c.nombre}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{c.correo}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                            <button
                                                onClick={() => { setClienteEditar(c); setMostrarFormulario(true); }}
                                                style={{ marginRight: '8px', backgroundColor: '#ffc107', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => setClienteAEliminar(c)}
                                                style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    )}
                </>
            ) : (
                <FormularioCliente
                    clienteInicial={clienteEditar}
                    onSubmit={handleGuardar}
                    onCancelar={() => { setMostrarFormulario(false); setClienteEditar(null); }}
                />
            )}

            <ModalConfirmacion
                isOpen={Boolean(clienteAEliminar)}
                titulo="Eliminar Cliente"
                mensaje={`¿Está seguro de que desea eliminar a ${clienteAEliminar?.nombre}?`}
                onConfirm={handleConfirmarEliminar}
                onCancel={() => setClienteAEliminar(null)}
            />
        </div>
    );
};

export default Mantenimiento;