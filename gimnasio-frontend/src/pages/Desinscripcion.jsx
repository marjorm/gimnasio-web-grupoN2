import { useEffect, useState } from 'react';
import { inscripcionService } from '../services/inscripcionService';
import { apiCall } from '../services/api';
export default function Desinscripcion(){
 const [lista,setLista]=useState([]);const [pagos,setPagos]=useState([]);
 const [mensaje,setMensaje]=useState('');const [error,setError]=useState('');
 const [cargando,setCargando]=useState(true);const [trabajando,setTrabajando]=useState(false);
 const cargar=async()=>{const [i,p]=await Promise.all([inscripcionService.mias(),apiCall('/pagos/mios')]);setLista(i);setPagos(p);};
 useEffect(()=>{let activo=true;Promise.all([inscripcionService.mias(),apiCall('/pagos/mios')]).then(([i,p])=>{if(activo){setLista(i);setPagos(p);}}).catch(e=>{if(activo)setError(e.message);}).finally(()=>{if(activo)setCargando(false);});return ()=>{activo=false;};},[]);
 const ejecutar=async (id,esBaja=false)=>{
  if(!window.confirm(esBaja?'¿Confirmar baja definitiva del gimnasio?':'¿Cancelar esta inscripción?'))return;
  setError('');setMensaje('');setTrabajando(true);
  try{if(esBaja){await inscripcionService.bajaGimnasio();setMensaje('Baja del gimnasio registrada.');}
   else{await inscripcionService.cancelar(id);setMensaje('Inscripción cancelada correctamente.');}
   await cargar();
  }catch(e){setError(e.message||'No se pudo completar la operación.');}finally{setTrabajando(false);}
 };
 const vencidos=pagos.filter(p=>p.estado==='PENDIENTE'&&p.fechaVencimiento<=new Date().toISOString().slice(0,10));
 return <section className="e6-panel"><h2>Desinscribirse</h2>
  <p>Solo se puede cancelar una inscripción o solicitar la baja del gimnasio cuando no existen pagos vencidos pendientes.</p>
  {cargando&&<p>Cargando registros...</p>}{mensaje&&<p role="status" className="e6-exito">{mensaje}</p>}{error&&<p role="alert" className="e6-error">{error}</p>}
  {vencidos.length>0&&<p role="alert" className="e6-error">Existen {vencidos.length} pagos vencidos. Solicite su regularización.</p>}
  <h3>Mis inscripciones</h3><table className="e6-table"><thead><tr><th>ID</th><th>Tipo</th><th>Elemento</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
  {lista.map(i=><tr key={i.id}><td>{i.id}</td><td>{i.tipo}</td><td>{i.itemId}</td><td>{i.estado}</td><td>{i.estado==='ACTIVA'&&<button disabled={trabajando||vencidos.length>0} onClick={()=>ejecutar(i.id)}>Cancelar</button>}</td></tr>)}
  </tbody></table>
  <button type="button" disabled={trabajando||vencidos.length>0} onClick={()=>ejecutar(null,true)}>Solicitar baja del gimnasio</button>
 </section>;
}
