import React from "react";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/iconStyles.css'

// Importa tus imágenes (ejemplo)
import Img1 from '../assets/icons/user-avatar.png';
import Img2 from '../assets/icons/enrollment.png';
import Img3 from '../assets/icons/qr.png';
import Calendar from '../assets/icons/calendario.png';

import BlueButton from "./BlueButton";


export default function ActivityCard() {
  return (

      <div className="card-activity col-md-8 col-lg-4">
        
        {/* Carrusel con altura controlada */}
        <Carousel 
          fade 
          indicators={false} 
          controls={true} 
          className="activity-carousel"
          interval={5000} // Cambia cada 5 segundos
        >
          <Carousel.Item>
            <div className="carousel-image-container">
              <img
                src={Img1}
                alt="Participantes del evento"
                className="carousel-image"
              />
            </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div className="carousel-image-container">
              <img
                src={Img2}
                alt="Expositor en el escenario"
                className="carousel-image"
              />
            </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div className="carousel-image-container">
              <img
                src={Img3}
                alt="Sesión interactiva con asistentes"
                className="carousel-image"
              />
            </div>
          </Carousel.Item>
        </Carousel>

        {/* Contenido de la tarjeta */}
        <div className="card-activity-content p-4">
          <h3 className="h2 mb-3">Feria de Ciencias 2023</h3>
          <div className="d-flex align-items-center mb-3">
            
            <span className="date-text mb-1">
                <img className="icon-sm" src={Calendar} alt="" /> fecha
            </span>
          </div>
          <p className="mb-4">
            Evento anual donde estudiantes presentan sus proyectos científicos innovadores.
            Incluye talleres interactivos y competencias amistosas.
          </p>
          <BlueButton>Ver detalles</BlueButton>
        </div>
      </div>
    
  );
}