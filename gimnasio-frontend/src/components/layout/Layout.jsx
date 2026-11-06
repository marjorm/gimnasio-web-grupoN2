import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Preferencias from './Preferencias.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <>
      <header className="e6-cabecera">
        <div className="e6-cabecera-superior">
          <h1>Sistema Web Gimnasio - Grupo 2 UNA</h1>
          <Preferencias />
        </div>
        <Navbar />
      </header>
      <main><Outlet /></main>
      <Footer />
    </>
  );
}
