import { useEffect, useMemo, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAuth } from '../context/auth.js';
import MantenimientoClientes from './Mantenimiento.jsx';

const campos = {
  cursos: [['id', 'ID', 'number'], ['descripcion', 'Descripción', 'text']],
  maquinas: [['id', 'ID', 'number'], ['descripcion', 'Descripción', 'text'], ['estado', 'Estado', 'text']],
  rutinas: [['id', 'ID', 'number'], ['clienteId', 'Cédula del cliente', 'number'], ['instructorId', 'Código del instructor', 'number'], ['maquina', 'Máquina', 'number'], ['fecha', 'Fecha', 'date'], ['horas', 'Horas', 'number']],
  'historial-cursos': [['id', 'ID', 'number'], ['clienteId', 'Cliente', 'number'], ['instructorId', 'Instructor', 'number'], ['cursoId', 'Curso', 'number'], ['fecha', 'Fecha', 'date'], ['horas', 'Horas', 'number']],
  'cursos-detalle': [['cursoId', 'ID de curso', 'number'], ['horario', 'Horario', 'text'], ['cupos', 'Capacidad máxima', 'number'], ['imagen', 'Ruta de imagen', 'text']],
  'admin/usuarios': [['id', 'ID', 'number'], ['username', 'Nombre de usuario', 'text'], ['rol', 'Rol', 'text'], ['password', 'Contraseña', 'password']],
  pagos: [['clienteId', 'Cliente', 'number'], ['concepto', 'Concepto', 'text'], ['monto', 'Monto', 'number'], ['fechaVencimiento', 'Vencimiento', 'date'], ['estado', 'Estado', 'text']]
};
const nombres = { clientes: 'Clientes', cursos: 'Cursos', maquinas: 'Máquinas', rutinas: 'Rutinas', 'historial-cursos': 'Historial de cursos', 'cursos-detalle': 'Programación y cupos', 'admin/usuarios': 'Usuarios', pagos: 'Pagos', contactos: 'Consultas recibidas' };
const idDe = fila => fila.id ?? fila.cursoId;
const nombreDe = entidad => entidad ? `${entidad.nombre || ''} ${entidad.apellido1 || ''}`.trim() || `#${entidad.id}` : 'Sin asignar';
function normalizar(fila, modulo) {
  if (modulo === 'rutinas') return { ...fila, clienteId: fila.cliente?.id, instructorId: fila.instructor?.id, fecha: fila.fecha_Rutina || fila.fecha };
  return { ...fila };
}
function descripcion(fila, modulo) {
  switch (modulo) {
    case 'cursos': case 'maquinas': return fila.descripcion;
    case 'rutinas': return `Cliente: ${nombreDe(fila.cliente)} · Instructor: ${nombreDe(fila.instructor)}`;
    case 'historial-cursos': return `Cliente #${fila.clienteId} · Curso #${fila.cursoId}`;
    case 'cursos-detalle': return fila.horario;
    case 'admin/usuarios': return fila.username;
    case 'pagos': return fila.concepto;
    case 'contactos': return fila.asunto;
    default: return 'Registro';
  }
}
function informacion(fila, modulo) {
  switch (modulo) {
    case 'maquinas': return `Estado: ${fila.estado || 'No indicado'}`;
    case 'rutinas': return `Máquina #${fila.maquina} · ${fila.fecha_Rutina || fila.fecha} · ${fila.horas} h`;
    case 'historial-cursos': return `Instructor #${fila.instructorId} · ${fila.fecha} · ${fila.horas} h`;
    case 'cursos-detalle': return `Capacidad: ${fila.cupos} plazas`;
    case 'admin/usuarios': return `Rol: ${fila.rol}`;
    case 'pagos': return `Cliente #${fila.clienteId} · ₡${fila.monto} · ${fila.estado}`;
    case 'contactos': return `${fila.nombre} · ${fila.correo} · ${fila.estado}`;
    default: return '';
  }
}

