import React from "react";
import { Modal } from "react-bootstrap";
import '../../styles/main.css';
import BlueButton from '../BlueButton';
import PurpleButton from "../PurpleButton";

const UserProfile = ({ show, handleClose, user }) => {
  const { nombre, apellido, email, telefono, empresa } = user;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal-size"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center text-primary fw-bold">
          Perfil Usuario
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-md-6 mb-3">
            <div className="d-flex mb-2">
              <strong className="me-2">Nombre:</strong>
              <span>{nombre}</span>
            </div>
            <div className="d-flex mb-2">
              <strong className="me-2">Apellido:</strong>
              <span>{apellido}</span>
            </div>
            <div className="d-flex mb-2">
              <strong className="me-2">Email:</strong>
              <span>{email}</span>
            </div>
          </div>

          {/* Columna derecha alineada */}
          <div className="col-md-6 mb-3">
            <div className="d-flex mb-2">
              <strong className="me-2" style={{ width: "90px" }}>Teléfono:</strong>
              <span>{telefono}</span>
            </div>
            <div className="d-flex mb-2">
              <strong className="me-2" style={{ width: "90px" }}>Empresa:</strong>
              <span>{empresa}</span>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <BlueButton onClick={handleClose} className="w-50 me-2">
          Guardar cambios
        </BlueButton>
        <PurpleButton onClick={handleClose} className="w-50 ms-2">
          Cancelar
        </PurpleButton>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfile;
