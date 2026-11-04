import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [usuarioInput, setUsuarioInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            // Llama a la función login del AuthContext que actualiza el estado global
            const res = await login(usuarioInput, passwordInput);

            if (res && res.success) {
                const usuarioSesion = JSON.parse(localStorage.getItem('usuario') || '{}');
                const rol = (usuarioSesion.rol || 'ADMIN').toUpperCase();

                if (rol === 'ADMIN' || rol === 'ADMINISTRADOR') {
                    navigate('/mantenimiento', { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } else {
                setError(res?.message || 'Usuario o contraseña incorrectos.');
            }
        } catch (err) {
            console.error('Error durante el inicio de sesión:', err);
            setError('Ocurrió un error inesperado al procesar la solicitud.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <section aria-labelledby="titulo-login">
                <h2 id="titulo-login">Acceso al gimnasio</h2>

                {error && <p style={{ color: '#b00020', fontWeight: 'bold' }} role="alert">{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '20px 0' }}>
                    <div>
                        <label htmlFor="username">Usuario: </label>
                        <input
                            id="username"
                            type="text"
                            value={usuarioInput}
                            onChange={(e) => setUsuarioInput(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Contraseña: </label>
                        <input
                            id="password"
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={cargando}>
                        {cargando ? 'Ingresando...' : 'Entrar'}
                    </button>
                </form>

                <p>
                    <Link to="/">Volver al inicio</Link>
                </p>
            </section>
        </div>
    );
}