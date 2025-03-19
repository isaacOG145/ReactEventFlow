import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/iconStyles.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";
import InputComponent from "../components/InputComponent";


// iconos 
import telefono from "../assets/icons/telefono-inteligente.png"
import llave from "../assets/icons/llave.png";

export default function NewChecker() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Registrar Checador</h1>
        <form className="register-form">
          <InputComponent
            label="Nombre"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          
          <InputComponent
            label="Apellido"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <InputComponent
            
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <img src={telefono} class="icon-sm" />
          <InputComponent
            label="Teléfono"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
           <img src={llave} class="icon-sm" />
          <InputComponent
          
            label="Contraseña"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <img src={llave} class="icon-sm"/>
          <InputComponent
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <BlueButton>Registrar Nuevo</BlueButton>
        </form>
      </div>
    </div>
  );
}

