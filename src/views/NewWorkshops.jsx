import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import SelectInputComponent from "../components/SelectInput.Component";
import ImageGalleryUpload from "../components/ImagesGalleryUpload";
import TimeInputComponent from "../components/TimeInputComponent";

import time from '../assets/icons/time.png';
import People from '../assets/icons/people.png'
import DetailsImg from '../assets/icons/details.png';
import userIcon from '../assets/icons/usuario.png';
import EventIcon from '../assets/icons/event-date.png'

export default function NewWorkshop() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [images, setImages] = useState([]);
  const [workshopTime, setWorkshopTime] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    speaker: "",
    quota: "",
    description: ""
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  
    if (userId) {
      fetch(`http://localhost:8080/activity/events/byOwner/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response.json();
        })
        .then((data) => {
          if (data.type === "SUCCESS") {
            const activeEvents = data.result
              .filter(event => event.status === true && event.typeActivity === "EVENT")
              .map(event => ({
                value: event.id.toString(),
                label: event.name
              }));
            
            setEvents(activeEvents);
          } else {
            setError("No se encontraron eventos activos.");
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(`Error al cargar eventos: ${error.message}`);
          setLoading(false);
        });
    } else {
      setError("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (!formData.name || !formData.speaker || !formData.quota || 
        !formData.description || !workshopTime || !selectedEvent || 
        images.length < 3) {
      setError("Por favor, completa todos los campos y sube al menos 3 imágenes.");
      return;
    }

    // Formatear la hora al formato HH:MM:SS
    const formattedTime = `${workshopTime}:00`;

    const formDataToSend = new FormData();

    // Crear el objeto activityDTO para el taller
    const workshopDTO = {
      name: formData.name,
      description: formData.description,
      quota: parseInt(formData.quota),
      speaker: formData.speaker,
      time: formattedTime,
      fromActivity: {
        id: parseInt(selectedEvent)
      }
    };

    // Agregar el JSON como string
    formDataToSend.append("activity", new Blob([JSON.stringify(workshopDTO)], {
      type: "application/json"
    }));

    // Agregar las imágenes
    images.forEach((imageObj) => {
      if (imageObj && imageObj.file) {
        formDataToSend.append("images", imageObj.file);
      }
    });

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/activity/saveWorkshop', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el taller');
      }

      const result = await response.json();
      alert("Taller creado con éxito");
      
      // Resetear el formulario
      setFormData({
        name: "",
        speaker: "",
        quota: "",
        description: ""
      });
      setWorkshopTime("");
      setSelectedEvent("");
      setImages([]);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Hubo un error al crear el taller.");
    } finally {
      setLoading(false);
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
          <form onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Registrar taller</h1>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="text"
                    label={
                      <>
                        <img className="icon-sm" src={EventIcon} alt="" />
                        <span className="label-text">Nombre del taller</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

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
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-block">
                  <TimeInputComponent
                    label={
                      <>
                        <img className="icon-sm" src={time} alt="" />
                        <span className="label-text">Hora del taller</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="workshopTime"
                    value={workshopTime}
                    onChange={(e) => setWorkshopTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="number"
                    label={
                      <>
                        <img src={People} alt="Icono" className="icon-sm" />
                        <span className="label-text">Cupo</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="quota"
                    value={formData.quota}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-block">
                  <SelectInputComponent
                    options={events}
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    label={
                      <>
                        <img className="icon-sm" src={EventIcon} alt="" />
                        <span className="label-text">Evento asociado</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="fromActivity"
                    placeholder={loading ? "Cargando eventos..." : "Selecciona un evento"}
                    disabled={loading || events.length === 0}
                    required
                  />
                  {events.length === 0 && !loading && (
                    <p className="text-muted">No hay eventos activos disponibles</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-block">
                  <InputComponent
                    type="text"
                    label={
                      <>
                        <img className="icon-sm" src={DetailsImg} alt="" />
                        <span className="label-text">Descripción</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
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
                  <BlueButton type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Registrar"}
                  </BlueButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}