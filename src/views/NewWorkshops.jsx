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
import MessageModal from "../components/modals/MessageModal";

import userIcon from '../assets/icons/usuario.png';
import timeIcon from '../assets/icons/time.png';
import People from '../assets/icons/people.png';
import DetailsImg from '../assets/icons/details.png';
import EventIcon from '../assets/icons/event-date.png';

export default function NewWorkshop() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [workshopTime, setWorkshopTime] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    speaker: "",
    quota: "",
    description: ""
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL;
    if (userId && token) {
      fetch(`${apiUrl}/activity/events/byOwner/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
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
          if (activeEvents.length === 0) {
            setError("No hay eventos activos disponibles");
          }
        } else {
          setError("No se encontraron eventos activos.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(`Error al cargar eventos: ${error.message}`);
        setLoading(false);
        showNotification("Error al cargar eventos", "error");
      });
    } else {
      setError("No se encontró el ID de usuario o token.");
      setLoading(false);
      showNotification("No se identificó al usuario", "error");
    }
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    if (type !== 'loading') {
      setTimeout(() => {
        setNotification(prev => ({...prev, show: false}));
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showNotification("Por favor, ingresa el nombre del taller.", "warning");
      return false;
    }
    if (!formData.speaker.trim()) {
      showNotification("Por favor, ingresa el nombre del ponente.", "warning");
      return false;
    }
    if (!workshopTime.trim()) {
      showNotification("Por favor, ingresa la hora del taller.", "warning");
      return false;
    }
    if (!formData.quota.trim()) {
      showNotification("Por favor, ingresa el cupo del taller.", "warning");
      return false;
    }
    if (!selectedEvent) {
      showNotification("Por favor, selecciona un evento asociado.", "warning");
      return false;
    }
    if (!formData.description.trim()) {
      showNotification("Por favor, ingresa una descripción del taller.", "warning");
      return false;
    }
    if (images.length < 3) {
      showNotification("Por favor, sube al menos 3 imágenes.", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedTime = `${workshopTime}:00`;
    const formDataToSend = new FormData();

    const workshopDTO = {
      name: formData.name,
      description: formData.description,
      quota: parseInt(formData.quota),
      speaker: formData.speaker,
      time: formattedTime,
      fromActivity: { id: parseInt(selectedEvent) }
    };

    formDataToSend.append("activity", new Blob([JSON.stringify(workshopDTO)], {
      type: "application/json"
    }));

    images.forEach((imageObj) => {
      if (imageObj?.file) formDataToSend.append("images", imageObj.file);
    });

    try {
      showNotification("Guardando taller...", "loading");
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/activity/saveWorkshop`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el taller');
      }

      showNotification("Taller creado con éxito", "success");
      // Reset form
      setFormData({ name: "", speaker: "", quota: "", description: "" });
      setWorkshopTime("");
      setSelectedEvent("");
      setImages([]);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Hubo un error al crear el taller", "error");
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
                <InputComponent
                  type="text"
                  label={<><img src={EventIcon} className="icon-sm" alt="" />Nombre del taller<span className="required-asterisk">*</span></>}
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <InputComponent
                  type="text"
                  label={<><img src={userIcon} className="icon-sm" alt="" />Nombre del ponente<span className="required-asterisk">*</span></>}
                  id="speaker"
                  value={formData.speaker}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <TimeInputComponent
                  label={<><img src={timeIcon} className="icon-sm" alt="" />Hora del taller<span className="required-asterisk">*</span></>}
                  id="workshopTime"
                  value={workshopTime}
                  onChange={(e) => setWorkshopTime(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <InputComponent
                  type="number"
                  label={<><img src={People} className="icon-sm" alt="" />Cupo<span className="required-asterisk">*</span></>}
                  id="quota"
                  value={formData.quota}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
            </div>

            <div className="row">
              <SelectInputComponent
                options={events}
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                label={<><img src={EventIcon} className="icon-sm" alt="" />Evento asociado<span className="required-asterisk">*</span></>}
                id="fromActivity"
                placeholder="Selecciona un evento"
                disabled={loading || events.length === 0}
              />
              {events.length === 0 && !loading && (
                <p className="text-muted">No hay eventos activos disponibles</p>
              )}
            </div>

            <div className="row">
              <InputComponent
                type="text"
                label={<><img src={DetailsImg} className="icon-sm" alt="" />Descripción<span className="required-asterisk">*</span></>}
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <ImageGalleryUpload
              images={images}
              onChange={setImages}
              minImages={3}
            />

            <div className="row">
              <div className="col-md-9"></div>
              <div className="col-md-3">
                <BlueButton type="submit" disabled={loading}>
                  {loading ? "Cargando..." : "Registrar Taller"}
                </BlueButton>
              </div>
            </div>
          </form>
        </div>
      </div>

      <MessageModal
        show={notification.show}
        onClose={() => setNotification({...notification, show: false})}
        type={notification.type}
        message={notification.message}
      />
    </div>
  );
}