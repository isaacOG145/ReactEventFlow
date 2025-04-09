import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/iconStyles.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import CustomPasswordInput from "../components/CustomPasswordInput";
import BlueButton from "../components/BlueButton";
import MessageModal from "../components/modals/MessageModal"; // Importamos el modal para notificaciones

// mis iconos
import passwordIcon from '../assets/icons/llave.png';
import cellphone from '../assets/icons/telefono-inteligente.png';
import sobre from '../assets/icons/sobres.png';
import userIcon from '../assets/icons/usuario.png';

export default function NewChecker() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    rePassword: "",
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
    const newErrors = {};

    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.lastName) newErrors.lastName = "El apellido es obligatorio.";
    if (!formData.email.includes("@")) newErrors.email = "Ingresa un email válido.";
    if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    if (formData.password !== formData.rePassword) newErrors.rePassword = "Las contraseñas no coinciden.";
    if (!formData.phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "El teléfono solo puede contener números.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerChecker = async (formData) => {
    try {
      let sentByUserId = localStorage.getItem("userId");

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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mostrar notificación de validación
    showNotification("Validando formulario...", "loading");

    if (validateForm()) {
      try {
        // Mostrar notificación de registro en progreso
        showNotification("Guardando checador...", "loading");

        const response = await registerChecker(formData);
        console.log("Respuesta del servidor:", response);

        // Mostrar notificación de éxito
        showNotification("Checador registrado exitosamente", "success");

        // Limpiar el formulario
        setFormData({
          name: "",
          lastName: "",
          password: "",
          email: "",
          phone: "",
          rePassword: "",
        });
      } catch (error) {
        console.error("Error al registrar el checador:", error);

        // Mostrar notificación de error
        showNotification(error.message || "Hubo un error al registrar el checador", "error");
      }
    } else {
      // Mostrar notificación de advertencia
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
                    error={errors.name}
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
                    error={errors.lastName}
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
                    type="text"
                    label={
                      <>
                        <img src={sobre} alt="Icono" className="icon-sm" />
                        <span className="label-text">Correo electrónico</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="email"
                    error={errors.email}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block p-2">
                  <InputComponent
                    onChange={handleInputChange}
                    value={formData.phone}
                    type="text"
                    label={
                      <>
                        <img src={cellphone} alt="Icono" className="icon-sm" />
                        <span className="label-text">Teléfono</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="phone"
                    error={errors.phone}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-block p-2">
                  <CustomPasswordInput
                    value={formData.password}
                    onChange={handleInputChange}
                    label={
                      <>
                        <img className="icon-md" src={passwordIcon} alt="Icono" />
                        <span className="label-text">Ingresar contraseña</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="password"
                    error={errors.password}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block p-2">
                  <CustomPasswordInput
                    value={formData.rePassword}
                    onChange={handleInputChange}
                    label={
                      <>
                        <img className="icon-md" src={passwordIcon} alt="Icono" />
                        <span className="label-text">Confirmar contraseña</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="rePassword"
                    error={errors.rePassword}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 offset-md-9">
                <div className="form-block p-2">
                  <BlueButton type="submit">Registrar</BlueButton>
                </div>
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