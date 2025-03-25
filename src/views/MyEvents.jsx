import React, { useState } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/main.css'; 
import '../styles/tableStyles.css'; 
import '../styles/iconStyles.css'; 

// Importación de iconos locales 
import iconDetails from '../assets/icons/mas-detalles.png'; 
import iconStatus from '../assets/icons/boton-de-play.png'; 
import iconStatusoff from '../assets/icons/boton-red.png'; 
import iconEdit from '../assets/icons/editar.png'; 

import CustomerRootHeader from "../components/CustomerRootHeader"; 
import AdminNav from "../components/AdminNav"; 
import DeleteModal from "../modal/DeleteModal"; 

export default function MyEvents() {
  const [events, setEvents] = useState([
    { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", date: "12/jun/2025", icon: iconStatus },
    { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", date: "01/oct/2025", icon: iconStatus }
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === selectedEventId ? { 
          ...event, 
          icon: event.icon === iconStatus ? iconStatusoff : iconStatus // Alterna entre los iconos
        } : event
      )
    );
    setIsDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
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
                <th>Hora</th>
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
                      <button className="btn-icon">
                        <img className="icon-md" src={iconDetails} alt="Detalles" />
                      </button>
                      <button className="btn-icon">
                        <img className="icon-md" src={iconEdit} alt="Editar" />
                      </button>
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete} // Confirmar alternar entre iconos
      />
    </div>
  );
}
