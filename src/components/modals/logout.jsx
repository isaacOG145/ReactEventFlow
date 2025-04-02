import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
