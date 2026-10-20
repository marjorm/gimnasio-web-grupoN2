
import { Link } from "react-router-dom";

function Servicios() {
    return (
        <section className="pagina-servicios">
            <h2>Nuestros servicios</h2>

            <p>
                Conoce los diferentes servicios que ofrece
                nuestro gimnasio.
            </p>

            <div className="lista-servicios">
                <article>
                    <h3>Inscripción</h3>
                    <p>Inscríbete en nuestros cursos y rutinas.</p>
                    <Link to="/inscripcion">Ir a Inscripción</Link>
                </article>

                <article>
                    <h3>Cursos</h3>
                    <p>Consulta los cursos disponibles.</p>
                    <Link to="/cursos">Ver Cursos</Link>
                </article>

                <article>
                    <h3>Rutinas</h3>
                    <p>Conoce las rutinas de entrenamiento.</p>
                    <Link to="/rutinas">Ver Rutinas</Link>
                </article>

                <article>
                    <h3>Máquinas</h3>
                    <p>Conoce las máquinas del gimnasio.</p>
                    <Link to="/maquinas">Ver Máquinas</Link>
                </article>

                <article>
                    <h3>Instructores</h3>
                    <p>Conoce a nuestros instructores.</p>
                    <Link to="/instructores">Ver Instructores</Link>
                </article>

                <article>
                    <h3>Mantenimiento</h3>
                    <p>Administración de los registros del gimnasio.</p>
                    <Link to="/mantenimiento">Ir a Mantenimiento</Link>
                </article>

                <article>
                    <h3>Desinscribirse</h3>
                    <p>Solicita el retiro de tu inscripción.</p>
                    <Link to="/desinscribirse">Ir a Desinscribirse</Link>
                </article>
            </div>
        </section>
    );
}

export default Servicios;
