import React from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/modalStyles.css';

import BlueButton from './button/EventBlueButton';
import PurpleButton from './button/EventPurpleButton';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {

  const handleConfirm = () => {
    if (onConfirm) onConfirm(); // Llamamos a onConfirm cuando el usuario confirme
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro que deseas eliminar este elemento?</p>
      </Modal.Body>
      <Modal.Footer>
        <BlueButton variant="secondary" onClick={handleConfirm}>
          Eliminar
        </BlueButton>
        <PurpleButton variant="danger" onClick={onClose}>
          Cancelar
        </PurpleButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
