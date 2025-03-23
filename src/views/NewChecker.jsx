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


  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>

      <div className="content">


        <div className="form">
          <h1 className="text-center mb-4">Registrar checador</h1>

          <form>
            <div className="row">
              {/* Primera columna */}
              <div className="col-md-6">
                <div className="form-block p-3">
                  <InputComponent
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

              {/* Segunda columna */}
              <div className="col-md-6">
                <div className="form-block p-3">
                  <InputComponent
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
              {/* Primera columna */}
              <div className="col-md-6">
                <div className="form-block p-2">
                  <InputComponent
                    type="text"
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

              {/* Segunda columna */}
              <div className="col-md-6">
                <div className="form-block p-2">
                  <div className="form-block p-2">
                    <InputComponent
                      type="text"
                      label={
                        <>
                          <img src={cellphone} alt="Icono" className="icon-sm" />
                          <span className="label-text">Teléfono</span>
                          <span className="required-asterisk">*</span>
                        </>
                      }
                      id="cellphone"
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

                    label={
                      <>
                        <img className="icon-md" src={passwordIcon} alt="Icono" />
                        <span className="label-text">Ingresar contraseña</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="password"
                  />
                </div>
              </div>

              {/* Segunda columna */}
              <div className="col-md-6">
                <div className="form-block p-2">
                  <CustomPasswordInput

                    label={
                      <>
                        <img className="icon-md" src={passwordIcon} alt="Icono" />
                        <span className="label-text">Confirmar contraseña</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="repeatPassword"
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
                  <BlueButton>Registrar nuevo</BlueButton>
                </div>
              </div>
            </div>
          </form>




        </div>


      </div>
    </div>
  );
}