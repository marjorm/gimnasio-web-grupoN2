import { useEffect,useState } from 'react';
import { maquinaService } from '../services/maquinaService';
export default function Maquinas(){
 const [maquinas,setMaquinas]=useState([]);const [error,setError]=useState('');
 useEffect(()=>{let vivo=true;maquinaService.obtenerTodas().then(r=>{if(vivo)setMaquinas(r);}).catch(e=>{if(vivo)setError(e.message);});return ()=>{vivo=false;};},[]);
 return <section className="e6-panel"><h2>Máquinas y equipos</h2>{error&&<p role="alert" className="e6-error">{error}</p>}
 <div className="e6-galeria">{maquinas.map((m,i)=><article key={m.id} className="e6-tarjeta"><img className="e6-imagen" loading="lazy" src={`/img/instalacion${1+i%3}.jpg`} alt="Imagen ilustrativa de las instalaciones del gimnasio"/><h3>{m.descripcion}</h3><p>Código: {m.id}</p><p>Estado: {m.estado||'Sin especificar'}</p><small>Fotografía de instalaciones; imagen ilustrativa.</small></article>)}</div>
 </section>;
}
