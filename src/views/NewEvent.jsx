import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";
import InputComponent from "../components/InputComponent";
import NavigateButton from "../components/NavigateButton";

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
        <h1>Crear Evento</h1>
        <form className="event-form">
          <InputComponent
            label="Nombre del Evento"
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />

          <InputComponent
            label="Fecha"
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />

          <div className="input-container">
            <label htmlFor="eventDescription" className="input-label">Descripción</label>
            <textarea
              id="eventDescription"
              className="input-field"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </div>

          <div className="gallery-container">
            <label className="input-label">Galería (mínimo 3 imágenes)</label>
            <div className="gallery-inputs">
              {gallery.map((image, index) => (
                <input
                  key={index}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="input-field"
                  required
                />
              ))}
            </div>
          </div>

          <BlueButton>Crear Evento</BlueButton>
        </form>
      </div>
    </div>
  );
}
