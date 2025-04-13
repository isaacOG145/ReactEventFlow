import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import SelectInputComponent from "../components/SelectInput.Component";
import ImageGalleryUpload from "../components/ImagesGalleryUpload";
import TimeInputComponent from "../components/TimeInputComponent";
import MessageModal from "../components/modals/MessageModal";

import cellphone from '../assets/icons/telefono-inteligente.png';
import sobre from '../assets/icons/sobres.png';
import userIcon from '../assets/icons/usuario.png';
import timeIcon from '../assets/icons/time.png';

export default function NewWorkshop() {
  // Estados
  const [formData, setFormData] = useState({
    name: "",
    speaker: "",
    quota: "",
    description: "",
  });
  const [workshopTime, setWorkshopTime] = useState(""); // Estado para la hora del taller
  const [selectedOption, setSelectedOption] = useState("");
  const [images, setImages] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Opciones temporales para el selector
  const options = [
    { value: "op1", label: "Opción 1" },
    { value: "op2", label: "Opción 2" },
    { value: "op3", label: "Opción 3" },
  ];

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
      { condition: !formData.name.trim(), message: "Por favor, ingresa el nombre del taller.", field: "name" },
      { condition: !formData.speaker.trim(), message: "Por favor, ingresa el nombre del ponente.", field: "speaker" },
      { condition: !workshopTime.trim(), message: "Por favor, ingresa la hora del taller.", field: "time" },
      { condition: !formData.quota.trim(), message: "Por favor, ingresa el cupo del taller.", field: "quota" },
      { condition: !selectedOption, message: "Por favor, selecciona un evento asociado.", field: "fromActivity" },
      { condition: !formData.description.trim(), message: "Por favor, ingresa una descripción del taller.", field: "description" },
      { condition: images.length < 3, message: "Por favor, sube al menos 3 imágenes.", field: "images" },
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

    showNotification("Guardando taller...", "loading");

    // Aquí iría la lógica para enviar el formulario al servidor
    setTimeout(() => {
      showNotification("Taller registrado exitosamente.", "success");
      setFormData({
        name: "",
        speaker: "",
        quota: "",
        description: "",
      });
      setWorkshopTime("");
      setSelectedOption("");
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
          <form onSubmit={handleSubmit}>
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
                        <img src={userIcon} alt="Icono" className="icon-sm" />
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
              {/* Hora del taller */}
              <div className="col-md-6">
                <div className="form-block">
                  <TimeInputComponent
                    label={
                      <>
                        <img src={timeIcon} alt="Icono" className="icon-sm" />
                        <span className="label-text">Hora del taller</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="workshopTime"
                    value={workshopTime}
                    onChange={(e) => setWorkshopTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Cupo */}
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
                    value={formData.quota}
                    onChange={handleInputChange}
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
                value={formData.description}
                onChange={handleInputChange}
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
