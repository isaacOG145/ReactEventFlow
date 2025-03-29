import React, { useState } from 'react';
import BlueButton from './BlueButton';
import { Carousel, Modal } from 'react-bootstrap';

export default function ActivityCard({ activity, label }) {
  const [showModal, setShowModal] = useState(false); // Para mostrar el modal de imagen ampliada
  const [selectedImage, setSelectedImage] = useState(''); // Imagen seleccionada

  // Función para abrir el modal con la imagen
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <div className="card-activity col-md-8 col-lg-4">
      {/* Carrusel con las imágenes de la actividad */}
      <Carousel
        fade
        indicators={false}
        controls={true}
        className="activity-carousel"
        interval={5000} // Cambia cada 5 segundos
      >
        {activity.imageUrls.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-image-container">
              <img
                src={imageUrl}
                alt={`Imagen ${index + 1} de la actividad`}
                className="carousel-image"
                onClick={() => handleImageClick(imageUrl)} // Al hacer clic, se abre el modal
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Contenido de la tarjeta */}
      <div className="card-activity-content p-4">
        <h3 className="h2 mb-3">{activity.name}</h3>

        {/* Aquí mostramos la etiqueta de fecha con el ícono */}
        {label && (
          <div className="d-flex align-items-center mb-3">
            {label}  {/* Mostramos el label que contiene el ícono y la fecha */}
          </div>
        )}

        <p className="mb-4">{activity.description}</p>

        {/* Botón para ver detalles del evento */}
        <BlueButton onClick={() => console.log("Detalles del evento (navegación eliminada)")} >Ver detalles</BlueButton>
      </div>

      {/* Modal para mostrar la imagen ampliada */}
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
