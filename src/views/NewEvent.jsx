import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";
import SuccessModal from "../modal/SuccessfulRegistration";
import ImageGallery from "../components/ImageGallery"; // Importar el nuevo componente

export default function NewEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [gallery, setGallery] = useState([null, null, null]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImageChange = (index, file) => {
    const newGallery = [...gallery];
    newGallery[index] = file;
    setGallery(newGallery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setEventName("");
    setEventDate("");
    setEventDescription("");
    setGallery([null, null, null]);
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>

      <div className="content">
        <h1>Crear evento</h1>

        <form className="event-form" onSubmit={handleSubmit}>
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

          {/* Usar el componente ImageGallery */}
          <ImageGallery 
            gallery={gallery} 
            handleImageChange={handleImageChange} 
            required 
          />

          <div className="text-center mt-4">
            <BlueButton type="submit">Crear nuevo</BlueButton>
          </div>
        </form>
      </div>

      <SuccessModal 
        show={showSuccessModal} 
        handleClose={handleCloseModal}
      />
    </div>
  );
}