export default function MantenimientoIntegral() {
  const { usuario } = useAuth();
  const administrador = usuario?.rol === 'ADMIN';
  const modulos = administrador ? ['clientes', 'cursos', 'maquinas', 'rutinas', 'historial-cursos', 'cursos-detalle', 'admin/usuarios', 'pagos', 'contactos'] : ['clientes', 'cursos', 'maquinas', 'rutinas', 'historial-cursos', 'cursos-detalle'];
  const [modulo, setModulo] = useState('clientes');
  const [filas, setFilas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editar, setEditar] = useState(null);
  const [datos, setDatos] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (modulo === 'clientes') return;
    let vigente = true;
    adminService.listar(`/${modulo}`).then(resultado => {
      if (vigente) { setFilas(Array.isArray(resultado) ? resultado : []); setError(''); }
    }).catch(err => { if (vigente) setError(err.message || 'No se pudieron cargar los registros.'); })
      .finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; };
  }, [modulo]);

  const visibles = useMemo(() => filas.filter(fila => {
    const contenido = `${idDe(fila)} ${descripcion(fila, modulo)} ${informacion(fila, modulo)}`.toLocaleLowerCase('es');
    return contenido.includes(busqueda.trim().toLocaleLowerCase('es'));
  }), [filas, modulo, busqueda]);
  const recargar = async () => { const resultado = await adminService.listar(`/${modulo}`); setFilas(Array.isArray(resultado) ? resultado : []); };
  const iniciar = (fila = null) => { setEditar(fila ? normalizar(fila, modulo) : {}); setDatos(fila ? normalizar(fila, modulo) : {}); setError(''); setMensaje(''); };
  const guardar = async evento => {
    evento.preventDefault(); setGuardando(true); setError(''); setMensaje('');
    try {
      const payload = { ...datos };
      for (const [clave, , tipo] of campos[modulo] || []) if (tipo === 'number' && payload[clave] !== '') payload[clave] = Number(payload[clave]);
      if (modulo === 'admin/usuarios' && !editar?.id && String(payload.password || '').length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres.');
      if (modulo === 'admin/usuarios' && editar?.id && !payload.password) delete payload.password;
      const id = modulo === 'cursos-detalle' ? payload.cursoId : editar?.id;
      await adminService.guardar(`/${modulo}`, payload, id);
      await recargar(); setEditar(null); setMensaje('Registro guardado correctamente.');
    } catch (err) { setError(err.message || 'No se pudo guardar el registro.'); }
    finally { setGuardando(false); }
  };
  const eliminar = async fila => {
    if (!window.confirm(`¿Eliminar el registro #${idDe(fila)}? Esta acción no se puede deshacer.`)) return;
    setError(''); setMensaje('');
    try { await adminService.eliminar(`/${modulo}`, fila.id); await recargar(); setMensaje('Registro eliminado.'); }
    catch (err) { setError(err.message || 'No se pudo eliminar; podría existir información relacionada.'); }
  };
  const accion = async (fila, tipo) => {
    setError(''); setMensaje('');
    try { if (tipo === 'PAGAR') await adminService.pagar(fila.id); else await adminService.atender(fila.id);
      await recargar(); setMensaje('Estado actualizado.'); }
    catch (err) { setError(err.message || 'No se pudo actualizar el estado.'); }
  };

  return <section className="e6-panel e6-mantenimiento" aria-labelledby="e6-titulo-mantenimiento">
    <h2 id="e6-titulo-mantenimiento">Mantenimiento integral</h2>
    <p>Administrá registros del gimnasio según los permisos de tu cuenta.</p>
    <div className="e6-tabs" role="group" aria-label="Módulos de mantenimiento">
      {modulos.map(item => <button key={item} type="button" aria-pressed={item === modulo}
        onClick={() => { setCargando(item !== 'clientes'); setModulo(item); setEditar(null); setBusqueda(''); setError(''); setMensaje(''); }}>{nombres[item]}</button>)}
    </div>
    {modulo === 'clientes' ? <MantenimientoClientes /> : <>
      {error && <p className="e6-error" role="alert">{error}</p>}
      {mensaje && <p className="e6-exito" role="status">{mensaje}</p>}
      <div className="e6-mantenimiento-barra">
        <label>Buscar registros
          <input type="search" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar por identificador, nombre o descripción" />
        </label>
        {modulo !== 'contactos' && modulo !== 'cursos-detalle' && <button type="button" onClick={() => iniciar()}>{modulo === 'pagos' ? 'Registrar cobro' : 'Nuevo registro'}</button>}
      </div>
      {cargando ? <p role="status">Cargando información...</p> : <>
        <p className="e6-contador" aria-live="polite">{visibles.length} registros mostrados</p>
        <div className="e6-tabla-contenedor"><table className="e6-table">
          <thead><tr><th scope="col">ID</th><th scope="col">Descripción</th><th scope="col">Detalles</th><th scope="col">Acciones</th></tr></thead>
          <tbody>{visibles.map(fila => <tr key={idDe(fila)}>
            <td>{idDe(fila)}</td><td>{descripcion(fila, modulo)}</td><td>{informacion(fila, modulo)}</td>
            <td><div className="e6-acciones">
              {modulo === 'contactos' ? <button type="button" disabled={fila.estado === 'ATENDIDA'} onClick={() => accion(fila, 'ATENDER')}>Atender</button> :
                modulo === 'pagos' ? <><button type="button" disabled={fila.estado === 'PAGADO'} onClick={() => accion(fila, 'PAGAR')}>Marcar pagado</button><button type="button" onClick={() => eliminar(fila)}>Eliminar</button></> :
                  <><button type="button" onClick={() => iniciar(fila)}>Editar</button>{modulo !== 'cursos-detalle' && <button type="button" onClick={() => eliminar(fila)}>Eliminar</button>}</>}
            </div></td>
          </tr>)}</tbody>
        </table></div>
        {visibles.length === 0 && <p>No hay registros que coincidan con la búsqueda.</p>}
      </>}
      {editar !== null && <form className="e6-form e6-mantenimiento-form" onSubmit={guardar}>
        <h3>{idDe(editar) != null ? `Editar registro #${idDe(editar)}` : 'Nuevo registro'}</h3>
        {(campos[modulo] || []).map(([campo, etiqueta, tipo]) => <label key={campo}>{etiqueta}
          {campo === 'rol' ? <select required value={datos.rol || ''} onChange={e => setDatos(p => ({ ...p, rol: e.target.value }))}>
            <option value="">Seleccione un rol</option><option value="CLIENTE">Cliente</option><option value="INSTRUCTOR">Instructor</option><option value="ADMIN">Administrador</option>
          </select> : <input type={tipo} min={tipo === 'number' ? (campo === 'cupos' ? 0 : 1) : undefined}
            step={campo === 'monto' ? '.01' : undefined}
            required={!(modulo === 'admin/usuarios' && editar.id != null && campo === 'password')}
            disabled={(campo === 'id' && editar.id != null) || (campo === 'cursoId' && editar.cursoId != null)}
            value={datos[campo] ?? ''} onChange={e => setDatos(p => ({ ...p, [campo]: e.target.value }))} />}
        </label>)}
        <div className="e6-acciones"><button type="submit" disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar'}</button>
          <button type="button" onClick={() => setEditar(null)}>Cancelar</button></div>
      </form>}
    </>}
  </section>;
}
