import { useState } from 'react';
import { apiCall } from '../../services/api';
export default function FormularioContacto(){
 const [datos,setDatos]=useState({nombre:'',correo:'',asunto:'',contenido:''});
 const [error,setError]=useState('');const [ok,setOk]=useState('');const [enviando,setEnviando]=useState(false);
 const enviar=async e=>{e.preventDefault();setError('');setOk('');setEnviando(true);try{
  const r=await apiCall('/contactos',{method:'POST',body:JSON.stringify(datos)});
  setOk(`Consulta #${r.id} registrada en el sistema.`);setDatos({nombre:'',correo:'',asunto:'',contenido:''});
 }catch(err){setError(err.message||'No se pudo registrar la consulta.');}finally{setEnviando(false);}};
 return <form className="e6-form" onSubmit={enviar}>
 {error&&<p role="alert" className="e6-error">{error}</p>}{ok&&<p role="status" className="e6-exito">{ok}</p>}
 <label>Nombre <input required minLength={2} maxLength={60} value={datos.nombre} onChange={e=>setDatos(p=>({...p,nombre:e.target.value}))}/></label>
 <label>Correo <input required type="email" maxLength={120} value={datos.correo} onChange={e=>setDatos(p=>({...p,correo:e.target.value}))}/></label>
 <label>Asunto <input required maxLength={100} value={datos.asunto} onChange={e=>setDatos(p=>({...p,asunto:e.target.value}))}/></label>
 <label>Mensaje <textarea required minLength={5} maxLength={2000} rows={5} value={datos.contenido} onChange={e=>setDatos(p=>({...p,contenido:e.target.value}))}/></label>
 <button disabled={enviando}>{enviando?'Registrando...':'Enviar consulta'}</button>
 </form>;
}
