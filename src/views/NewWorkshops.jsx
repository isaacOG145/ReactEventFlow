import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import SelectInputComponent from "../components/SelectInput.Component";
import ImageGalleryUpload from "../components/ImagesGalleryUpload";

import passwordIcon from '../assets/icons/llave.png';
import cellphone from '../assets/icons/telefono-inteligente.png';
import sobre from '../assets/icons/sobres.png';
import userIcon from '../assets/icons/usuario.png';

export default function NewWorkshop() {
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { value: "op1", label: "Opción 1" },
    { value: "op2", label: "Opción 2" },
    { value: "op3", label: "Opción 3" },
  ];

  const [gallery, setGallery] = useState([null, null, null]);
  const [images, setImages] = useState([]);
  const [workshopTime, setWorkshopTime] = useState(""); // Estado para manejar solo la hora

  const handleTimeChange = (event) => {
    setWorkshopTime(event.target.value); // Guardar la hora seleccionada
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <div className="form">
          <form>
            <h1 className="text-center mb-4">Registrar taller</h1>
            <div className="row">
              {/* Primera columna */}
              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="text"
                    label={
                      <>
                        <img src={userIcon} alt="Icono" className="icon-sm" />
                        <span className="label-text">Nombre del taller</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="name"
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
                        <img src={userIcon} alt="Icono" className="icon-sm" />
                        <span className="label-text">Nombre del ponente</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="speaker"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              {/* Primera columna */}
              <div className="col-md-6">
                <div className="form-block">
                  <label htmlFor="time" className="input-label">
                    <img src={sobre} alt="Icono" className="icon-sm" />
                    <span className="label-text">Hora</span>
                    <span className="required-asterisk">*</span>
                  </label>
                  {/* Campo de hora */}
                  <input
                    type="time"
                    id="time"
                    value={workshopTime}
                    onChange={handleTimeChange}
                    className="input-field"
                    required
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
                        <img src={cellphone} alt="Icono" className="icon-sm" />
                        <span className="label-text">Cupo</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="quota"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <SelectInputComponent
                options={options}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                label={
                  <>
                    <span className="label-text">Evento asociado</span>
                    <span className="required-asterisk">*</span>
                  </>
                }
                id="fromActivity"
                placeholder="Selecciona un evento"
              />
            </div>

            <div className="row">
              <InputComponent
                type="text"
                label={
                  <>
                    <span className="label-text">Descripción</span>
                    <span className="required-asterisk">*</span>
                  </>
                }
                id="description"
              />
            </div>

            <ImageGalleryUpload
              images={images}
              onChange={setImages}
              required
              minImages={3}
              error={images.length < 3 ? "Sube al menos 3 imágenes" : ""}
            />

            <div className="row">
              <div className="col-md-9">
                <div className="form-block p-2"></div>
              </div>

              <div className="col-md-3">
                <div className="form-block p-2">
                  <BlueButton type="submit">Registrar</BlueButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
