import React, { useState, useEffect } from "react";
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
import ViewDetailsComponent from "../components/iconsComponent/ViewDetailsComponent";
import EditComponent from "../components/iconsComponent/EditComponent";

export default function MyWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('No se encontró userId en el localStorage');
        }

        const response = await fetch(`http://localhost:8080/activity/workshops/byOwner/${userId}`);

        if (!response.ok) {
          throw new Error('Error al cargar los talleres');
        }

        const data = await response.json();

        if (data.type === "SUCCESS") {
          setWorkshops(data.result);
        } else {
          throw new Error('No se encontraron talleres');
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching workshops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleViewDetails = (workshopId) => {
    console.log("Ver detalles del taller:", workshopId);
  };

  const handleEdit = (workshopId) => {
    console.log("Editar taller:", workshopId);
  };

  const handleDelete = (workshopId) => {
    console.log("Eliminar taller:", workshopId);
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Mis talleres</h1>
        {loading ? (
          <div className="text-center mt-5">Cargando talleres...</div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            Error al cargar los talleres: {error}
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nombre</th>
                  <th>Ponente</th>
                  <th>Hora</th>
                  <th>Evento asociado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {workshops.map((workshop, index) => (
                  <tr key={workshop.id}>
                    <td className="td-blue">{index + 1}</td>
                    <td>{workshop.name}</td>
                    <td className="td-blue">{workshop.speaker}</td>
                    <td>{workshop.time}</td>
                    <td>
                      {workshop.fromActivity ? (
                        <div>
                          <strong>{workshop.fromActivity.name}</strong>
                          <div className="text-muted small">
                            {new Date(workshop.fromActivity.date).toLocaleDateString()}
                          </div>
                        </div>
                      ) : "Sin evento asociado"}
                    </td>
                    <td className="actions">
                      <div>
                        <button onClick={() => handleViewDetails(workshop.id)}>
                          <img className="icon-md" src={iconDetails} alt="Detalles" />
                        </button>
                        <button onClick={() => handleEdit(workshop.id)}>
                          <img className="icon-md" src={iconEdit} alt="Editar" />
                        </button>
                        <button onClick={() => handleDelete(workshop.id)}>
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
    </div>
  );
}