import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

import iconStatus from '../assets/icons/eliminar.png';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import ViewDetailsComponent from "../components/iconsComponent/ViewDetailsComponent";
import EditComponent from "../components/iconsComponent/EditComponent";
import UpdateEventModal from "../components/modals/UpdateEventModal";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [eventToEdit, setEventToEdit] = useState(null); // Estado para los datos del evento a editar

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('No se encontró userId en el localStorage');
        }

        const response = await fetch(`http://localhost:8080/activity/events/byOwner/${userId}`);

        if (!response.ok) {
          throw new Error('Error al cargar los eventos');
        }

        const data = await response.json();
        if (data.type === "SUCCESS") {
          setEvents(data.result);
        } else {
          throw new Error('No se encontraron eventos');
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (event) => {
    // Establecer el evento a editar y abrir el modal
    setEventToEdit(event);
    setShowModal(true);
  };

  const handleDelete = (eventId) => {
    console.log("Eliminar evento:", eventId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEventToEdit(null); // Limpiar los datos del evento cuando se cierre el modal
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      // Aquí deberías hacer la llamada al backend para actualizar el evento
      const response = await fetch(`http://localhost:8080/activity/events/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el evento');
      }

      // Si la actualización fue exitosa, actualizamos la lista de eventos
      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      handleCloseModal();
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Error al actualizar el evento");
    }
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
                  <th></th> {/* Columna de acciones */}
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id}>
                    <td className="td-blue">{index + 1}</td>
                    <td>{event.name}</td>
                    <td className="td-blue">{event.description}</td>
                    <td>{event.date}</td>
                    <td className="actions">
                      <div>
                        <ViewDetailsComponent to={`/administrar/detalles-evento/${event.id}`} />
                        <EditComponent onClick={() => handleEdit(event)} />
                        <button onClick={() => handleDelete(event.id)}>
                          <img className="icon-md" src={iconStatus} alt="Eliminar" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para actualizar el evento */}
      {showModal && eventToEdit && (
        <UpdateEventModal
          showModal={showModal}
          eventData={eventToEdit}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdateEvent}
        />
      )}
    </div>
  );
}
