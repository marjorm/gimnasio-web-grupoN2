import { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';
export default function Navbar(){
 const {autenticado,usuario,logout}=useAuth();const navigate=useNavigate();const [error,setError]=useState('');
 const salir=async()=>{const r=await logout();if(r.success)navigate('/login');else setError(r.message||'No se pudo cerrar la sesión.');};
 return <nav><NavLink to="/" end>Inicio</NavLink><NavLink to="/contactos">Contactos</NavLink><NavLink to="/servicios">Servicios</NavLink><NavLink to="/blog">Blog</NavLink>
 <NavLink to="/cursos">Cursos</NavLink><NavLink to="/maquinas">Máquinas</NavLink><NavLink to="/instructores">Instructores</NavLink>
 {autenticado?<><NavLink to="/rutinas">Rutinas</NavLink>
 {['CLIENTE','ADMIN'].includes(usuario?.rol)&&<NavLink to="/inscripcion">Inscripción</NavLink>}
 {usuario?.rol==='CLIENTE'&&<NavLink to="/desinscribirse">Desinscribirse</NavLink>}
 {['ADMIN','INSTRUCTOR'].includes(usuario?.rol)&&<NavLink to="/mantenimiento">Mantenimiento</NavLink>}
 <button type="button" className="btn-logout" onClick={salir}>Cerrar sesión ({usuario?.username})</button></>:<><NavLink to="/registro">Inscripción al gimnasio</NavLink><NavLink to="/login">Acceso</NavLink></>}
 {error&&<p role="alert">{error}</p>}</nav>;
}
