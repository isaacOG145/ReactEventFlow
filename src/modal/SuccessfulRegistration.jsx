import React from "react";
import { Modal } from "react-bootstrap";
import '../styles/modalStyles.css';

import BlueButton from './button/EventBlueButton';
import PurpleButton from './button/EventPurpleButton';

const SuccessModal = ({ show, handleClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar creación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de crear este elemento?</p>
      </Modal.Body>
      <Modal.Footer>
        <BlueButton onClick={onConfirm}>
          Crear
        </BlueButton>
        <PurpleButton onClick={handleClose}>
          Cancelar
        </PurpleButton>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
