import React, { useState } from 'react';
import BlueButton from './BlueButton';
import { Carousel, Modal } from 'react-bootstrap';
import NavigateBlueButton from './NavigateBlueButton';

export default function ActivityCard({
  to,
  activity,
  label,
  buttonText,
  scrollToId
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <div className="card-activity col-md-9 col-lg-3">
      <Carousel
        fade
        indicators={false}
        controls={true}
        className="activity-carousel"
        interval={5000}
      >
        {activity.imageUrls.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-image-container">
              <img
                src={imageUrl}
                alt={`Imagen ${index + 1} de la actividad`}
                className="carousel-image"
                onClick={() => handleImageClick(imageUrl)}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="card-activity-content p-4">
        {/* 1. Título */}
        <h3 className="h2 mb-2">{activity.name}</h3>

        {/* 2. Fecha/Hora */}
        {label && (
          <div className="d-flex align-items-center mb-2">
            {label}
          </div>
        )}

        {/* 3. Evento asociado (solo para talleres) */}
        {activity.typeActivity === 'WORKSHOP' && activity.fromActivity && (
          <div className="mb-2">
            <small className="text-muted">
              Evento: <strong>{activity.fromActivity.name}</strong>
            </small>
          </div>
        )}

        {/* 4. Cupo (solo para talleres) */}
        {activity.typeActivity === 'WORKSHOP' && activity.quota && (
          <div className="mb-2">
            <small className="text-muted">
              Cupo: <strong>{activity.quota} personas</strong>
            </small>
          </div>
        )}

        

        {/* 5. Descripción */}
        <div className="mb-2">
          <small className='text-muted'> Descripción: <strong>{activity.description}</strong></small>
        </div>
        

        {/* Botón */}
        <div className="blue-button-container">
          <NavigateBlueButton to={to}  scrollToId={scrollToId}>
            {buttonText}
          </NavigateBlueButton>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="w-100"
            style={{ cursor: 'zoom-out' }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}