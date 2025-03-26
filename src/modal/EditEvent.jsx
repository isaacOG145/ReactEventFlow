import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import BlueButton from '../components/BlueButton';
import PurpleButton from '../components/PurpleButton';
import ImageGallery from '../components/ImageGallery';

const EditEvent = ({ show, handleClose, eventId }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [gallery, setGallery] = useState([null, null, null]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (show) {
      // Simulación de carga de datos del evento
      const loadEventData = () => {
        setIsLoading(true);
        // Datos de ejemplo - en producción sería una llamada API
        const mockEvents = {
          1: {
            name: "Feria de ciencias",
            date: "2025-06-12",
            description: "Evento con concursos y exposiciones",
            gallery: [
              "https://ejemplo.com/imagen1.jpg",
              "https://ejemplo.com/imagen2.jpg",
              "https://ejemplo.com/imagen3.jpg"
            ]
          },
          2: {
            name: "Concurso de arte",
            date: "2025-10-01",
            description: "Evento anual para exposiciones artísticas",
            gallery: [
              "https://ejemplo.com/arte1.jpg",
              "https://ejemplo.com/arte2.jpg",
              null
            ]
          }
        };

        setTimeout(() => {
          const eventData = mockEvents[eventId] || {
            name: '',
            date: '',
            description: '',
            gallery: [null, null, null]
          };
          
          setEventName(eventData.name);
          setEventDate(eventData.date);
          setEventDescription(eventData.description);
          setGallery(eventData.gallery);
          setIsLoading(false);
        }, 500);
      };

      loadEventData();
    }
  }, [show, eventId]);

  const handleImageChange = (index, file) => {
    const newGallery = [...gallery];
    newGallery[index] = file;
    setGallery(newGallery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar los cambios
    console.log('Guardando cambios para el evento:', {
      eventId,
      eventName,
      eventDate,
      eventDescription,
      gallery
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Evento #{eventId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <p>Cargando evento...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del evento<span>*</span></label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha<span>*</span></label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción<span>*</span></label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Galería (mínimo 3 imágenes)</label>
              <ImageGallery 
                gallery={gallery} 
                handleImageChange={handleImageChange} 
                required 
              />
            </div>

            <div className="text-center mt-4">
              <BlueButton type="submit">Guardar Cambios</BlueButton>
              <PurpleButton onClick={handleClose} className="ms-2">
                Cancelar
              </PurpleButton>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditEvent ;