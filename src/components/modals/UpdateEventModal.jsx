import React, { useState, useEffect } from "react";
import InputComponent from "../InputComponent";
import ImageGalleryUpload from "../ImagesGalleryUpload";
import DateInputComponent from "../DateInputComponent";
import BlueButton from "../BlueButton";

import "../../styles/modalStyles.css"; // Estilos para el modal

const UpdateEventModal = ({ showModal, eventData, handleClose, handleUpdate }) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [images, setImages] = useState([]);

  // Se ejecuta cuando se abre el modal o cuando cambian los datos del evento
  useEffect(() => {
    if (eventData && showModal) {
      setEventName(eventData.name);
      setEventDescription(eventData.description);
      setEventDate(eventData.date);
      setImages(eventData.imageUrls || []);
    }
  }, [eventData, showModal]);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      id: eventData.id,
      name: eventName,
      description: eventDescription,
      date: eventDate,
      images,
    };

    handleUpdate(updatedEvent); // Enviar los datos actualizados
    handleClose(); // Cerrar el modal
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Actualizar Evento</h2>
          <button onClick={handleClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Sección de Nombre y Fecha */}
            <div className="row">
              <div className="col-md-6">
                <InputComponent
                  type="text"
                  label="Nombre del evento"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <DateInputComponent
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Sección de Descripción */}
            <InputComponent
              type="text"
              label="Descripción"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />

            {/* Sección de Imágenes */}
            <ImageGalleryUpload
              images={images}
              onChange={setImages}
              required
              minImages={1}
            />

            {/* Botón de Envío */}
            <div className="text-center mt-4">
              <BlueButton type="submit">Actualizar Evento</BlueButton>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={handleClose} className="close-button">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventModal;
