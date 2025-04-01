import React from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/modalStyles.css';

import BlueButton from './button/EventBlueButton';
import PurpleButton from './button/EventPurpleButton';

const ChangeStatus = ({ isOpen, onClose, onConfirm }) => {

  const handleConfirm = () => {
    if (onConfirm) onConfirm(); // Llamamos a onConfirm cuando el usuario confirme
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar cambio de estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro que deseas cambiar de estado este elemento?</p>
      </Modal.Body>
      <Modal.Footer>
        <BlueButton variant="secondary" onClick={handleConfirm}>
          cambiar
        </BlueButton>
        <PurpleButton variant="danger" onClick={onClose}>
          Cancelar
        </PurpleButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeStatus;
