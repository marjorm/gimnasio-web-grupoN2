import React from 'react';

export default function MensajeEstado({ loading, error, mensajeVacio, datosCount }) {
    if (loading) {
        return (
            <div className="p-6 text-center text-blue-600 font-medium">
                Cargando información...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 my-2 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm">
                <strong>Ocurrió un error:</strong> {error}
            </div>
        );
    }

    if (datosCount === 0) {
        return (
            <div className="p-6 text-center text-gray-500 italic">
                {mensajeVacio || 'No hay registros disponibles en este momento.'}
            </div>
        );
    }

    return null;
}