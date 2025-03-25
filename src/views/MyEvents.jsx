import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

// Importación de iconos locales (solo los que tienes)
import iconDetails from '../assets/icons/mas-detalles.png';
import iconStatus from '../assets/icons/boton-de-play.png';
import iconEdit from '../assets/icons/editar.png';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import DeleteModal from "../modal/DeleteModal";

export default function MyEvents() {
  const [events, setEvents] = useState([
    { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", date: "12/jun/2025" },
    { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", date: "01/oct/2025" }
  ]);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Added this state for the delete modal
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const handleConfirmDelete = () => {
    setEvents(events.filter(event => event.id !== selectedEventId));
    setIsSuccessModalOpen(true); // Show success modal after delete
    setIsDeleteModalOpen(false); // Close the delete modal after confirming delete
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
  };

  const handleRegisterEvent = () => {
    // Lógica de registro aquí...
    setIsSuccessModalOpen(true); // Mostrar modal de éxito después de registrar
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

      <DeleteModal
        isOpen={isDeleteModalOpen} // Pass the correct stat
        onClose={handleCloseDeleteModal} // Pass the close function
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
}
