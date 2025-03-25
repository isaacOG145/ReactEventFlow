import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/modalStyles.css';

import BlueButton from './button/EventBlueButton';
import PurpleButton from './button/EventPurpleButton';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro que deseas eliminar este elemento?</p>
      </Modal.Body>
      <Modal.Footer>
        <BlueButton variant="secondary" onClick={onClose}>
          Cancelar
        </BlueButton>
        <PurpleButton variant="danger" onClick={onConfirm}>
          Eliminar
        </PurpleButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;