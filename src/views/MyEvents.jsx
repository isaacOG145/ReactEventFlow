import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

// Componentes de iconos
import IconDetails from '../components/icons/iconDetails';
import IconEdit from '../components/icons/iconEdit';
import iconStatus from '../assets/icons/eliminar.png';

// Modales
import EditEvent from '../modal/EditEvent';
import EventDetails from '../modal/EventDetails';

// Layout
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

// Botones personalizados
import EventBlueButton from '../modal/button/EventBlueButton';
import EventPurpleButton from '..//modal/button/EventPurpleButton';

const events = [
  { 
    id: 1, 
    name: "Feria de ciencias", 
    description: "Evento con concursos y exposiciones", 
    date: "12/06/2025",
    location: "Auditorio Principal",
    checkers: ["Juan Pérez", "María García"],
    workshops: ["Taller de Robótica", "Taller de Química"]
  },
  { 
    id: 2, 
    name: "Concurso de arte", 
    description: "Evento anual para exposiciones artísticas", 
    date: "01/10/2025",
    location: "Galería Central",
    checkers: ["Carlos López"],
    workshops: ["Taller de Pintura", "Taller de Escultura"]
  }
];

export default function MyEvents() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDetailsClick = (eventId) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const handleEditClick = (eventId) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleDeleteClick = (eventId) => {
    if(window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      console.log("Evento eliminado:", eventId);
      // Lógica para eliminar el evento
    }
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedEvent(null);
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
          <table className="table-events">
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
                    <div className="icon-group">
                      <IconDetails onClick={() => handleDetailsClick(event.id)} />
                      <IconEdit onClick={() => handleEditClick(event.id)} />
                      <button 
                        className="btn-icon" 
                        onClick={() => handleDeleteClick(event.id)}
                        aria-label="Eliminar evento"
                      >
                        <img className="icon-md" src={iconStatus} alt="Eliminar" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales */}
      {selectedEvent && (
        <>
          <EventDetails 
            show={showDetailsModal} 
            handleClose={handleCloseDetails}
            event={selectedEvent}
            EventBlueButton={EventBlueButton}
            EventPurpleButton={EventPurpleButton}
          />
          <EditEvent 
            show={showEditModal} 
            handleClose={handleCloseEdit}
            event={selectedEvent}
            EventBlueButton={EventBlueButton}
            EventPurpleButton={EventPurpleButton}
          />
        </>
      )}
    </div>
  );
}