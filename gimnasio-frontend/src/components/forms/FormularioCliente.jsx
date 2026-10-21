import React, { useState, useEffect } from 'react';
import { validarFormularioCliente } from '../../utils/validaciones';

const FormularioCliente = ({ clienteInicial, onSubmit, onCancelar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        ...clienteInicial
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (clienteInicial) {
            setFormData({
                nombre: clienteInicial.nombre || '',
                correo: clienteInicial.correo || '',
                telefono: clienteInicial.telefono || ''
            });
        }
    }, [clienteInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validaciones = validarFormularioCliente(formData);
        if (Object.keys(validaciones).length > 0) {
            setErrores(validaciones);
            return;
        }

        setErrores({});
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>{clienteInicial?.id ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>

            <div style={styles.campo}>
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                {errores.nombre && <span style={styles.error}>{errores.nombre}</span>}
            </div>

            <div style={styles.campo}>
                <label htmlFor="correo">Correo Electrónico *</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                />
                {errores.correo && <span style={styles.error}>{errores.correo}</span>}
            </div>

            <div style={styles.campo}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
                {errores.telefono && <span style={styles.error}>{errores.telefono}</span>}
            </div>

            <div style={styles.botones}>
                <button type="submit" style={styles.btnGuardar}>Guardar</button>
                {onCancelar && (
                    <button type="button" onClick={onCancelar} style={styles.btnCancelar}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

const styles = {
    form: { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' },
    campo: { display: 'flex', flexDirection: 'column', gap: '5px' },
    error: { color: 'red', fontSize: '0.85rem' },
    botones: { display: 'flex', gap: '10px' },
    btnGuardar: { padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' },
    btnCancelar: { padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }
};

export default FormularioCliente;