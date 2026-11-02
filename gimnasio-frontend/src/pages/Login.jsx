import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import EstadoSesion from "../components/ui/EstadoSesion.jsx";

export default function Login() {
    const { autenticado, verificando, login } = useAuth();
    const navigate = useNavigate();

    // Estados locales para el formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        const resultado = await login(username, password);
        setCargando(false);

        if (resultado.success) {
            // Redirigir según el rol del usuario que vino de la BD
            // (Puedes personalizar estas rutas según tu estructura)
            navigate('/'); 
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div>
            <section aria-labelledby="titulo-login">
                <h2 id="titulo-login">Acceso al gimnasio</h2>
                <EstadoSesion />

                {verificando ? (
                    <p role="status">Verificando su sesión...</p>
                ) : autenticado ? (
                    <p role="status">Su sesión ya se encuentra activa.</p>
                ) : (
                    <>
                        <p>El acceso a las funciones privadas requiere iniciar sesión.</p>

                        {error && <p style={{ color: 'red' }} role="alert">{error}</p>}

                        {/* Formulario de Acceso */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '20px 0' }}>
                            <div>
                                <label htmlFor="username">Usuario: </label>
                                <input 
                                    id="username"
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="password">Contraseña: </label>
                                <input 
                                    id="password"
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>

                            <button type="submit" disabled={cargando}>
                                {cargando ? 'Ingresando...' : 'Entrar'}
                            </button>
                        </form>
                    </>
                )}

                <p>
                    <Link to="/">Volver al inicio</Link>
                </p>
            </section>
        </div>
    );
}
