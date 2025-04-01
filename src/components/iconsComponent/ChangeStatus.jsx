import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../../styles/main.css";
import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";

const ChangeStatus = () => {
  // Datos estáticos de prueba
  const [currentStatus, setCurrentStatus] = useState(false); // false = inactivo (rojo), true = activo (verde)
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setCurrentStatus(!currentStatus); // Cambia el estado
    setShowModal(false); // Cierra el modal
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Botón de estado */}
      <button
        className={`btn btn-sm ${status ? "btn-success" : "btn-secondary"}`}
      >
        {status ? "Desactivar" : "Activar"}
      </button>

      {/* Modal de confirmación */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        backdrop={false}
        className="clear-modal"
      >
        <Modal.Header closeButton className="border-0 bg-white">
          <Modal.Title>Confirmar cambio de estado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4 bg-white">
          <p>¿Cambiar estado a {currentStatus ? "Inactivo" : "Activo"}?</p>
        </Modal.Body>
        <Modal.Footer className="border-0 bg-white">
          <BlueButton onClick={handleConfirm}>Confirmar</BlueButton>
          <PurpleButton onClick={handleClose}>Cancelar</PurpleButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeStatus;
