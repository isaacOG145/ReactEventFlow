import React from 'react';
import BlueButton from './BlueButton';
import { Carousel } from 'react-bootstrap';

export default function ActivityCard({ activity, onDetailsClick }) {
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
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Contenido de la tarjeta */}
      <div className="card-activity-content p-4">
        <h3 className="h2 mb-3">{activity.name}</h3>
        <div className="d-flex align-items-center mb-3">
          <span className="date-text mb-1">
            {/* Icono de calendario y la fecha del evento */}
            
          </span>
        </div>
        <p className="mb-4">{activity.description}</p>

        {/* Botón para ver detalles del evento */}
        <BlueButton onClick={onDetailsClick}>Ver detalles</BlueButton>
      </div>
    </div>
  );
}
