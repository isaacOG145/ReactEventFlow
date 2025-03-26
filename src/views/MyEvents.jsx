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
import EditEventModal from "../modal/EditEvent"; // Nuevo modal de edición

export default function MyEvents() {
  const [events, setEvents] = useState([
    { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", date: "12/jun/2025", icon: iconStatus },
    { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", date: "01/oct/2025", icon: iconStatus }
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === selectedEventId ? { 
          ...event, 
          icon: event.icon === iconStatus ? iconStatusoff : iconStatus
        } : event
      )
    );
    setIsDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
                      <IconDetails onClick={() => console.log("Ver detalles de", event.id)} />
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
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <EditEventModal
        show={isEditModalOpen}
        handleClose={handleCloseEditModal}
        eventId={selectedEventId}
      />
    </div>
  );
}