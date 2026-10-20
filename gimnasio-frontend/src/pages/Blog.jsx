
function Blog() {
    return (
        <section className="pagina-blog">
            <h2>Blog de Salud y Bienestar</h2>

            <p>
                Encuentra información sobre ejercicio,
                alimentación y hábitos saludables.
            </p>

            <div className="lista-blog">
                <article>
                    <h3>Salud y bienestar</h3>
                    <p>
                        Consulta información sobre hábitos
                        para mantener una vida saludable.
                    </p>
                    <a
                        href="https://www.who.int/es"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visitar Organización Mundial de la Salud
                    </a>
                </article>

                <article>
                    <h3>Ejercicio físico</h3>
                    <p>
                        Aprende sobre la importancia de realizar
                        actividad física regularmente.
                    </p>
                    <a
                        href="https://medlineplus.gov/spanish/exerciseandphysicalfitness.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Leer sobre ejercicio físico
                    </a>
                </article>

                <article>
                    <h3>Alimentación saludable</h3>
                    <p>
                        Encuentra recomendaciones generales
                        sobre nutrición y alimentación.
                    </p>
                    <a
                        href="https://medlineplus.gov/spanish/nutrition.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Leer sobre nutrición
                    </a>
                </article>

                <article>
                    <h3>Recetas saludables</h3>
                    <p>
                        Explora información y recetas para
                        complementar una alimentación equilibrada.
                    </p>
                    <a
                        href="https://medlineplus.gov/spanish/recetas/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Explorar MiPlato
                    </a>
                </article>
            </div>
        </section>
    );
}

export default Blog;
