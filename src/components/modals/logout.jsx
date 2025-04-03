import React from 'react';
import { Modal } from 'react-bootstrap';
import BlueButton from '../BlueButton';
import PurpleButton from '../PurpleButton';

export default function Logout({ show, handleClose, handleLogout }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
      </Modal.Body>
      <Modal.Footer> 
        <BlueButton onClick={handleLogout}>Cerrar sesión</BlueButton>
        <PurpleButton onClick={handleClose}>Cancelar</PurpleButton>
       
      </Modal.Footer>
    </Modal>
  );
}
