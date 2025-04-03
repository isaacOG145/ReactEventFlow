import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/tableStyles.css";

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import Carrusel from "../components/Carrusel";
import BlueButton from "../components/BlueButton";
import NavigatePurpleButton from "../components/NavigatePurpleButton";
import UpdateEventModal from "../components/modals/UpdateEventModal";

export default function AdminEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    imageUrls: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateSuccess = (updatedEvent) => {
    // Actualizar los datos locales con la respuesta del servidor
    const formattedDate = new Date(updatedEvent.date).toLocaleDateString(
      "es-ES",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    setEventData({
      ...updatedEvent,
      date: formattedDate,
    });
    setShowModal(false);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/activity/event/findById/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.type === "SUCCESS") {
          // Guardar la fecha original para el modal
          const eventDate = data.result.date;

          // Formatear la fecha para mostrar
          const formattedDate = new Date(eventDate).toLocaleDateString(
            "es-ES",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          setEventData({
            id: data.result.id,
            name: data.result.name,
            description: data.result.description,
            date: formattedDate,
            originalDate: eventDate, // Guardamos la fecha original sin formatear
            imageUrls: data.result.imageUrls || [],
          });
        } else {
          throw new Error(data.text || "Error al obtener los datos del evento");
        }
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleReturn = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="app-container">
        <CustomerRootHeader />
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando detalles del evento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <CustomerRootHeader />
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="content">
          <div className="alert alert-danger" role="alert">
            Error al cargar los datos: {error}
          </div>
          <div className="text-center">
            <NavigatePurpleButton onClick={() => window.location.reload()}>
              Reintentar
            </NavigatePurpleButton>
          </div>
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
        <div className="card-details">
          <h1>{eventData.name}</h1>
          <p>
            <strong>Fecha:</strong> {eventData.date}
          </p>
          <p>
            <strong>Descripción:</strong> {eventData.description}
          </p>

          <div className="col-6 d-flex gap-2">
            <a className="event-info">Ver checadores</a>
            <a className="event-info">Ver talleres</a>
          </div>

          {eventData.imageUrls.length > 0 ? (
            <Carrusel images={eventData.imageUrls} />
          ) : (
            <div className="alert alert-info">
              No hay imágenes disponibles para este evento
            </div>
          )}

          <div className="row mt-3">
            <div className="col-6"></div>
            <div className="col-3">
              <NavigatePurpleButton onClick={handleReturn}>
                Volver
              </NavigatePurpleButton>
            </div>
            <div className="col-3">
              <BlueButton onClick={handleEdit}>Actualizar</BlueButton>
            </div>
          </div>
        </div>

        <div className="row mt-3 d-flex justify-content-center">
          <div className="col-10">
            <h1>Asistencias</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nombre del invitado</th>
                    <th>Nombre del evento</th>
                    <th className="d-flex justify-content-center">Asistencia 0/1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-blue">1</td>
                    <td className="td-blue">Nombre del invitado</td>
                    <td>Nombre del evento</td>
                    <td className="d-flex justify-content-center">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <UpdateEventModal
        showModal={showModal}
        eventData={{
          ...eventData,
          date: eventData.originalDate || eventData.date, // Usamos la fecha sin formatear para el modal
        }}
        handleClose={handleCloseModal}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
}
