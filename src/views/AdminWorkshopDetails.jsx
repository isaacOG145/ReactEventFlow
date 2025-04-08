import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/tableStyles.css";

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import Carrusel from "../components/Carrusel";
import BlueButton from "../components/BlueButton";
import NavigatePurpleButton from "../components/NavigatePurpleButton";
import UpdateWorkshopModal from "../components/modals/UpdateWorkshopModal";

export default function AdminWorkshopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    description: "",
    imageUrls: [],
    speaker: "",
    quota: "",
    time: "",
    fromActivity: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [workshopToEdit, setWorkshopToEdit] = useState(null);
  const [userActivities, setUserActivities] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState({ yes: 0, no: 0 });

  const handleEdit = () => {
    setWorkshopToEdit(eventData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateSuccess = (updatedData) => {
    setEventData(updatedData);
    setShowModal(false);
  };

  const formatTime = (time) => {
    // Dividimos la cadena de tiempo (por ejemplo: "12:00:00") en hora, minutos y segundos
    const [hours, minutes] = time.split(':');

    // Convertimos la hora a número para determinar si es AM o PM
    const hourNumber = parseInt(hours, 10);

    // Determinamos AM o PM
    const suffix = hourNumber >= 12 ? 'pm' : 'am';

    // Convertimos la hora a formato de 12 horas
    const formattedHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12;

    // Devolvemos la hora en el formato 12:00pm
    return `${formattedHour}:${minutes.toString().padStart(2, '0')}${suffix}`;
  };



  const handleView = (route) => {
    navigate(route); // navega a la ruta proporcionada
  };

  // Cargar datos del evento
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/activity/workshop/findById/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.type === "SUCCESS") {
          setEventData({
            id: data.result.id,
            name: data.result.name,
            description: data.result.description,
            imageUrls: data.result.imageUrls || [],
            speaker: data.result.speaker || "",
            quota: data.result.quota || "",
            time: data.result.time || "",
            fromActivity: data.result.fromActivity || {}
          });
        } else {
          throw new Error(data.text || "Error al obtener los datos del evento");
        }
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  // Cargar usuarios de la actividad
  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const usersResponse = await fetch(`http://localhost:8080/user-activities/findByActivity/${id}`);

        if (usersResponse.status === 404) {
          // Si no hay usuarios, simplemente no hacemos nada
          setUserActivities([]);
          return;
        }

        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`);
        }

        const usersData = await usersResponse.json();
        if (usersData.type === "SUCCESS") {
          setUserActivities(usersData.result);

          // Contar las asistencias
          const yesCount = usersData.result.filter(userActivity => userActivity.verified).length;
          const noCount = usersData.result.length - yesCount;
          setAttendanceCount({ yes: yesCount, no: noCount });
        } else {
          throw new Error(usersData.text || "Error al obtener los usuarios de la actividad");
        }
      } catch (err) {
        console.error("Error fetching user activities:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserActivities();
  }, [id]);

  const handleReturn = () => {
    navigate(-1);
  };

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
            <p className="mt-2">Cargando detalles del evento...</p>
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
            <NavigatePurpleButton onClick={() => window.location.reload()}>
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
        <div className="card-details">
          <h1>{eventData.name}</h1>
          <div className="row mb-2">
            <div className="d-flex align-items-center"> {/* Alinea los items verticalmente */}
              <p className="mb-0 mr-3"> {/* Elimina el margen inferior y agrega margen derecho */}
                <span className="badge bg-purple text-white">
                  Evento relacionado: {eventData.fromActivity.name}
                </span>
              </p>
              <p className="mb-0 mr-3"> {/* Igual que el anterior */}
                <span className="badge bg-magent text-white">
                  Cupo: {eventData.quota}
                </span>
              </p>
              <p className="mb-0">
                <span className="badge bg-blue text-white">
                  Hora: {formatTime(eventData.time)}
                </span>
              </p>
            </div>
          </div>

          <p>
            <strong>Ponente:</strong> {eventData.speaker}
          </p>

          <p>
            <strong>Descripción:</strong> {eventData.description}
          </p>

          <div className="col-6 d-flex gap-2">
            <a href="#!"
              className="event-info"
              onClick={(e) => {
                e.preventDefault();
                handleView(`/administrar/ver-checador-taller/${eventData.id}`);
              }}>
              Ver checador
            </a>
            <a href="#!"
              className="event-info"
              onClick={(e) => {
                e.preventDefault();
                handleView(`/administrar/detalles-evento/${eventData.fromActivity.id}`);
              }}>
              Ver evento asociado
            </a>
          </div>

          {eventData.imageUrls.length > 0 ? (
            <Carrusel images={eventData.imageUrls} />
          ) : (
            <div className="alert alert-info">
              No hay imágenes disponibles para este evento
            </div>
          )}

          <div className="row mt-3">
            <div className="col-6"></div>
            <div className="col-3">
              <NavigatePurpleButton onClick={handleReturn}>Volver</NavigatePurpleButton>
            </div>
            <div className="col-3">
              <BlueButton onClick={handleEdit}>Actualizar</BlueButton>
            </div>
          </div>
        </div>

        <div className="row mt-4 d-flex justify-content-center">
          <div className="col-6">
            <h1>Asistencias</h1>

            {userActivities.length === 0 ? (
              <div className="alert alert-warning" role="alert">
                <strong>No hay usuarios inscritos en este evento.</strong>
              </div>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nombre del invitado</th>
                      <th>Correo del invitado</th>
                      <th className="d-flex justify-content-center">
                        Asistencia {attendanceCount.yes}/{attendanceCount.yes + attendanceCount.no}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userActivities.map((userActivity, index) => (
                      <tr key={userActivity.id}>
                        <td className="td-blue">{index + 1}</td>
                        <td>{`${userActivity.user.name} ${userActivity.user.lastName}`}</td>
                        <td className="td-blue">{`${userActivity.user.email}`}</td>
                        <td className="d-flex justify-content-center">
                          <span
                            style={{
                              color: userActivity.verified ? "#28A745" : "#DC3545",
                            }}
                          >
                            {userActivity.verified ? "Asistió" : "No asistió"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {
        showModal && workshopToEdit && (
          <UpdateWorkshopModal
            showModal={showModal}
            workshopData={workshopToEdit}
            handleClose={handleCloseModal}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )
      }
    </div >
  );
}