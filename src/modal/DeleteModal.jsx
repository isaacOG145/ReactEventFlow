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
         <BlueButton variant="danger" onClick={onConfirm}>
          Eliminar
        </BlueButton>
        <PurpleButton variant="secondary" onClick={onClose}>
          Cancelar
        </PurpleButton>
       
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;