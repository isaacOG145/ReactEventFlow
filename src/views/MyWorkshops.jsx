import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

// Importación de tus componentes de iconos
import IconDetails from '../components/icons/iconDetails';
import IconEdit from '../components/icons/iconEdit';
import iconStatus from '../assets/icons/eliminar.png';

// Componentes de layout
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

const workshops = [
  { 
    id: 1, 
    name: "Taller de Robótica", 
    description: "Introducción a la robótica educativa", 
    asociado: "Feria de Ciencias"
  },
  { 
    id: 2, 
    name: "Taller de Pintura", 
    description: "Técnicas básicas de acuarela", 
    asociado: "Concurso de Arte"
  }
];

export default function MyWorkshops() {
  const handleDetailsClick = (workshopId) => {
    console.log("Ver detalles del taller:", workshopId);
    // Lógica para mostrar detalles
  };

  const handleEditClick = (workshopId) => {
    console.log("Editar taller:", workshopId);
    // Lógica para editar
  };

  const handleDeleteClick = (workshopId) => {
    if(window.confirm("¿Estás seguro de que deseas eliminar este taller?")) {
      console.log("Taller eliminado:", workshopId);
      // Lógica para eliminar
    }
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
          <table className="table-workshops">
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
                    <div className="icon-group">
                      <IconDetails onClick={() => handleDetailsClick(workshop.id)} />
                      <IconEdit onClick={() => handleEditClick(workshop.id)} />
                      <button 
                        className="btn-icon" 
                        onClick={() => handleDeleteClick(workshop.id)}
                        aria-label="Eliminar taller"
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
    </div>
  );
}