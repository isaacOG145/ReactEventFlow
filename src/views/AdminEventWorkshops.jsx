import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/tableStyles.css";
import "../styles/iconStyles.css";

import voidImg from '../assets/icons/void.png';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import Carrusel from "../components/Carrusel";
import BlueButton from "../components/BlueButton";
import NavigatePurpleButton from "../components/NavigatePurpleButton";
import UpdateWorkshopModal from "../components/modals/UpdateWorkshopModal";

export default function AdminEventWorkshops() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [workshopToEdit, setWorkshopToEdit] = useState(null);
  const [attendanceCounts, setAttendanceCounts] = useState({});

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hourNumber = parseInt(hours, 10);
    const suffix = hourNumber >= 12 ? 'pm' : 'am';
    const formattedHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12;
    return `${formattedHour}:${minutes.toString().padStart(2, '0')}${suffix}`;
  };

  const fetchAttendanceCounts = async (workshopId) => {
    try {
      const response = await fetch(`http://localhost:8080/user-activities/findByActivity/${workshopId}`);
      if (!response.ok && response.status !== 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 404) {
        return { yes: 0, no: 0 };
      }
      const data = await response.json();
      if (data.type === "SUCCESS") {
        const yesCount = data.result.filter(ua => ua.verified).length;
        return { yes: yesCount, no: data.result.length - yesCount };
      }
      return { yes: 0, no: 0 };
    } catch (err) {
      console.error("Error fetching attendance counts:", err);
      return { yes: 0, no: 0 };
    }
  };

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch event data
      const eventResponse = await fetch(`http://localhost:8080/activity/findById/${eventId}`);
      if (!eventResponse.ok) {
        throw new Error(`HTTP error! status: ${eventResponse.status}`);
      }
      const eventJson = await eventResponse.json();
      if (eventJson.type !== "SUCCESS") {
        throw new Error(eventJson.text || "Error al obtener los datos del evento");
      }
      setEventData(eventJson.result);

      // Fetch workshops
      const workshopsResponse = await fetch(`http://localhost:8080/activity/findByEvent/${eventId}`);
      if (!workshopsResponse.ok) {
        throw new Error(`HTTP error! status: ${workshopsResponse.status}`);
      }
      const workshopsJson = await workshopsResponse.json();
      if (workshopsJson.type !== "SUCCESS") {
        throw new Error(workshopsJson.text || "Error al obtener los talleres");
      }

      // Fetch attendance counts for each workshop
      const workshopsWithAttendance = await Promise.all(
        workshopsJson.result.map(async (workshop) => {
          const counts = await fetchAttendanceCounts(workshop.id);
          return { ...workshop, attendanceCount: counts };
        })
      );

      setWorkshops(workshopsWithAttendance);
      
      // Create attendance counts map
      const countsMap = {};
      workshopsWithAttendance.forEach(workshop => {
        countsMap[workshop.id] = workshop.attendanceCount;
      });
      setAttendanceCounts(countsMap);
      
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (workshop) => {
    setWorkshopToEdit(workshop);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateSuccess = (updatedWorkshop) => {
    setWorkshops(workshops.map(w => 
      w.id === updatedWorkshop.id ? updatedWorkshop : w
    ));
    setShowModal(false);
  };

  const handleViewWorkshop = (workshopId) => {
    navigate(`/administrar/detalles-taller/${workshopId}`);
  };

  const handleViewChecker = (workshopId) => {
    navigate(`/administrar/ver-checador-taller/${workshopId}`);
  };

  useEffect(() => {
    fetchWorkshops();
  }, [eventId]);

  if (loading) {
    return (
      <div className="app-container">
        <CustomerRootHeader />
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando talleres...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <CustomerRootHeader />
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="content">
          <div className="alert alert-danger" role="alert">
            Error al cargar los datos: {error}
          </div>
          <div className="text-center">
            <NavigatePurpleButton onClick={fetchWorkshops}>
              Reintentar
            </NavigatePurpleButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <div className="card-details col-12 col-lg-10 col-xl-10 mx-auto">
          <h1>Talleres del Evento: {eventData?.name || 'Evento no encontrado'}</h1>
          <p className="mb-4">
            <strong>Descripción del evento:</strong> {eventData?.description || 'Sin descripción'}
          </p>

          {workshops.length === 0 ? (
            <div className="card-details" role="alert">
              <div className="row justify-content-center text-center">
                <img className="icon-xxlg" src={voidImg} alt="void" />
              </div>
              <div className="row justify-content-center text-center">
                <strong>No hay talleres registrados para este evento.</strong>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {workshops.map((workshop) => (
                <div key={workshop.id} className="col-12">
                  <div className="card workshop-card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <h2 className="card-title">{workshop.name}</h2>
                          <div className="row g-2 mb-2">
                            <div className="col-auto">
                              <span className="badge bg-purple text-white">
                                Ponente: {workshop.speaker}
                              </span>
                            </div>
                            <div className="col-auto">
                              <span className="badge bg-magent text-white">
                                Cupo: {workshop.quota}
                              </span>
                            </div>
                            <div className="col-auto">
                              <span className="badge bg-blue text-white">
                                Hora: {formatTime(workshop.time)}
                              </span>
                            </div>
                            <div className="col-auto">
                              <span className="badge bg-success text-white">
                                Asistencias: {attendanceCounts[workshop.id]?.yes || 0}/{attendanceCounts[workshop.id]?.yes + attendanceCounts[workshop.id]?.no || 0}
                              </span>
                            </div>
                          </div>
                          <p className="card-text">
                            <strong>Descripción:</strong> {workshop.description}
                          </p>
                        </div>
                        <div className="col-md-4">
                          {workshop.imageUrls?.length > 0 ? (
                            <div className="workshop-thumbnail">
                              <img 
                                src={workshop.imageUrls[0]} 
                                alt={workshop.name} 
                                className="img-fluid rounded"
                                style={{ maxHeight: '150px', width: '100%', objectFit: 'cover' }}
                              />
                            </div>
                          ) : (
                            <div className="alert alert-info p-2 mb-0">
                              No hay imágenes disponibles
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="row mt-3">
                        <div className="col-12 col-md-4 mb-2">
                          <BlueButton 
                            onClick={() => handleViewWorkshop(workshop.id)}
                            className="w-100"
                          >
                            Ver detalles
                          </BlueButton>
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                          <NavigatePurpleButton 
                            onClick={() => handleViewChecker(workshop.id)}
                            className="w-100"
                          >
                            Ver checador
                          </NavigatePurpleButton>
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                          <BlueButton 
                            onClick={() => handleEdit(workshop)}
                            className="w-100"
                          >
                            Editar
                          </BlueButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <UpdateWorkshopModal
        show={showModal}
        eventData={workshopToEdit}
        onClose={handleCloseModal}
        onUpdate={handleUpdateSuccess}
      />
    </div>
  );
}