import iconStatusoff from '../assets/icons/boton-red.png';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/modalStyles.css';

import BlueButton from './button/EventBlueButton';
import PurpleButton from './button/EventPurpleButton';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [icon, setIcon] = useState(null);

  const handleConfirm = () => {
    setIcon(iconStatusoff);
    if (onConfirm) onConfirm();
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro que deseas eliminar este elemento?</p>
        {icon && <img src={icon} alt="Estado apagado" style={{ width: '40px' }} />}
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
