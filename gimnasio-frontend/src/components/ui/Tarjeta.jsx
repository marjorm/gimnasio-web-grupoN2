import React from 'react';

export default function Tarjeta({ titulo, children, onEditar, onEliminar }) {
    return (
        <article className="tarjeta-catalogo-item" style={{ background: '#fff', border: '1px solid #e0e5eb', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                {titulo && <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#333', fontSize: '1.2rem' }}>{titulo}</h3>}
                <div style={{ color: '#666', fontSize: '0.95rem' }}>
                    {children}
                </div>
            </div>

            {(onEditar || onEliminar) && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                    {onEditar && (
                        <button 
                            onClick={onEditar} 
                            style={{ padding: '6px 12px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Editar
                        </button>
                    )}
                    {onEliminar && (
                        <button 
                            onClick={onEliminar} 
                            style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            )}
        </article>
    );
}