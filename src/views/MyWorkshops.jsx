import React, { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'; // Importamos el locale en español
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';



import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import ViewDetailsComponent from "../components/iconsComponent/ViewDetailsComponent";
import EditComponent from "../components/iconsComponent/EditComponent";
import UpdateWorkshopModal from "../components/modals/UpdateWorkshopModal";
import ChangeStatus from "../components/iconsComponent/ChangeStatus";

export default function MyWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [workshopToEdit, setWorkshopToEdit] = useState(null);

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

  const handleEdit = (workshop) => {
    setWorkshopToEdit(workshop);
    setShowModal(true);
  };

  const handleDelete = (workshopId) => {
    console.log("Eliminar taller:", workshopId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWorkshopToEdit(null);
  };

  const handleUpdateWorkshop = async (updatedWorkshop) => {
    try {
      const response = await fetch(`http://localhost:8080/activity/workshops/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkshop),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el taller');
      }

      setWorkshops(workshops.map(workshop => workshop.id === updatedWorkshop.id ? updatedWorkshop : workshop));
      handleCloseModal();
    } catch (err) {
      console.error("Error updating workshop:", err);
      setError("Error al actualizar el taller");
    }
  };

  const handleChangeStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/activity/change-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Si la solicitud es exitosa, actualizamos el estado del checador
        setWorkshops((prevWorkshops) =>
          prevWorkshops.map((workshop) =>
            workshop.id === id ? { ...workshop, status: !workshop.status } : workshop
          )
        );
        console.log('Estado actualizado:', data);
      } else {
        console.log('Error al actualizar estado:', data);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  // Función para formatear la hora en formato 'HH:mm'
  const formatTime = (timeString) => {
    if (!timeString) return 'Hora inválida';

    const [hours, minutes] = timeString.split(':'); // Separamos las partes de la hora
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0); // Aseguramos que los segundos sean 0

    // Verificamos si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Hora inválida';
    }

    return format(date, 'HH:mm'); // Formateamos la hora
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
                    <td>{formatTime(workshop.time)}</td>
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
                        <ViewDetailsComponent to={`/administrar/detalles-taller/${workshop.id}`} />
                        <EditComponent onClick={() => handleEdit(workshop)} />
                        <ChangeStatus
                          currentStatus={workshop.status}
                          onChangeStatus={() => handleChangeStatus(workshop.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && workshopToEdit && (
        <UpdateWorkshopModal
          showModal={showModal}
          workshopData={workshopToEdit}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdateWorkshop}
        />
      )}
    </div>
  );
}
