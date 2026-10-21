import React, { useState } from 'react';

const FormularioInscripcion = ({ cursos = [], rutinas = [], onSubmit }) => {
    const [formData, setFormData] = useState({
        nombreCliente: '',
        correoCliente: '',
        tipoInscripcion: 'curso',
        itemId: ''
    });
    const [mensajeError, setMensajeError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombreCliente || !formData.correoCliente || !formData.itemId) {
            setMensajeError('Por favor complete todos los campos obligatorios.');
            return;
        }
        setMensajeError('');
        onSubmit(formData);
    };

    const listaOpciones = formData.tipoInscripcion === 'curso' ? cursos : rutinas;

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
            {mensajeError && <div style={{ color: 'red' }}>{mensajeError}</div>}

            <div>
                <label htmlFor="nombreCliente">Nombre Completo *</label>
                <input id="nombreCliente" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} style={{ width: '100%' }} />
            </div>

            <div>
                <label htmlFor="correoCliente">Correo Electrónico *</label>
                <input id="correoCliente" name="correoCliente" type="email" value={formData.correoCliente} onChange={handleChange} style={{ width: '100%' }} />
            </div>

            <div>
                <label htmlFor="tipoInscripcion">Tipo de Inscripción</label>
                <select id="tipoInscripcion" name="tipoInscripcion" value={formData.tipoInscripcion} onChange={handleChange} style={{ width: '100%' }}>
                    <option value="curso">Curso</option>
                    <option value="rutina">Rutina</option>
                </select>
            </div>

            <div>
                <label htmlFor="itemId">Seleccionar {formData.tipoInscripcion === 'curso' ? 'Curso' : 'Rutina'} *</label>
                <select id="itemId" name="itemId" value={formData.itemId} onChange={handleChange} style={{ width: '100%' }}>
                    <option value="">-- Seleccionar --</option>
                    {listaOpciones.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.nombre || item.titulo || `Opción ${item.id}`}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                Inscribirme
            </button>
        </form>
    );
};

export default FormularioInscripcion;