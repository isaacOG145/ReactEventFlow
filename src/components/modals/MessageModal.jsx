import React, { useEffect } from 'react';

import '../../styles/modalStyles.css';

export default function MessageModal({ show, message, onClose, type = 'success' }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose(); // Cierra el modal después de 3 segundos
            }, 3000);

            return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el modal
        }
    }, [show, onClose]);

    // Estilo condicional según el tipo de mensaje
    const modalClass = type === 'error' ? 'error' : 'success';

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className={`modal-content ${modalClass}`}>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}
