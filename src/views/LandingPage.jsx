import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CustomerRootHeader from "../components/CustomerRootHeader";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="content text-center p-4">
        <h2>Sobre nuestros servicios</h2>
        <p>Nuestra plataforma está creada para simplificar la gestión de eventos para compañías y organizaciones. Además, ofrecemos la posibilidad de dar a conocerlos e inscribirse al público en general.</p>
        
        <div className="row my-4">
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>📅 Organiza tus eventos</h5>
              <p>Crea y gestiona tus eventos y publícalos en nuestra plataforma.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>✅ Asigna responsabilidades</h5>
              <p>Asigna roles a tu equipo para tener un mejor control de acceso.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>📩 Inscríbete a eventos</h5>
              <p>Encuentra eventos de interés e inscríbete a ellos en línea.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>📲 Accede por QR desde tu teléfono</h5>
              <p>Facilita el ingreso a los eventos usando el QR de nuestra app.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <Carousel>
                <Carousel.Item>
                  <img src="/images/feria-ciencias1.jpg" className="d-block w-100" alt="Feria de ciencias 1" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="/images/feria-ciencias2.jpg" className="d-block w-100" alt="Feria de ciencias 2" />
                </Carousel.Item>
              </Carousel>
              <div className="card-body">
                <h5>Feria de ciencias</h5>
                <p>📅 12-06-2025</p>
                <p>Un evento para que estudiantes puedan exponer sus experimentos a la comunidad.</p>
                <button className="btn btn-primary" onClick={() => navigate('/details')}>Ver detalles</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <Carousel>
                <Carousel.Item>
                  <img src="/images/feria-chapultepec1.jpg" className="d-block w-100" alt="Feria de Chapultepec 1" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="/images/feria-chapultepec2.jpg" className="d-block w-100" alt="Feria de Chapultepec 2" />
                </Carousel.Item>
              </Carousel>
              <div className="card-body">
                <h5>Feria de Chapultepec</h5>
                <p>📅 12-06-2025</p>
                <p>Feria del condado con actividades para todas las edades.</p>
                <button className="btn btn-primary" onClick={() => navigate('/details')}>Ver detalles</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
