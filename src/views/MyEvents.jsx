import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

// Importación de componentes
import IconDetails from '../components/icons/iconDetails';
import IconEdit from '../components/icons/iconEdit';

import iconStatus from '../assets/icons/boton-de-play.png';
import iconStatusoff from '../assets/icons/boton-red.png';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import ChangeStatus from "../modal/ChangeStatus";
import EditEventModal from "../modal/EditEvent";
import EventDetailsModal from "../modal/EventDetails"; // Nuevo modal de detalles

export default function MyEvents() {
  const [events, setEvents] = useState([
    { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", date: "12/jun/2025", icon: iconStatus },
    { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", date: "01/oct/2025", icon: iconStatus }
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDeleteClick = (eventId) => {
    setSelectedEvent(events.find(event => event.id === eventId));
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (eventId) => {
    setSelectedEvent(events.find(event => event.id === eventId));
    setIsEditModalOpen(true);
  };

  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === selectedEvent.id ? { 
          ...event, 
          icon: event.icon === iconStatus ? iconStatusoff : iconStatus
        } : event
      )
    );
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Mis eventos</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Acciones</th>
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
                      <IconDetails onClick={() => handleDetailsClick(event)} />
                      <IconEdit onClick={() => handleEditClick(event.id)} />
                      <button
                        className="btn-icon"
                        onClick={() => handleDeleteClick(event.id)}
                      >
                        <img className="icon-md" src={event.icon} alt="Estado" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ChangeStatus
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <EditEventModal
        show={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
      />

      <EventDetailsModal
        show={isDetailsModalOpen}
        handleClose={() => setIsDetailsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}
