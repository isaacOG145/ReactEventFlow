import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";

const ChangeStatus = ({ currentStatus, onChangeStatus }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      
      <button
        className={`change-status-btn btn btn-sm ${currentStatus ? "btn-success" : "btn-danger"}`}
        onClick={() => setShowModal(true)}
        title="Cambiar estado"
        style={{ minWidth: "80px" }} // Para que no cambie de tamaño
      >
        {currentStatus ? "Activo" : "Inactivo"}
      </button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        className="custom-modal"
        dialogClassName="modal-dialog-centered"
      >
        <h1 className="text-center">Confirmar cambio de estado</h1>
        <Modal.Body>
          <p className="text-center">¿Estás seguro de cambiar el estado?</p>
          
        </Modal.Body>
        <Modal.Footer>
          <BlueButton 
            onClick={() => {
              onChangeStatus();
              setShowModal(false);
            }}
            className="me-2"
          >
            Confirmar
          </BlueButton>
          <PurpleButton onClick={() => setShowModal(false)}>
            Cancelar
          </PurpleButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeStatus;