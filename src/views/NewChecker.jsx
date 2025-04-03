import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/iconStyles.css'
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import CustomPasswordInput from "../components/CustomPasswordInput";
import BlueButton from "../components/BlueButton";

// Mis iconos
import passwordIcon from '../assets/icons/llave.png'
import cellphone from '../assets/icons/telefono-inteligente.png';
import sobre from '../assets/icons/sobres.png';
import userIcon from '../assets/icons/usuario.png';

// Modales
import SuccessModal from "../components/modals/SuccessModal";
import FailSuccessModal from "../components/modals/FailSuccessModal";

export default function NewChecker() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const handleCloseSuccess = () => setShowSuccessModal(false);
  const handleCloseFail = () => setShowFailModal(false);

  const registerChecker = async (formData) => {
    try {
      let sentByUserId = localStorage.getItem('userId');
  
      const response = await fetch('http://localhost:8080/user/saveChecker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sentByUser: { id: sentByUserId } }),
      });
  
      if (!response.ok) {
        throw new Error('Error en el registro');
      }
  
      return await response.json();
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.lastName) newErrors.lastName = "El apellido es obligatorio.";
    if (!formData.email.includes("@")) newErrors.email = "Ingresa un email válido.";
    if (formData.password.length < 8) newErrors.password = "Debe tener al menos 8 caracteres.";
    if (formData.password !== formData.rePassword) newErrors.rePassword = "Las contraseñas no coinciden.";
    if (!formData.phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Solo puede contener números.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await registerChecker(formData);
        setShowSuccessModal(true);
        setFormData({ name: "", lastName: "", password: "", email: "", phone: "", rePassword: "" });
      } catch (error) {
        setShowFailModal(true);
      }
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
                    value={formData.lastName}
                    onChange={handleInputChange}
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
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.phone}
                    onChange={handleInputChange}
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
              <div className="col-md-9"></div>
              <div className="col-md-3">
                <div className="form-block p-2">
                  <BlueButton type="submit">Registrar</BlueButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modales */}   
      <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccess} />
      <FailSuccessModal show={showFailModal} handleClose={handleCloseFail} />
    </div>
  );
}
