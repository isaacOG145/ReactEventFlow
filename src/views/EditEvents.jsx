import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";
import SuccessModal from "../modal/SuccessfulRegistration";
import ImageGallery from "../components/ImageGallery";

export default function EditEvent() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  
  // Estado para manejar la carga
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [gallery, setGallery] = useState([null, null, null]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Simulación de carga de datos
        console.log("Cargando evento con ID:", id);
        
        // Datos de ejemplo - en producción harías una llamada API
        const mockEvent = {
          id: id,
          name: "Nuevo Evento",
          description: "Descripción del evento",
          date: new Date().toISOString().split('T')[0],
          gallery: [null, null, null]
        };
        
        setEvent(mockEvent);
        setEventName(mockEvent.name);
        setEventDate(mockEvent.date);
        setEventDescription(mockEvent.description);
        setGallery(mockEvent.gallery);
        
      } catch (error) {
        console.error("Error al cargar el evento:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="app-container">
        <CustomerRootHeader />
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="content">
          <p>Cargando evento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>

      <div className="content">
        <h1>Editar Evento #{id}</h1>
        
        {/* Resto del formulario de edición */}
        <form>
          {/* Campos del formulario igual que en NewEvent */}
        </form>
      </div>
    </div>
  );
}