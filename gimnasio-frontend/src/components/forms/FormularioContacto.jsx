import React, { useState } from 'react';
import { esEmailValido, esRequerido } from '../../utils/validaciones';

const FormularioContacto = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let err = {};
        if (!esRequerido(formData.nombre)) err.nombre = 'El nombre es requerido.';
        if (!esRequerido(formData.email) || !esEmailValido(formData.email)) err.email = 'Correo inválido.';
        if (!esRequerido(formData.mensaje)) err.mensaje = 'Escriba un mensaje.';

        if (Object.keys(err).length > 0) {
            setErrores(err);
            return;
        }

        setErrores({});
        setExito(true);
        setFormData({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {exito && <p style={{ color: 'green' }}>¡Mensaje enviado con éxito!</p>}
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} style={{ width: '100%' }} />
                {errores.nombre && <small style={{ color: 'red' }}>{errores.nombre}</small>}
            </div>
            <div>
                <label htmlFor="email">Correo</label>
                <input id="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} />
                {errores.email && <small style={{ color: 'red' }}>{errores.email}</small>}
            </div>
            <div>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} style={{ width: '100%' }} />
                {errores.mensaje && <small style={{ color: 'red' }}>{errores.mensaje}</small>}
            </div>
            <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
                Enviar Mensaje
            </button>
        </form>
    );
};

export default FormularioContacto;