import React from "react";
import { Modal } from "react-bootstrap";
import '../../styles/main.css';

import BlueButton from '../BlueButton';
import PurpleButton from '../PurpleButton';

const SuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registro exitoso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>El elemento se ha registrado exitosamente.</p>
      </Modal.Body>
      <Modal.Footer>
        <BlueButton onClick={handleClose}>
          Aceptar
        </BlueButton>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
