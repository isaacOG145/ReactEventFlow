import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/iconStyles.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import MessageModal from "../components/modals/MessageModal";

// Iconos
import cellphone from '../assets/icons/telefono-inteligente.png';
import sobre from '../assets/icons/sobres.png';
import userIcon from '../assets/icons/usuario.png';

export default function NewChecker() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Estado para el modal de notificación
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", // 'success', 'error', 'warning', 'loading'
  });

  // Función para mostrar notificaciones
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });

    // Auto-cerrar solo si no es de tipo loading
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
      { 
        condition: !formData.name.trim(), 
        message: "Por favor, ingresa el nombre del checador.",
        field: "name"
      },
      { 
        condition: !formData.lastName.trim(), 
        message: "Por favor, ingresa los apellidos del checador.",
        field: "lastName"
      },
      { 
        condition: !formData.email.includes("@") || !formData.email.includes("."), 
        message: "Por favor, ingresa un correo electrónico válido.",
        field: "email"
      },
      { 
        condition: !formData.phone, 
        message: "Por favor, ingresa un número de teléfono.",
        field: "phone"
      },
      { 
        condition: formData.phone && !/^\d+$/.test(formData.phone), 
        message: "El teléfono solo puede contener números.",
        field: "phone"
      }
    ];

    const failedValidation = validations.find(v => v.condition);
    
    if (failedValidation) {
      showNotification(failedValidation.message, "warning");
      return false;
    }
    
    return true;
  };

  const registerChecker = async (formData) => {
    try {
      let sentByUserId = localStorage.getItem("userId");

      showNotification("Registrando checador...", "loading");

      const response = await fetch("http://localhost:8080/user/saveChecker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sentByUser: { id: sentByUserId },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Detener el envío si la validación falla
    }

    try {
      const response = await registerChecker(formData);
      console.log("Checador registrado:", response);

      showNotification("Checador registrado exitosamente!", "success");

      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
      });

    } catch (error) {
      console.error("Error al registrar el checador:", error);
      showNotification(error.message || "Hubo un error al registrar el checador", "error");
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
          <h1 className="text-center mb-4">Registrar checador</h1>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-block p-3">
                  <InputComponent
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    label={
                      <>
                        <img src={userIcon} alt="Icono" className="icon-sm" />
                        <span className="label-text">Nombres</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="name"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block p-3">
                  <InputComponent
                    onChange={handleInputChange}
                    value={formData.lastName}
                    type="text"
                    label={
                      <>
                        <img src={userIcon} alt="Icono" className="icon-sm" />
                        <span className="label-text">Apellidos</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="lastName"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-block p-2">
                  <InputComponent
                    onChange={handleInputChange}
                    value={formData.email}
                    type="email"
                    label={
                      <>
                        <img src={sobre} alt="Icono" className="icon-sm" />
                        <span className="label-text">Correo electrónico</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="email"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block p-2">
                  <InputComponent
                    onChange={handleInputChange}
                    value={formData.phone}
                    type="tel"
                    label={
                      <>
                        <img src={cellphone} alt="Icono" className="icon-sm" />
                        <span className="label-text">Teléfono</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="phone"
                  />
                </div>
              </div>
            </div>


            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <BlueButton type="submit">
                  Registrar checador
                </BlueButton>
              </div>
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
