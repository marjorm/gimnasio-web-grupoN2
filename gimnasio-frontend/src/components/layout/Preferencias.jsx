import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Preferencias() {
  const [compacto, setCompacto] = useState(() => localStorage.getItem('gimnasio_vista_compacta') === '1');
  const ubicacion = useLocation();

  useEffect(() => {
    localStorage.setItem('gimnasio_vista_compacta', compacto ? '1' : '0');
    document.body.classList.toggle('e6-compacto', compacto);
    return () => document.body.classList.remove('e6-compacto');
  }, [compacto]);

  useEffect(() => {
    sessionStorage.setItem('gimnasio_ultima_ruta', ubicacion.pathname);
  }, [ubicacion.pathname]);

  return (
    <button
      type="button"
      className="e6-preferencias"
      aria-pressed={compacto}
      title="Cambiar la densidad visual de las tarjetas"
      onClick={() => setCompacto(valor => !valor)}
    >
      <span aria-hidden="true" className="e6-preferencias-icono">{compacto ? '▦' : '▤'}</span>
      <span>{compacto ? 'Vista normal' : 'Vista compacta'}</span>
    </button>
  );
}
