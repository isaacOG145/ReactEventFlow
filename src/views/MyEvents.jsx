import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

import iconDetails from '../assets/icons/mas-detalles.png';
import iconStatus from '../assets/icons/eliminar.png';
import iconEdit from '../assets/icons/editar.png';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('No se encontró userId en el localStorage');
        }

        // Realizamos la solicitud GET con el userId
        const response = await fetch(`http://localhost:8080/activity/events/byOwner/${userId}`);

        if (!response.ok) {
          throw new Error('Error al cargar los eventos');
        }

        const data = await response.json();
        if (data.type === "SUCCESS") {
          setEvents(data.result); // Accedemos a los eventos dentro de 'result'
        } else {
          throw new Error('No se encontraron eventos');
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewDetails = (eventId) => {
    console.log("Ver detalles del evento:", eventId);
  };

  const handleEdit = (eventId) => {
    console.log("Editar evento:", eventId);
  };

  const handleDelete = (eventId) => {
    console.log("Eliminar evento:", eventId);
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
                  <th></th> {/* Columna de acciones */}
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
                        <button onClick={() => handleViewDetails(event.id)}>
                          <img className="icon-md" src={iconDetails} alt="Detalles" />
                        </button>
                        <button onClick={() => handleEdit(event.id)}>
                          <img className="icon-md" src={iconEdit} alt="Editar" />
                        </button>
                        <button onClick={() => handleDelete(event.id)}>
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
