import { useState } from 'react';
import { apiCall } from '../services/api';
import { Link } from 'react-router-dom';
const hoy=()=>new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
const inicio={id:'',username:'',password:'',nombre:'',apellido1:'',apellido2:'',direccion:'',eMail:'',fechaInscripcion:hoy(),celular:'',telHabitacion:''};
export default function Registro(){
 const [datos,setDatos]=useState(inicio);const [error,setError]=useState('');const [ok,setOk]=useState('');const [enviando,setEnviando]=useState(false);
 const campos=[['id','Cédula','number'],['username','Usuario','text'],['password','Contraseña (mínimo 8)','password'],['nombre','Nombre','text'],['apellido1','Primer apellido','text'],['apellido2','Segundo apellido','text'],['direccion','Dirección','text'],['eMail','Correo','email'],['fechaInscripcion','Fecha de inscripción','date'],['celular','Celular','number'],['telHabitacion','Teléfono habitación','number']];
 const enviar=async e=>{
  e.preventDefault();setError('');setOk('');setEnviando(true);
  const cliente={...datos,id:Number(datos.id),celular:Number(datos.celular),telHabitacion:Number(datos.telHabitacion)};
  delete cliente.username;delete cliente.password;
  try{await apiCall('/registro-clientes',{method:'POST',body:JSON.stringify({cliente,username:datos.username,password:datos.password})});setOk('Cuenta y perfil registrados correctamente. Ahora puede ingresar.');setDatos(inicio);}
  catch(err){setError(err.message||'No se pudo registrar.');}finally{setEnviando(false);}
 };
 return <section className="e6-panel"><h2>Inscripción al gimnasio</h2><p>Cree su cuenta de cliente para acceder a sus servicios.</p>
  {error&&<p role="alert" className="e6-error">{error}</p>}{ok&&<p role="status" className="e6-exito">{ok} <Link to="/login">Acceder</Link></p>}
  <form className="e6-form" onSubmit={enviar}>
   {campos.map(([k,label,type])=><label key={k}>{label}<input required={!['direccion','eMail'].includes(k)} type={type} min={type==='number'?1:undefined} max={type==='date'?hoy():undefined} minLength={k==='password'?8:undefined} value={datos[k]} onChange={e=>setDatos(p=>({...p,[k]:e.target.value}))}/></label>)}
   <button disabled={enviando}>{enviando?'Registrando...':'Crear cuenta'}</button>
  </form></section>;
}
