import { useEffect, useState } from 'react';
import { cursoService } from '../services/cursoService';
import { rutinaService } from '../services/rutinaService';
import { inscripcionService } from '../services/inscripcionService';
import { useAuth } from '../context/auth.js';
import { crearSolicitudInscripcion } from '../models/inscripcion.js';
import { apiCall } from '../services/api';

export default function Inscripcion() {
 const { usuario } = useAuth();
 const [cursos,setCursos]=useState([]);
 const [rutinas,setRutinas]=useState([]);
 const [disponibilidad,setDisponibilidad]=useState({});
 const [tipo,setTipo]=useState('CURSO');
 const [itemId,setItemId]=useState('');
 const [clienteId,setClienteId]=useState('');
 const [mensaje,setMensaje]=useState('');
 const [error,setError]=useState('');
 const [cargando,setCargando]=useState(true);
 const [guardando,setGuardando]=useState(false);
 useEffect(()=>{
  let activa=true;
  const consultaRutinas=usuario?.rol==='CLIENTE'?rutinaService.obtenerMisRutinas():rutinaService.obtenerTodas();
  Promise.all([cursoService.obtenerTodos(),consultaRutinas,apiCall('/cursos-detalle/disponibilidad')]).then(([cs,rs,ds])=>{
   if(!activa)return;setCursos(Array.isArray(cs)?cs:[]);setRutinas(Array.isArray(rs)?rs:[]);setDisponibilidad(Object.fromEntries((Array.isArray(ds)?ds:[]).map(d=>[d.cursoId,d])));
  }).catch(e=>{if(activa)setError(e.message||'No se pudieron cargar las opciones.');})
  .finally(()=>{if(activa)setCargando(false);});
  return ()=>{activa=false;};
 },[usuario?.rol]);
 const opciones=tipo==='CURSO'?cursos:rutinas;
 const enviar=async e=>{
  e.preventDefault();setError('');setMensaje('');
  if(!itemId){setError('Seleccione una opción.');return;}
  if(tipo==='CURSO'&&(!disponibilidad[itemId]||disponibilidad[itemId].cuposDisponibles<1)){setError('El curso no tiene cupos disponibles.');return;}
  if(usuario?.rol==='ADMIN'&&(!clienteId||Number(clienteId)<=0)){setError('Ingrese la cédula del cliente.');return;}
  setGuardando(true);
  try {
   const d=crearSolicitudInscripcion({ tipo, itemId, clienteId, rol:usuario?.rol });
   const r=await inscripcionService.registrar(d);
   setMensaje(`Inscripción ${r.id} registrada y guardada en la base de datos.`);setItemId('');
  }catch(err){setError(err.message||'No fue posible registrar la inscripción.');}
  finally{setGuardando(false);}
 };
 return <section className="e6-panel">
  <h2>Inscripción real a cursos y rutinas</h2>
  <p>Las solicitudes se registran en la base de datos. Un cliente puede seleccionar sus rutinas asignadas.</p>
  {cargando&&<p role="status">Cargando opciones...</p>}
  {error&&<p role="alert" className="e6-error">{error}</p>}
  {mensaje&&<p role="status" className="e6-exito">{mensaje}</p>}
  {!cargando&&<form onSubmit={enviar} className="e6-form">
   {usuario?.rol==='ADMIN'&&<label>Cédula del cliente <input type="number" min="1" required value={clienteId} onChange={e=>setClienteId(e.target.value)}/></label>}
   <label>Tipo de inscripción <select value={tipo} onChange={e=>{setTipo(e.target.value);setItemId('');}}>
    <option value="CURSO">Curso</option><option value="RUTINA">Rutina asignada</option>
   </select></label>
   <label>{tipo==='CURSO'?'Curso':'Rutina'} <select required value={itemId} onChange={e=>setItemId(e.target.value)}>
    <option value="">Seleccione...</option>
    {opciones.map(i=><option key={i.id} value={i.id} disabled={tipo==='CURSO'&&!(disponibilidad[i.id]?.cuposDisponibles>0)}>{i.descripcion || `Rutina #${i.id}`}{tipo==='CURSO'?` — ${disponibilidad[i.id]?.cuposDisponibles??0} cupos`:''}</option>)}
   </select></label>
   {tipo==='RUTINA'&&opciones.length===0&&<p>No hay rutinas asignadas disponibles.</p>}
   <button disabled={guardando||opciones.length===0}>{guardando?'Guardando...':'Confirmar inscripción'}</button>
  </form>}
 </section>;
}
