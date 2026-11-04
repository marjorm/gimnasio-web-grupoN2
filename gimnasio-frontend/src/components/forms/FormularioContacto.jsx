import { useState } from 'react';
import { esEmailValido, esRequerido } from '../../validaciones';

export default function FormularioContacto() {
    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const [errores, setErrores] = useState({});
    const [aviso, setAviso] = useState('');
    const [cargando, setCargando] = useState(false);

    const cambiar = (evento) => {
        const { name, value } = evento.target;

        setDatos((anterior) => ({
            ...anterior,
            [name]: value
        }));

        setAviso('');
        setErrores((anterior) => ({
            ...anterior,
            [name]: undefined
        }));
    };

    const verificar = async (evento) => {
        evento.preventDefault();

        const encontrados = {};

        if (!esRequerido(datos.nombre)) {
            encontrados.nombre = 'Indique su nombre.';
        }

        if (!esEmailValido(datos.email)) {
            encontrados.email = 'Indique un correo válido.';
        }

        if (!esRequerido(datos.mensaje)) {
            encontrados.mensaje = 'Escriba un mensaje.';
        }

        setErrores(encontrados);

        if (Object.keys(encontrados).length > 0) {
            setAviso('');
            return;
        }

        setCargando(true);
        setAviso('');

        try {
            const respuesta = await fetch('http://localhost:8080/api/contactos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            if (respuesta.ok) {
                setAviso('¡Su mensaje ha sido enviado correctamente!');
                setDatos({ nombre: '', email: '', mensaje: '' });
                setErrores({});
            } else {
                setAviso('Hubo un error al procesar el mensaje en el servidor.');
            }
        } catch (error) {
            console.error('Error al conectar:', error);
            setAviso('No se pudo conectar con el servidor backend.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <form
            onSubmit={verificar}
            style={{
                maxWidth: 420,
                display: 'flex',
                flexDirection: 'column',
                gap: 12
            }}
        >
            {aviso && <p role="status">{aviso}</p>}

            <label htmlFor="contacto-nombre">Nombre *</label>
            <input
                id="contacto-nombre"
                name="nombre"
                required
                value={datos.nombre}
                onChange={cambiar}
            />
            {errores.nombre && (
                <small role="alert">{errores.nombre}</small>
            )}

            <label htmlFor="contacto-email">Correo *</label>
            <input
                id="contacto-email"
                name="email"
                type="email"
                required
                value={datos.email}
                onChange={cambiar}
            />
            {errores.email && (
                <small role="alert">{errores.email}</small>
            )}

            <label htmlFor="contacto-mensaje">Mensaje *</label>
            <textarea
                id="contacto-mensaje"
                name="mensaje"
                required
                rows={5}
                value={datos.mensaje}
                onChange={cambiar}
            />
            {errores.mensaje && (
                <small role="alert">{errores.mensaje}</small>
            )}

            <button type="submit" disabled={cargando}>
                {cargando ? 'Enviando...' : 'Enviar mensaje'}
            </button>
        </form>
    );
}