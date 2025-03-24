import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/iconStyles.css'
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import CustomPasswordInput from "../components/CustomPasswordInput";
import BlueButton from "../components/BlueButton";

// mis iconos
import passwordIcon from '../assets/icons/llave.png'
import cellphone from '../assets/icons/telefono-inteligente.png';
import sobre from '../assets/icons/sobres.png';
import userIcon from '../assets/icons/usuario.png';

export default function NewChecker() {

  const registerChecker = async (formData) => {
    try {
      let sentByUserId = localStorage.getItem('userId');
  
      const response = await fetch('http://localhost:8080/user/saveChecker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData, // Incluye todos los datos del formulario
          sentByUser: { id: sentByUserId }, // Agrega el campo adicional
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

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
    // Validación del teléfono
    if (!formData.phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "El teléfono solo puede contener números.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await registerChecker(formData);
        console.log("Respuesta del servidor:", response);
        alert("Checador registrado exitosamente");

        // Limpiar el formulario
        setFormData({
          name: "",
          lastName: "",
          password: "",
          email: "",
          phone: ""
        });
      } catch (error) {
        console.error("Error al registrar el checador:", error);
        alert(error.message);
      }
    } else {
      console.log("Formulario con errores");
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
              {/* Primera columna */}
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

              {/* Segunda columna */}
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
              {/* Primera columna */}
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

              {/* Segunda columna */}
              <div className="col-md-6">
                <div className="form-block p-2">
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
            </div>
            <div className="row">
              {/* Primera columna */}
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

              {/* Segunda columna */}
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

              <div className="col-md-9">
                <div className="form-block p-2">

                </div>
              </div>


              <div className="col-md-3">
                <div className="form-block p-2">
                  <BlueButton type="submit">Registrar nuevo</BlueButton>
                </div>
              </div>
            </div>
          </form>




        </div>


      </div>
    </div>
  );
}