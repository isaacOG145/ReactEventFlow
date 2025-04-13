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
import MessageModal from "../components/modals/MessageModal";

import Event from "../assets/icons/event-name.png";
import EventDate from "../assets/icons/event-date.png";
import DetailsImg from "../assets/icons/details.png";

export default function NewEvent() {
  // Estados del formulario
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", // 'success', 'error', 'warning', 'loading'
  });

  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });

    if (type !== "loading") {
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    const validations = [
      { condition: !formData.name.trim(), message: "Por favor, ingresa el nombre del evento.", field: "name" },
      { condition: !formData.date, message: "Por favor, selecciona una fecha para el evento.", field: "date" },
      { condition: !formData.description.trim(), message: "Por favor, ingresa una descripción para el evento.", field: "description" },
      { condition: images.length < 3, message: "Por favor, sube al menos 3 imágenes del evento.", field: "images" },
    ];

    const failedValidation = validations.find((v) => v.condition);

    if (failedValidation) {
      showNotification(failedValidation.message, "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    showNotification("Guardando evento...", "loading");

    // Simulación de envío
    setTimeout(() => {
      showNotification("Evento creado con éxito", "success");
      setFormData({
        name: "",
        date: "",
        description: "",
      });
      setImages([]);
    }, 2000);
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
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block">
                  <DateInputComponent
                    value={formData.date}
                    onChange={(e) => handleInputChange({ id: "date", value: e.target.value })}
                    label={
                      <>
                        <img className="icon-sm" src={EventDate} alt="" />
                        <span className="label-text">Fecha</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="date"
                    required={true}
                    error={formData.date === "" ? "La fecha es obligatoria" : ""}
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
                id="description"
                value={formData.description}
                onChange={handleInputChange}
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
              <BlueButton type="submit">Crear nuevo</BlueButton>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de notificación */}
      <MessageModal
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        type={notification.type}
        message={notification.message}
      />
    </div>
  );
}