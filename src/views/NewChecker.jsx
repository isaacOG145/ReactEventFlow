import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";
import galleryIcon from "../assets/icons/galeria-de-imagenes.png";
import addIcon from "../assets/icons/mas.png";

export default function NewEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [gallery, setGallery] = useState([null, null, null]);

  const handleImageChange = (index, file) => {
    const newGallery = [...gallery];
    newGallery[index] = file;
    setGallery(newGallery);
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>

      <div className="content">
        <h1 className="text-center mb-4">Registrar checador</h1>

        <form className="register-form">
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="eventName" className="form-label">Nombre<span>*</span></label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="eventDate" className="form-label">Fecha<span>*</span></label>
              <input
                type="date"
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="eventDescription" className="form-label">Email<span>*</span></label>
              <input
                type="email"
                id="eventDescription"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">Teléfono<span>*</span></label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Contraseña<span>*</span></label>
              <input
                type="password"
                id="password"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña<span>*</span></label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="text-end mt-4">
            <BlueButton>Registrar nuevo</BlueButton>
          </div>
        </form>
      </div>
    </div>
  );
}