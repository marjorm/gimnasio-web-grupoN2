import React, { useState, useEffect } from 'react';
import FormularioInscripcion from '../components/forms/FormularioInscripcion';
import { obtenerCursos } from '../services/cursoService';
import { obtenerRutinas } from '../services/rutinaService';

const Inscripcion = () => {
    const [cursos, setCursos] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        if (obtenerCursos) {
            obtenerCursos().then(data => setCursos(data || [])).catch(() => {});
        }
        if (obtenerRutinas) {
            obtenerRutinas().then(data => setRutinas(data || [])).catch(() => {});
        }
    }, []);

    const handleInscripcion = async (datos) => {
        try {
            console.log('Datos a inscribir:', datos);
            setMensaje({ tipo: 'exito', texto: '¡Inscripción realizada con éxito!' });
        } catch (err) {
            setMensaje({ tipo: 'error', texto: 'Ocurrió un error al procesar la inscripción.' });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Inscripción a Cursos y Rutinas</h2>
            {mensaje && (
                <p style={{ color: mensaje.tipo === 'exito' ? 'green' : 'red' }}>
                    {mensaje.texto}
                </p>
            )}
            <FormularioInscripcion
                cursos={cursos}
                rutinas={rutinas}
                onSubmit={handleInscripcion}
            />
        </div>
    );
};

export default Inscripcion;