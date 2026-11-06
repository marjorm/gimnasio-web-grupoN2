import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursoService } from '../services/cursoService';
import { apiCall } from '../services/api';
export default function Cursos(){
 const [cursos,setCursos]=useState([]);const [detalles,setDetalles]=useState({});const [error,setError]=useState('');const navigate=useNavigate();
 useEffect(()=>{let vigente=true;Promise.all([cursoService.obtenerTodos(),apiCall('/cursos-detalle/disponibilidad')]).then(([cs,ds])=>{if(vigente){setCursos(cs);setDetalles(Object.fromEntries(ds.map(d=>[d.cursoId,d])));}}).catch(e=>{if(vigente)setError(e.message);});return ()=>{vigente=false;};},[]);
 return <section className="e6-panel"><h2>Cursos disponibles</h2>{error&&<p role="alert" className="e6-error">{error}</p>}
 <div className="e6-galeria">{cursos.map(c=>{const d=detalles[c.id]||{};return <article className="e6-tarjeta" key={c.id}>
 <img className="e6-imagen" loading="lazy" src={d.imagen||'/img/instalacion1.jpg'} alt={`Imagen referencial de ${c.descripcion}`}/>
 <h3>{c.descripcion}</h3><p>ID: {c.id}</p><p>Horario: {d.horario||'Por programar'}</p><p>Cupos disponibles: {d.cuposDisponibles??'Pendientes de confirmación'}</p>
 <button type="button" disabled={!d.cuposDisponibles || String(d.horario||'').toLowerCase().includes('pendiente')}
 onClick={()=>navigate('/inscripcion')}>{d.cuposDisponibles>0?'Inscribirse':'Sin cupos'}</button></article>;})}</div></section>;
}
