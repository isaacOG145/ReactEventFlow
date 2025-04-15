
import React from 'react';
import '../../styles/modalStyles.css'; 

const ModalComponent = ({ show, onClose, children, title }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>{title}</h1>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
