import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

// Importación de componentes de iconos
import IconDetails from "../components/icons/iconDetails";
import IconEdit from "../components/icons/iconEdit";

import iconStatus from '../assets/icons/boton-de-play.png';
import iconStatusoff from '../assets/icons/boton-red.png';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import ChangeStatus from "../modal/ChangeStatus";

const events = [
  { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", asociado: "Evento_1", icon: iconStatus },
  { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", asociado: "Evento_1", icon: iconStatus }
];

export default function MyWorkshops() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [workshops, setWorkshops] = useState(events);

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setWorkshops(prevWorkshops =>
      prevWorkshops.map(workshop =>
        workshop.id === selectedEventId
          ? { ...workshop, icon: workshop.icon === iconStatus ? iconStatusoff : iconStatus }
          : workshop
      )
    );
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Mis talleres</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Evento asociado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((workshop, index) => (
                <tr key={workshop.id}>
                  <td className="td-blue">{index + 1}</td>
                  <td>{workshop.name}</td>
                  <td className="td-blue">{workshop.description}</td>
                  <td>{workshop.asociado}</td>
                  <td className="actions">
                    <div>
                      <IconDetails onClick={() => console.log("Ver detalles de", workshop.id)} />
                      <IconEdit onClick={() => console.log("Editar", workshop.id)} />
                      <button
                        className="btn-icon"
                        onClick={() => handleDeleteClick(workshop.id)}
                      >
                        <img className="icon-md" src={workshop.icon} alt="Estado" />
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
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
