
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Contactos from "./pages/Contactos.jsx";
import Servicios from "./pages/Servicios.jsx";

import Cursos from "./pages/Cursos.jsx";
import Rutinas from "./pages/Rutinas.jsx";
import Maquinas from "./pages/Maquinas.jsx";
import Instructores from "./pages/Instructores.jsx";

import Inscripcion from "./pages/Inscripcion.jsx";
import Mantenimiento from "./pages/Mantenimiento.jsx";
import PaginaPendiente from "./pages/PaginaPendiente.jsx";
import Blog from "./pages/Blog.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Inicio />} />
                <Route path="/contactos" element={<Contactos />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/login" element={<Login />} />

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

                <Route path="/inscripcion" element={<Inscripcion />} />

                <Route
                    path="/mantenimiento"
                    element={
                        <ProtectedRoute>
                            <Mantenimiento />
                        </ProtectedRoute>
                    }
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
        </AuthProvider>
    );
}

export default App;
