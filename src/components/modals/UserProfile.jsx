import React from "react";
import { Modal } from "react-bootstrap";
import '../../styles/main.css';
import BlueButton from '../BlueButton';

const UserProfile = ({ show, handleClose, user }) => {
  const { nombre, apellido, email, telefono, empresa } = user;

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Perfil de Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2 text-sm">
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Apellido:</strong> {apellido}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Teléfono:</strong> {telefono}</p>
          <p><strong>Empresa:</strong> {empresa}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <BlueButton onClick={handleClose}>Cerrar</BlueButton>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfile;
