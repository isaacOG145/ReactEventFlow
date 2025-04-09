import React, { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import ViewDetailsComponent from "../components/iconsComponent/ViewDetailsComponent";
import EditComponent from "../components/iconsComponent/EditComponent";
import UpdateEventModal from "../components/modals/UpdateEventModal";
import ChangeStatus from "../components/iconsComponent/ChangeStatus";
import MessageModal from "../components/modals/MessageModal";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    if (type !== "loading") {
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        showNotification("Cargando eventos...", "loading");
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('No se encontró userId en el localStorage');

        const response = await fetch(`http://localhost:8080/activity/events/byOwner/${userId}`);
        if (!response.ok) throw new Error('Error al cargar los eventos');

        const data = await response.json();
        if (data.type === "SUCCESS") {
          setEvents(data.result);
          showNotification("Eventos cargados exitosamente", "success");
        } else {
          throw new Error('No se encontraron eventos');
        }
      } catch (err) {
        setError(err.message);
        showNotification(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      showNotification("Actualizando estado...", "loading");
      const response = await fetch(`http://localhost:8080/activity/change-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === id ? { ...event, status: !event.status } : event
          )
        );
        showNotification("Estado actualizado exitosamente", "success");
      } else {
        showNotification("Error al actualizar estado", "error");
      }
    } catch (error) {
      showNotification("Error al realizar la solicitud", "error");
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      showNotification("Actualizando evento...", "loading");
      const response = await fetch(`http://localhost:8080/activity/events/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) throw new Error('Error al actualizar el evento');

      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      handleCloseModal();
      showNotification("Evento actualizado exitosamente", "success");
    } catch (err) {
      showNotification("Error al actualizar el evento", "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEventToEdit(null);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'dd MMMM yyyy', { locale: es });
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Mis eventos</h1>
        {loading ? (
          <div className="text-center mt-5">Cargando eventos...</div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            Error al cargar los eventos: {error}
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id}>
                    <td className="td-blue">{index + 1}</td>
                    <td>{event.name}</td>
                    <td className="td-blue">{event.description}</td>
                    <td>{formatDate(event.date)}</td>
                    <td className="actions">
                      <div>
                        <ViewDetailsComponent to={`/administrar/detalles-evento/${event.id}`} />
                        <EditComponent onClick={() => setEventToEdit(event)} />
                        <ChangeStatus
                          currentStatus={event.status}
                          onChangeStatus={() => handleChangeStatus(event.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && eventToEdit && (
        <UpdateEventModal
          showModal={showModal}
          eventData={eventToEdit}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdateEvent}
        />
      )}

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