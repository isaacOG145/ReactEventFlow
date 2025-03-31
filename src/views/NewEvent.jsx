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
import ImageGalleryUpload from "../components/ImagesGalleryUpload";

export default function NewEvent() {
  const [formData, setFormData] = useState({
    name: "",
    speaker: "",
    description: "",
    date: ""
  });

  const [gallery, setGallery] = useState([null, null, null]);
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleImageChange = (index, file) => {
    const newGallery = [...gallery];
    newGallery[index] = file;
    setGallery(newGallery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    console.log("Galería de imágenes:", gallery);
    // Aquí iría la lógica para enviar los datos
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
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Segunda columna */}
              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="text"
                    label={
                      <>
                        <span className="label-text">Nombre del ponente</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="speaker"
                    value={formData.speaker}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-block">
                  <InputComponent 
                    type="text"
                    label={
                      <>
                        <img className="icon-sm" src={DetailsImg} alt="" />
                        <span className="label-text">Descripción</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <InputComponent
                  type="date"
                  label="Fecha del evento"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <ImageGalleryUpload
                  images={images}
                  onChange={setImages}
                  required
                  minImages={3}
                  error={images.length < 3 ? "Sube al menos 3 imágenes" : ""}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <BlueButton type="submit">Crear nuevo</BlueButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}