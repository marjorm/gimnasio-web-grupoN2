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

    const verificar = (evento) => {
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

        setAviso(
            'Los datos fueron validados. El mensaje NO se ha enviado ' +
            'porque todavía no existe un servicio de contacto.'
        );
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

            <button type="submit">
                Verificar mensaje
            </button>

            <small>
                El formulario no envía mensajes todavía.
            </small>
        </form>
    );
}