
import { Link } from "react-router-dom";

function PaginaPendiente({ nombre }) {
    return (
        <section>
            <h2>{nombre}</h2>

            <p>
                Esta sección está pendiente de integración
                con el módulo correspondiente.
            </p>

            <Link to="/servicios">
                Volver a Servicios
            </Link>
        </section>
    );
}

export default PaginaPendiente;
