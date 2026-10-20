
import { Link } from "react-router-dom";

function NoEncontrada() {
    return (
        <section className="pagina-no-encontrada">
            <h2>Error 404 - Página no encontrada</h2>

            <p>
                Lo sentimos, la página que estás buscando
                no existe o no está disponible.
            </p>

            <Link to="/">
                Volver al Inicio
            </Link>
        </section>
    );
}

export default NoEncontrada;
