import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Mantenimiento() {
    const { usuario } = useAuth();
    const usuarioSesion = usuario || JSON.parse(localStorage.getItem('usuario') || '{}');
    const rolActual = (usuarioSesion.rol || usuarioSesion.role || 'ADMIN').toUpperCase();

    const esAutorizado = rolActual === 'ADMIN' || rolActual === 'ADMINISTRADOR' || usuarioSesion.username === 'admin';

    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({ cedula: '', nombre: '', correo: '' });

    // Petición GET limpia a la base de datos
    const cargarClientes = async () => {
        setCargando(true);
        setError('');
        try {
            const res = await fetch('http://localhost:8080/api/clientes');
            if (res.ok) {
                const data = await res.json();
                setClientes(data);
            } else {
                setError('No se pudo conectar con el endpoint /api/clientes.');
            }
        } catch (err) {
            console.error('Error al obtener clientes desde MySQL:', err);
            setError('Error de conexión con el backend en el puerto 8080.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (esAutorizado) {
            cargarClientes();
        }
    }, [esAutorizado]);

    if (!esAutorizado) {
        return (
            <section style={{ padding: '20px' }}>
                <h2>Mantenimiento de clientes</h2>
                <p style={{ color: '#b00020', fontWeight: 'bold' }}>
                    No autorizado. Debe iniciar sesión con el rol correcto.
                </p>
            </section>
        );
    }

    // Petición POST pura a MySQL
    const handleGuardar = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCliente)
            });

            if (res.ok) {
                setNuevoCliente({ cedula: '', nombre: '', correo: '' });
                setMostrarFormulario(false);
                cargarClientes(); // Recarga la lista desde la BD
            } else {
                setError('Error al insertar el cliente en la base de datos.');
            }
        } catch (err) {
            console.error('Error en POST /api/clientes:', err);
            setError('Error de red al guardar.');
        }
    };

    // Petición DELETE pura a MySQL
    const handleEliminar = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/clientes/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                cargarClientes(); // Recarga la lista desde la BD
            } else {
                setError('No se pudo eliminar el registro de la base de datos.');
            }
        } catch (err) {
            console.error('Error en DELETE /api/clientes:', err);
            setError('Error de red al eliminar.');
        }
    };

    return (
        <section style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h2>Mantenimiento de clientes</h2>

            {error && <p style={{ color: '#b00020', fontWeight: 'bold' }}>{error}</p>}

            <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                style={{ marginBottom: '15px', padding: '8px 16px', cursor: 'pointer' }}
            >
                {mostrarFormulario ? 'Cancelar' : 'Nuevo cliente'}
            </button>

            {mostrarFormulario && (
                <form onSubmit={handleGuardar} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Cédula"
                        value={nuevoCliente.cedula}
                        onChange={e => setNuevoCliente({ ...nuevoCliente, cedula: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={nuevoCliente.nombre}
                        onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={nuevoCliente.correo}
                        onChange={e => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
                    />
                    <button type="submit" style={{ cursor: 'pointer' }}>Guardar</button>
                </form>
            )}

            {cargando ? (
                <p>Cargando datos desde la base de datos MySQL...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                    <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
                        <th style={{ padding: '8px' }}>Cédula</th>
                        <th style={{ padding: '8px' }}>Nombre</th>
                        <th style={{ padding: '8px' }}>Correo</th>
                        <th style={{ padding: '8px' }}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ padding: '16px', textAlign: 'center' }}>
                                No hay clientes registrados en la base de datos.
                            </td>
                        </tr>
                    ) : (
                        clientes.map(c => (
                            <tr key={c.id || c.id_cliente || c.cedula} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px' }}>{c.cedula}</td>
                                <td style={{ padding: '8px' }}>{c.nombre}</td>
                                <td style={{ padding: '8px' }}>{c.correo || c.email}</td>
                                <td style={{ padding: '8px' }}>
                                    <button
                                        onClick={() => handleEliminar(c.id || c.id_cliente)}
                                        style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
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
        </section>
    );
}