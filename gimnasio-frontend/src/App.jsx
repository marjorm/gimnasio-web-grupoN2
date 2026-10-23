
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Contactos from "./pages/Contactos.jsx";
import Servicios from "./pages/Servicios.jsx";

import Cursos from "./pages/Cursos.jsx";
import Rutinas from "./pages/Rutinas.jsx";
import Maquinas from "./pages/Maquinas.jsx";
import Instructores from "./pages/Instructores.jsx";

import PaginaPendiente from "./pages/PaginaPendiente.jsx";
import Blog from "./pages/Blog.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Inicio />} />
                <Route path="/contactos" element={<Contactos />} />
                <Route path="/servicios" element={<Servicios />} />

                <Route
                    path="/blog"
                    element={<Blog />}
                />

                <Route
                    path="/cursos"
                    element={<Cursos />}
                />

                <Route
                    path="/rutinas"
                    element={<Rutinas />}
                />

                <Route
                    path="/maquinas"
                    element={<Maquinas />}
                />

                <Route
                    path="/instructores"
                    element={<Instructores />}
                />

                <Route
                    path="/mantenimiento"
                    element={<PaginaPendiente nombre="Mantenimiento" />}
                />

                <Route
                    path="/desinscribirse"
                    element={<PaginaPendiente nombre="Desinscribirse" />}
                />

                <Route
                    path="*"
                    element={<NoEncontrada />}
                />
            </Route>
        </Routes>
    );
}

export default App;
