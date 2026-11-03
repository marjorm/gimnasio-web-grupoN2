import { useState } from 'react';
import { validarFormularioCliente } from '../../validaciones';

const fechaHoy = () =>
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString().slice(0, 10);

export default function FormularioCliente({
    clienteInicial,
    onSubmit,
    onCancelar
}) {
    const editando = Boolean(clienteInicial);

    const [datos, setDatos] = useState(() => ({
        id: String(clienteInicial?.id ?? ''),
        username: String(clienteInicial?.username ?? ''),       //  Campo de usuario
        passwordHash: String(clienteInicial?.passwordHash ?? ''), //  Campo de contraseña
        rol: 'CLIENTE',                                           //  Rol por defecto
        nombre: clienteInicial?.nombre ?? '',
        apellido1: clienteInicial?.apellido1 ?? '',
        apellido2: clienteInicial?.apellido2 ?? '',
        direccion: clienteInicial?.direccion ?? '',
        eMail: clienteInicial?.eMail ?? clienteInicial?.email ?? '',
        fechaInscripcion: clienteInicial?.fechaInscripcion ?? fechaHoy(),
        celular: String(clienteInicial?.celular ?? ''),
        telHabitacion: String(clienteInicial?.telHabitacion ?? '')
    }));

    const [errores, setErrores] = useState({});
    const [guardando, setGuardando] = useState(false);

    const campos = [
        { id: 'id', nombre: 'Cédula', requerido: true },
        // Solo requerimos username y password si es un nuevo registro
        { id: 'username', nombre: 'Nombre de usuario (Login)', requerido: !editando },
        { id: 'passwordHash', nombre: 'Contraseña', tipo: 'password', requerido: !editando },
        { id: 'nombre', nombre: 'Nombre', requerido: true },
        { id: 'apellido1', nombre: 'Primer apellido', requerido: true },
        { id: 'apellido2', nombre: 'Segundo apellido', requerido: true },
        { id: 'direccion', nombre: 'Dirección' },
        { id: 'eMail', nombre: 'Correo electrónico', tipo: 'email' },
        {
            id: 'fechaInscripcion',
            nombre: 'Fecha de inscripción',
            tipo: 'date',
            requerido: true
        },
        { id: 'celular', nombre: 'Celular', requerido: true },
        {
            id: 'telHabitacion',
            nombre: 'Teléfono habitación',
            requerido: true
        }
    ];

    const guardar = async (evento) => {
        evento.preventDefault();

        const encontrados = validarFormularioCliente(datos);
        setErrores(encontrados);

        if (Object.keys(encontrados).length > 0) {
            return;
        }

        const payload = {
            ...datos,
            id: Number(datos.id),
            username: datos.username ? datos.username.trim() : '',
            passwordHash: datos.passwordHash ? datos.passwordHash : '',
            rol: 'CLIENTE',
            nombre: datos.nombre.trim(),
            apellido1: datos.apellido1.trim(),
            apellido2: datos.apellido2.trim(),
            eMail: datos.eMail.trim() || null,
            celular: Number(datos.celular),
            telHabitacion: Number(datos.telHabitacion)
        };

        setGuardando(true);

        try {
            await onSubmit(payload);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <form onSubmit={guardar} style={{ maxWidth: 480 }}>
            <h3>
                {editando ? 'Editar cliente' : 'Nuevo cliente'}
            </h3>

            {campos.map((campo) => (
                <div
                    key={campo.id}
                    style={{ marginBottom: 12 }}
                >
                    <label htmlFor={`cliente-${campo.id}`}>
                        {campo.nombre}
                        {campo.requerido ? ' *' : ''}
                    </label>

                    <input
                        id={`cliente-${campo.id}`}
                        type={campo.tipo || 'text'}
                        required={Boolean(campo.requerido)}
                        disabled={
                            guardando ||
                            (editando && (campo.id === 'id' || campo.id === 'username')) // Bloquear id y username si estamos editando
                        }
                        value={datos[campo.id]}
                        onChange={(e) => {
                            setDatos((prev) => ({
                                ...prev,
                                [campo.id]: e.target.value
                            }));

                            setErrores((prev) => ({
                                ...prev,
                                [campo.id]: undefined
                            }));
                        }}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: 8
                        }}
                    />

                    {errores[campo.id] && (
                        <small style={{ color: '#b00020' }}>
                            {errores[campo.id]}
                        </small>
                    )}
                </div>
            ))}

            <button
                type="submit"
                disabled={guardando}
            >
                {guardando ? 'Guardando...' : 'Guardar cliente'}
            </button>

            <button
                type="button"
                onClick={onCancelar}
                disabled={guardando}
            >
                Cancelar
            </button>
        </form>
    );
}