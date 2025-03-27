import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/iconStyles.css";

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";

import DetailsImg from '../assets/icons/details.png';
import galleryIcon from "../assets/icons/galeria-de-imagenes.png";
import addIcon from "../assets/icons/mas.png";
import InputComponent from "../components/InputComponent";
import DateInputComponent from "../components/DateInputComponent"; // Importamos el nuevo componente
import ImageGalleryUpload from "../components/ImagesGalleryUpload";

export default function NewEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(""); // Este estado será para la fecha
  const [eventDescription, setEventDescription] = useState("");
  const [gallery, setGallery] = useState([null, null, null]);

  // temporal para prueba
  const [images, setImages] = React.useState([]);

  const handleImageChange = (index, file) => {
    const newGallery = [...gallery];
    newGallery[index] = file;
    setGallery(newGallery);
  };

  const handleDateChange = (e) => {
    setEventDate(e.target.value); // Actualiza el estado con la fecha seleccionada
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>

      <div className="content">
        <div className="form">
          <form className="event-form">
            <h1>Crear evento</h1>
            <div className="row">
              {/* Primera columna */}
              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="text"
                    label={
                      <>
                        <span className="label-text">Nombre del taller</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="name"
                  />
                </div>
              </div>

              {/* Segunda columna con el input para la fecha usando DateInputComponent */}
              <div className="col-md-6">
                <div className="form-block">
                  <DateInputComponent
                    value={eventDate}
                    onChange={handleDateChange} // Maneja el cambio de fecha
                    label={
                      <>
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
              <BlueButton>Crear nuevo</BlueButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
