export default function Inicio(){
 return <section className="e6-panel">
  <h2>Bienvenidos al Gimnasio — Grupo 2 UNA</h2>
  <p>Conozca los espacios de entrenamiento, nuestros cursos, instructores y rutinas.</p>
  <div className="e6-galeria">
   {[1,2,3].map(n=><figure key={n}><img className="e6-imagen" src={`/img/instalacion${n}.jpg`} alt={`Instalaciones del gimnasio, imagen ${n}`}/><figcaption>Instalaciones del gimnasio</figcaption></figure>)}
  </div>
 </section>;
}
