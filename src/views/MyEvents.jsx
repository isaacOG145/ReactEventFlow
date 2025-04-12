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
import AssignmentComponent from "../components/iconsComponent/AssignmentComponent";
import ModalComponent from "../components/modals/ModalComponent";
import AssignmentChecker from "./AssignmentCheckers";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit' | 'assign'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('No se encontró userId en el localStorage');

        const [eventsRes, assignmentRes] = await Promise.all([
          fetch(`http://localhost:8080/activity/events/byOwner/${userId}`),
          fetch(`http://localhost:8080/activity/assignment-status/owner/${userId}`)
        ]);

        if (!eventsRes.ok) throw new Error('Error al cargar eventos');

        const eventsData = await eventsRes.json();
        if (eventsData.type !== "SUCCESS" || !Array.isArray(eventsData.result)) {
          throw new Error('Respuesta inválida del servidor al obtener eventos');
        }

        const assignmentData = assignmentRes.ok ? await assignmentRes.json() : null;

        // Manejar casos donde assignmentData esté mal o no tenga result
        const asignacionesMap = {};
        if (assignmentData && Array.isArray(assignmentData.result)) {
          assignmentData.result.forEach(item => {
            if (item.id !== undefined && typeof item.asignado === "boolean") {
              asignacionesMap[item.id] = item.asignado;
            }
          });
        } else {
          console.warn("Datos de asignación no disponibles o mal formateados:", assignmentData);
        }

        const enrichedEvents = eventsData.result.map(event => ({
          ...event,
          asignado: asignacionesMap[event.id] || false
        }));

        setEvents(enrichedEvents);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const handleChangeStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/activity/change-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === id ? { ...event, status: !event.status } : event
          )
        );
        console.log('Estado actualizado:', data);
      } else {
        console.log('Error al actualizar estado:', data);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleEdit = (event) => {
    setEventToEdit(event);
    setModalType('edit');
    setShowModal(true);
  };

  const handleOpenAssignModal = (event) => {
    setEventToEdit(event); // si quieres usar datos del evento
    setModalType('assign');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEventToEdit(null);
    setModalType(null);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
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

      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      handleCloseModal();
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Error al actualizar el evento");
    }
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
                  <th>Asignado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id}>
                    <td className="td-blue">{index + 1}</td>
                    <td>{event.name}</td>
                    <td className="td-blue">{event.description}</td>
                    <td>{formatDate(event.date)}</td>
                    <td className="td-blue">
                      {event.asignado ? (
                        <span style={
                          { color: "#28A745" }
                        }>Si</span>
                      ) : (
                        <span style={
                          { color: "#DC3545" }
                        }>No</span>
                      )}
                    </td>

                    <td className="actions">
                      <div>
                        <ViewDetailsComponent to={`/administrar/detalles-evento/${event.id}`} />
                        <EditComponent onClick={() => handleEdit(event)} />
                        <AssignmentComponent onClick={() => handleOpenAssignModal(event)} />
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

      {/* Modal de edición */}
      {showModal && modalType === 'edit' && eventToEdit && (
        <UpdateEventModal
          showModal={showModal}
          eventData={eventToEdit}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdateEvent}
        />
      )}

      {/* Modal de asignación */}
      {showModal && modalType === 'assign' && (
        <ModalComponent show={showModal} onClose={handleCloseModal} title="Asignar checador">
          <AssignmentChecker activity={eventToEdit} />
        </ModalComponent>
      )}
    </div>
  );
}
