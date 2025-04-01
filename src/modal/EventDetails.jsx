// src/modal/EditEvent.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/iconStyles.css";
import InputComponent from "../components/InputComponent";
import ImageGalleryUpload from "../components/ImagesGalleryUpload";
import EventBlueButton from "../modal/button/EventBlueButton";
import EventPurpleButton from "../modal/button/EventPurpleButton";

export default function EditEvent({ show, handleClose, event }) {
  const [eventName, setEventName] = useState(event?.name || "");
  const [eventDate, setEventDate] = useState(event?.date || "");
  const [eventDescription, setEventDescription] = useState(event?.description || "");
  const [images, setImages] = useState([]);

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Actualizar Evento</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form className="event-form">
              <div className="row">
                <div className="col-md-6">
                  <InputComponent
                    type="text"
                    label="Nombre del evento *"
                    id="name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <InputComponent
                    type="date"
                    label="Fecha del evento *"
                    id="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <InputComponent
                  type="textarea"
                  label="Descripción *"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>
              <div className="row mt-3">
                <ImageGalleryUpload
                  images={images}
                  onChange={setImages}
                  required
                  minImages={3}
                  error={images.length < 3 ? "Sube al menos 3 imágenes" : ""}
                />
              </div>
              <div className="mt-4 d-grid gap-4">
                <EventBlueButton className="w-100 mb-2">Actualizar evento</EventBlueButton>
                <EventPurpleButton className="w-100" onClick={handleClose}>Cancelar</EventPurpleButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}