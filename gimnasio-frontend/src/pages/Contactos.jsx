
import FormularioContacto from "../components/forms/FormularioContacto.jsx";

function Contactos() {
    return (
        <section className="pagina-contactos">
            <h2>Contáctanos</h2>

            <p>
                Si tienes alguna consulta sobre nuestros servicios,
                puedes comunicarte con nosotros.
            </p>

            <h3>Información de contacto</h3>

            <address>
                <p>
                    <strong>Teléfono:</strong>8888-8888
                </p>

                <p>
                    <strong>Dirección:</strong> Heredia
                </p>

                <p>
                    <strong>Correo electrónico:</strong> gimnacioGrupo2@ejemplo.com
                </p>
            </address>

            <h3>Redes sociales</h3>

            <p>
                Próximamente encontrarás aquí nuestros enlaces
                a Facebook e Instagram.
            </p>

            <h3>Formulario de contacto</h3>

            <p>
                Puedes verificar los datos del mensaje en este formulario.
                Todavía no se envían mensajes al servidor.
            </p>

            <FormularioContacto />
        </section>
    );
}

export default Contactos;
