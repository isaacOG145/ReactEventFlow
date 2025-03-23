import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

// Importación de iconos locales
import iconDetails from '../assets/icons/mas-detalles.png';
import iconStatus from '../assets/icons/eliminar.png';
import iconEdit from '../assets/icons/editar.png';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

const events = [
  { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", asociado: "Evento_1" },
  { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", asociado: "Evento_1" }
];

export default function MyWorkshops() {
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
                <th></th> {/* Columna de acciones */}
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id}>
                  <td className="td-blue">{index + 1}</td>
                  <td>{event.name}</td>
                  <td className="td-blue">{event.description}</td>
                  <td>{event.asociado}</td>
                  <td className="actions">
                    <div>
                      <button><img className="icon-md" src={iconDetails} alt="Detalles" /></button>
                      <button><img className="icon-md" src={iconEdit} alt="Editar" /></button>
                      <button><img className="icon-md" src={iconStatus} alt="Eliminar" /></button>
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