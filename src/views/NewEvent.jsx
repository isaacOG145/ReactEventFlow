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
import MessageModal from '../components/modals/MessageModal';

import Event from '../assets/icons/event-name.png';
import EventDate from '../assets/icons/event-date.png';
import DetailsImg from '../assets/icons/details.png';

export default function NewEvent() {
  // Estados del formulario
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [images, setImages] = useState([]);
  
  // Estado para el modal de notificación
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" // 'success', 'error', 'warning', 'loading'
  });

  const handleDateChange = (e) => {
    // Guardamos el valor directamente sin transformaciones
    setEventDate(e.target.value);
  };

  // Función para mostrar notificaciones
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Auto-cerrar solo si no es de tipo loading
    if (type !== 'loading') {
      setTimeout(() => {
        setNotification(prev => ({...prev, show: false}));
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (!eventName || !eventDate || !eventDescription || images.length < 3) {
      showNotification("Por favor, completa todos los campos y sube al menos 3 imágenes.", "warning");
      return;
    }

    const formData = new FormData();
    const activityDTO = {
      ownerActivity: { id: localStorage.getItem("userId") },
      name: eventName,
      description: eventDescription,
      date: `${eventDate}T00:00:00Z` // Formato UTC
    };

    // Agregar el JSON como string
    formData.append("activity", new Blob([JSON.stringify(activityDTO)], {
      type: "application/json"
    }));

    // Agregar las imágenes
    images.forEach((imageObj) => {
      if (imageObj && imageObj.file) {
        formData.append("images", imageObj.file);
      }
    });

    try {
      // Mostrar estado de carga
      showNotification("Guardando evento...", "loading");
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/activity/saveEvent`, {
        method: 'POST',
        body: formData,
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el evento');
      }

      const result = await response.json();
      
      // Mostrar éxito
      showNotification("Evento creado con éxito", "success");
      
      // Resetear formulario
      setEventName("");
      setEventDate("");
      setEventDescription("");
      setImages([]);

    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Hubo un error al crear el evento", "error");
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
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block">
                  <DateInputComponent
                    value={eventDate}
                    onChange={handleDateChange}
                    label={
                      <>
                        <img className="icon-sm" src={EventDate} alt="" />
                        <span className="label-text">Fecha</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="event-date"
                    required={true}
                    error={eventDate === "" ? "La fecha es obligatoria" : ""}
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
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>

            <div className="row">
              <ImageGalleryUpload
                images={images}
                onChange={setImages}
                minImages={3}
              />
            </div>

            <div className="text-center mt-4">
              <BlueButton type="submit">
                Crear nuevo
              </BlueButton>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de notificación */}
      <MessageModal 
        show={notification.show}
        onClose={() => setNotification({...notification, show: false})}
        type={notification.type}
        message={notification.message}
      />
    </div>
  );
}