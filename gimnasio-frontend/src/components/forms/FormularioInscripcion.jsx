import { useState } from 'react';
import { esEmailValido, esRequerido } from '../../validaciones';

export default function FormularioInscripcion({
    cursos = [],
    rutinas = [],
    onSubmit
}) {
    const [datos, setDatos] = useState({
        nombreCliente: '',
        correoCliente: '',
        tipoInscripcion: 'curso',
        itemId: ''
    });

    const [error, setError] = useState('');

    const opciones = datos.tipoInscripcion === 'curso'
        ? cursos
        : rutinas;

    const cambiar = (evento) => {
        const { name, value } = evento.target;

        setDatos((anterior) => ({
            ...anterior,
            [name]: value,
            ...(name === 'tipoInscripcion' ? { itemId: '' } : {})
        }));

        setError('');
    };

    const verificar = (evento) => {
        evento.preventDefault();

        if (
            !esRequerido(datos.nombreCliente) ||
            !esEmailValido(datos.correoCliente) ||
            !esRequerido(datos.itemId)
        ) {
            setError('Complete el nombre, correo válido y opción.');
            return;
        }

        const seleccionValida = opciones.some(
            (item) => String(item.id) === String(datos.itemId)
        );

        if (!seleccionValida) {
            setError('Seleccione una opción válida de la lista.');
            return;
        }

        setError('');
        onSubmit(datos);
    };

    return (
        <form
            onSubmit={verificar}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                maxWidth: 420
            }}
        >
            {error && (
                <p role="alert" style={{ color: '#b00020' }}>
                    {error}
                </p>
            )}

            <label htmlFor="inscripcion-nombre">
                Nombre completo *
            </label>
            <input
                id="inscripcion-nombre"
                name="nombreCliente"
                required
                value={datos.nombreCliente}
                onChange={cambiar}
            />

            <label htmlFor="inscripcion-correo">
                Correo electrónico *
            </label>
            <input
                id="inscripcion-correo"
                name="correoCliente"
                type="email"
                required
                value={datos.correoCliente}
                onChange={cambiar}
            />

            <label htmlFor="inscripcion-tipo">
                Tipo de inscripción
            </label>
            <select
                id="inscripcion-tipo"
                name="tipoInscripcion"
                value={datos.tipoInscripcion}
                onChange={cambiar}
            >
                <option value="curso">Curso</option>
                <option value="rutina">Rutina</option>
            </select>

            <label htmlFor="inscripcion-opcion">
                Seleccionar opción *
            </label>
            <select
                id="inscripcion-opcion"
                name="itemId"
                required
                value={datos.itemId}
                onChange={cambiar}
            >
                <option value="">Seleccione...</option>
                {opciones.map((item) => (
                    <option key={item.id} value={item.id}>
                        {datos.tipoInscripcion === 'curso'
                            ? item.descripcion || `Curso ${item.id}`
                            : `Rutina ${item.id}`}
                    </option>
                ))}
            </select>

            <button type="submit">
                Verificar datos
            </button>

            <small>
                Esta verificación no guarda ni envía una inscripción.
            </small>
        </form>
    );
}