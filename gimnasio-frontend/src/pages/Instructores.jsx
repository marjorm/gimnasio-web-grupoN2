import { useEffect,useState } from 'react';
import { instructorService } from '../services/instructorService';
export default function Instructores(){
 const [datos,setDatos]=useState([]);const [error,setError]=useState('');
 useEffect(()=>{let vivo=true;instructorService.obtenerTodos().then(r=>{if(vivo)setDatos(r);}).catch(e=>{if(vivo)setError(e.message);});return ()=>{vivo=false;};},[]);
 return <section className="e6-panel"><h2>Instructores</h2>{error&&<p role="alert" className="e6-error">{error}</p>}
 <div className="e6-galeria">{datos.map((d,i)=><article key={d.id} className="e6-tarjeta"><img className="e6-imagen" loading="lazy" src={`/img/instructor${1+i%3}.svg`} alt={`Ilustración del instructor ${d.nombre}`}/><h3>{d.nombre} {d.apellido1} {d.apellido2}</h3><p>Código: {d.id}</p><p>{d.eMail||'Correo no registrado'}</p></article>)}</div>
 </section>;
}
