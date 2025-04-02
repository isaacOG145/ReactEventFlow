import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

export default function AdminWorkshopDetails() {


  const handleReturn = () => {
    navigate(-1);
  }

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <div className="card-details">
          <h1>{eventData.name}</h1>
          <p><strong>Fecha:</strong> {eventData.date}</p>
          <p><strong>Descripción:</strong> {eventData.description}</p>

          <div className="col-6 d-flex gap-2">
            <a className="event-info">Ver checadores</a>
            <a className="event-info">Ver talleres</a>
          </div>

          {eventData.imageUrls.length > 0 ? (
            <Carrusel images={eventData.imageUrls} />
          ) : (
            <div className="alert alert-info">No hay imágenes disponibles para este evento</div>
          )}

          <div className="row mt-3">
            <div className="col-6"></div>
            <div className="col-3">
              <NavigatePurpleButton onClick={handleReturn}>
                Volver
              </NavigatePurpleButton>
            </div>
            <div className="col-3">
              <BlueButton onClick={handleEdit}>Actualizar</BlueButton>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
} 