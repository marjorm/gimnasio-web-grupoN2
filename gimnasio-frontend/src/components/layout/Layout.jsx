
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout() {
    return (
        <>
            <header>
                <h1>Sistema Web Gimnasio - Grupo 2 UNA</h1>
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default Layout;
