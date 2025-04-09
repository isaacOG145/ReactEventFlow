import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/iconStyles.css";

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import MessageModal from "../components/modals/MessageModal";

export default function MyWorkshops() {
  const [formData, setFormData] = useState({
    name: "",
    speaker: "",
    time: "",
    associatedEvent: "",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    if (type !== "loading") {
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
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
    const newErrors = {};

    if (!formData.name) newErrors.name = "El nombre del taller es obligatorio.";
    if (!formData.speaker) newErrors.speaker = "El nombre del ponente es obligatorio.";
    if (!formData.time) newErrors.time = "La hora del taller es obligatoria.";
    if (!formData.associatedEvent) newErrors.associatedEvent = "El evento asociado es obligatorio.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerWorkshop = async (formData) => {
    try {
      showNotification("Guardando taller...", "loading");
      const response = await fetch("http://localhost:8080/activity/workshops/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar el taller");
      }

      const data = await response.json();
      showNotification("Taller registrado exitosamente", "success");
      return data;
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Hubo un error al registrar el taller", "error");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    showNotification("Validando formulario...", "loading");

    if (validateForm()) {
      try {
        await registerWorkshop(formData);
        setFormData({
          name: "",
          speaker: "",
          time: "",
          associatedEvent: "",
        });
      } catch (error) {
        console.error("Error al registrar el taller:", error);
      }
    } else {
      showNotification("Por favor, completa todos los campos correctamente.", "warning");
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
          <h1 className="text-center mb-4">Registrar Taller</h1>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <InputComponent
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  label="Nombre del Taller"
                  id="name"
                  error={errors.name}
                />
              </div>
              <div className="col-md-6">
                <InputComponent
                  value={formData.speaker}
                  onChange={handleInputChange}
                  type="text"
                  label="Ponente"
                  id="speaker"
                  error={errors.speaker}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputComponent
                  value={formData.time}
                  onChange={handleInputChange}
                  type="time"
                  label="Hora"
                  id="time"
                  error={errors.time}
                />
              </div>
              <div className="col-md-6">
                <InputComponent
                  value={formData.associatedEvent}
                  onChange={handleInputChange}
                  type="text"
                  label="Evento Asociado"
                  id="associatedEvent"
                  error={errors.associatedEvent}
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <BlueButton type="submit">Registrar Taller</BlueButton>
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