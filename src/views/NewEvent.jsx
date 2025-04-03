import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/iconStyles.css";

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";
import InputComponent from "../components/InputComponent";
import DateInputComponent from "../components/DateInputComponent";
import ImageGalleryUpload from "../components/ImagesGalleryUpload";
import SuccessModal from "../components/modals/SuccessModal";

import Event from '../assets/icons/event-name.png';
import EventDate from '../assets/icons/event-date.png';
import DetailsImg from '../assets/icons/details.png';

export default function NewEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDateChange = (e) => {
    const isoDate = e.target.value;
    const dateOnly = isoDate.split('T')[0];
    setEventDate(dateOnly);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !eventDate || !eventDescription || images.length < 3) {
      alert("Por favor, completa todos los campos y sube al menos 3 imágenes.");
      return;
    }

    const formData = new FormData();
    const activityDTO = {
      ownerActivity: { id: localStorage.getItem("userId") },
      name: eventName,
      description: eventDescription,
      date: eventDate + 'T00:00:00Z'
    };

    formData.append("activity", new Blob([JSON.stringify(activityDTO)], {
      type: "application/json"
    }));

    images.forEach((imageObj) => {
      if (imageObj && imageObj.file) {
        formData.append("images", imageObj.file);
      }
    });

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/activity/saveEvent', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el evento');
      }

      setShowSuccessModal(true);
      setEventName("");
      setEventDate("");
      setEventDescription("");
      setImages([]);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Hubo un error al crear el evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <div className="form">
          <form className="event-form" onSubmit={handleSubmit}>
            <h1>Crear evento</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="text"
                    label={
                      <>
                        <img className="icon-sm" src={Event} alt="" />
                        <span className="label-text">Nombre del evento</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-block">
                  <DateInputComponent
                    value={eventDate}
                    onChange={handleDateChange}
                    label={
                      <>
                        <img className="icon-sm" src={EventDate} alt="" />
                        <span className="label-text">Fecha</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="event-date"
                    required={true}
                    error={eventDate === "" ? "La fecha es obligatoria" : ""}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <InputComponent
                type="text"
                label={
                  <>
                    <img className="icon-sm" src={DetailsImg} alt="" />
                    <span className="label-text">Descripción</span>
                    <span className="required-asterisk">*</span>
                  </>
                }
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <ImageGalleryUpload
                images={images}
                onChange={setImages}
                required
                minImages={3}
                error={images.length < 3 ? "Sube al menos 3 imágenes" : ""}
              />
            </div>
            <div className="text-center mt-4">
              <BlueButton type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Crear nuevo"}
              </BlueButton>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)} />
    </div>
  );
}
