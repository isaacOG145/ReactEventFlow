import React from "react";
import { Modal } from "react-bootstrap";
import '../../styles/main.css';

import PurpleButton from '../PurpleButton';

const FailSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Registro Fallido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>El elemento no se ha podido registrar.</p>
      </Modal.Body>
      <Modal.Footer>
        <PurpleButton onClick={handleClose}>
          Cancelar registro
        </PurpleButton>
      </Modal.Footer>
    </Modal>
  );
};

export default FailSuccessModal;
