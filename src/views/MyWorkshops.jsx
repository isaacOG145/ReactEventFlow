import React, { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'; // Importamos el locale en español
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/tableStyles.css';
import '../styles/iconStyles.css';

import {formatTime, formatDate} from '../utils/DateUtils';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import ViewDetailsComponent from "../components/iconsComponent/ViewDetailsComponent";
import EditComponent from "../components/iconsComponent/EditComponent";
import UpdateWorkshopModal from "../components/modals/UpdateWorkshopModal";
import ChangeStatus from "../components/iconsComponent/ChangeStatus";
import ModalComponent from "../components/modals/ModalComponent";
import AssignmentChecker from "./AssignmentCheckers";
import AssignmentComponent from "../components/iconsComponent/AssignmentComponent";

export default function MyWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [workshopToEdit, setWorkshopToEdit] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchWorkshops = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('No se encontró userId en el localStorage');
      }

      const [eventsRes, assignmentRes] = await Promise.all([
        fetch(`http://localhost:8080/activity/workshops/byOwner/${userId}`),
        fetch(`http://localhost:8080/activity/assignment-status/owner/${userId}`)
      ]);

      if (!eventsRes.ok) throw new Error('Error al cagar los talleres');

      const eventsData = await eventsRes.json();
      if (eventsData.type !== "SUCCESS" || !Array.isArray(eventsData.result)) {
        throw new Error('Respuesta inválida del servidor al obtener eventos');
      }

      const assignmentData = assignmentRes.ok ? await assignmentRes.json() : null;

      // Manejar casos donde assignmentData esté mal o no tenga result
      const asignacionesMap = {};
      if (assignmentData && Array.isArray(assignmentData.result)) {
        assignmentData.result.forEach(item => {
          if (item.id !== undefined && typeof item.asignado === "boolean") {
            asignacionesMap[item.id] = item.asignado;
          }
        });
      } else {
        console.warn("Datos de asignación no disponibles o mal formateados:", assignmentData);
      }

      const enrichedEvents = eventsData.result.map(workshops => ({
        ...workshops,
        asignado: asignacionesMap[workshops.id] || false
      }));

      setWorkshops(enrichedEvents);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching workshops:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops ();
  }, []);

  const handleUpdateSuccess = () => {
    // Actualizar la lista de talleres después de una actualización exitosa
    fetchWorkshops();
  };

  const handleEdit = (workshop) => {
    setWorkshopToEdit(workshop);
    setModalType('edit');
    setShowModal(true);
  };

  const handleOpenAssignModal = (workshop) => {
    setWorkshopToEdit(workshop); // si quieres usar datos del evento
    setModalType('assign');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWorkshopToEdit(null);
    setModalType(null);
  };

  const handleUpdateWorkshop = async (updatedWorkshop) => {
    try {
      const response = await fetch(`http://localhost:8080/activity/workshops/update/${updatedWorkshop.id}`, {
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
                  <th className="text-center">Asignado</th>
                  <th className="text-center">Acciones</th>
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
                            {formatDate(workshop.fromActivity.date)}
                          </div>
                        </div>
                      ) : "Sin evento asociado"}
                    </td>
                    <td className="td-blue text-center">
                      {workshop.asignado ? (
                        <span style={
                          { color: "#28A745" }
                        }>Si</span>
                      ) : (
                        <span style={
                          { color: "#DC3545" }
                        }>No</span>
                      )}
                    </td>
                    <td className="actions">
                      <div>
                        <ViewDetailsComponent to={`/administrar/detalles-taller/${workshop.id}`} />
                        <EditComponent onClick={() => handleEdit(workshop)} />
                        <AssignmentComponent onClick={() => handleOpenAssignModal(workshop)} />
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

      {showModal && modalType === 'edit' && workshopToEdit && (
        <UpdateWorkshopModal
          showModal={showModal}
          workshopData={workshopToEdit}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdateWorkshop}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {/* Modal de asignación */}
      {showModal && modalType === 'assign' && (
        <ModalComponent show={showModal} onClose={handleCloseModal} title="Asignar checador">
          <AssignmentChecker activity={workshopToEdit} />
        </ModalComponent>
      )}
    </div>
  );
}
