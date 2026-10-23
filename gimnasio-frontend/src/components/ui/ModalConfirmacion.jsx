import React from 'react';

const ModalConfirmacion = ({ isOpen, titulo, mensaje, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>{titulo || 'Confirmar Acción'}</h3>
                <p>{mensaje || '¿Está seguro de que desea realizar esta acción?'}</p>
                <div style={styles.acciones}>
                    <button onClick={onCancel} style={styles.btnCancelar}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} style={styles.btnEliminar}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    acciones: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginTop: '20px'
    },
    btnCancelar: {
        padding: '8px 16px',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    btnEliminar: {
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default ModalConfirmacion;