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
        <h1>Crear evento</h1>

        <form className="event-form">
          <div className="mb-3 d-flex justify-content-between">
            <div className="w-50 me-3">
              <label htmlFor="eventName" className="form-label">Nombre del evento<span>*</span></label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="w-50">
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

          <div className="mb-3">
            <label htmlFor="eventDescription" className="form-label">Descripción<span>*</span></label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Galería (mínimo 3 imágenes)</label>
            <div className="d-flex gap-3">
              {gallery.map((image, index) => (
                <div key={index} className="position-relative">
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="preview" className="img-thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  ) : (
                    <img src={index === gallery.length - 1 ? addIcon : galleryIcon} alt="icon" className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <BlueButton>Crear nuevo</BlueButton>
          </div>
        </form>
      </div>
    </div>
  );
}
