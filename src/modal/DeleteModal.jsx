import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/modalStyles.css';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay"> {/* Corregido aquí */}
      <div className="modal-card"> {/* Corregido aquí */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">¿Estás seguro de que deseas eliminar este taller?</h5>
            <p className="card-text">Esta acción no se puede deshacer.</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
