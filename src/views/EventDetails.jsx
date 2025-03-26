import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CustomerRootHeader from "../components/CustomerRootHeader";

export default function EventDetails() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="content p-4">
        <div className="event-details card p-4 shadow-sm">
          <h2>Feria de ciencias</h2>
          <p>📅 12-06-2025</p>
          <p>Evento anual para crear que estudiantes puedan exponer sus experimentos a la comunidad.</p>
          <Carousel>
            <Carousel.Item>
              <img src="/images/feria-ciencias1.jpg" className="d-block w-100" alt="Feria de ciencias 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/feria-ciencias2.jpg" className="d-block w-100" alt="Feria de ciencias 2" />
            </Carousel.Item>
          </Carousel>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/Crear')}>Inscribirse</button>
        </div>

        <h3 className="mt-5">Talleres del evento</h3>
        <div className="workshop-details card p-4 shadow-sm mt-3">
          <img src="/images/exhibicion-robots.jpg" className="card-img-top" alt="Exhibición de robots" />
          <div className="card-body">
            <h5>Exhibición de robots</h5>
            <p>⏰ 16:00</p>
            <p>Exhibiciones mostradas por profesionales y estudiantes.</p>
            <a href="#" className="text-primary">Ver más</a>
            <button className="btn btn-primary mt-3 w-100" onClick={() => navigate('/Crear')}>Inscribirse al evento</button>
          </div>
        </div>
      </div>
    </div>
  );
}
