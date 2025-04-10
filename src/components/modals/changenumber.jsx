import React from "react";
import { Modal, Form } from "react-bootstrap";
import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";

const ChangeNumber = ({ show, handleClose, telefonoActual, onSave }) => {
  const [nuevoTelefono, setNuevoTelefono] = React.useState(telefonoActual);

  const handleGuardar = () => {
    onSave(nuevoTelefono);
    handleClose();
  };

  React.useEffect(() => {
    setNuevoTelefono(telefonoActual); // Reset cuando cambia el número actual
  }, [telefonoActual]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Teléfono</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formTelefono">
            <Form.Label>Nuevo número de teléfono</Form.Label>
            <Form.Control
              type="text"
              value={nuevoTelefono}
              onChange={(e) => setNuevoTelefono(e.target.value)}
              placeholder="Ingrese nuevo número"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <PurpleButton onClick={handleClose}>
          Cancelar
        </PurpleButton>
        <BlueButton onClick={handleGuardar}>
          Guardar
        </BlueButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeNumber;
