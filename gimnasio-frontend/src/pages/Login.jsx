import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.js';

export default function Login() {
  const { login, verificando } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [usuarioInput, setUsuarioInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError('');
    setCargando(true);
    try {
      const resultado = await login(usuarioInput, passwordInput);
      if (!resultado?.success) {
        setError(resultado?.message || 'Usuario o contraseña incorrectos.');
        return;
      }
      const rol = resultado.usuario.rol;
      const destinoAnterior = location.state?.desde;
      const puedeVolver = destinoAnterior === '/mantenimiento'
        ? rol === 'ADMIN' || rol === 'INSTRUCTOR'
        : destinoAnterior === '/inscripcion' || destinoAnterior === '/desinscribirse'
          ? rol === 'ADMIN' || rol === 'CLIENTE'
          : destinoAnterior === '/rutinas';
      navigate(puedeVolver ? destinoAnterior : rol === 'ADMIN' ? '/mantenimiento' : '/', {
        replace: true
      });
    } catch {
      setError('No se pudo completar el inicio de sesión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section aria-labelledby="titulo-login" className="e6-login">
      <div className="e6-login-encabezado">
        <h2 id="titulo-login">Acceso al gimnasio</h2>
        <p>Ingresá con tu usuario para acceder a los servicios de tu perfil.</p>
      </div>
      {error && <p role="alert" className="e6-error">{error}</p>}
      <form className="e6-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario
          <input id="username" type="text" autoComplete="username" value={usuarioInput}
            onChange={e => setUsuarioInput(e.target.value)} required />
        </label>
        <label htmlFor="password">Contraseña
          <input id="password" type="password" autoComplete="current-password" value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)} required />
        </label>
        <button type="submit" disabled={cargando || verificando}>
          {cargando || verificando ? 'Verificando...' : 'Iniciar sesión'}
        </button>
      </form>
      <p><Link to="/">Volver al inicio</Link></p>
    </section>
  );
}
