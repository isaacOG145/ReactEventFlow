import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/tableStyles.css";

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import Carrusel from "../components/Carrusel";
import BlueButton from "../components/BlueButton";
import NavigatePurpleButton from "../components/NavigatePurpleButton";
import UpdateEventModal from "../components/modals/UpdateEventModal";

import voidImg from '../assets/icons/void.png';

export default function AdminEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userActivities, setUserActivities] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState({ yes: 0, no: 0 });
  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    imageUrls: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleView = (route) => {
    navigate(route);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleUpdateSuccess = () => {
    fetchEventData();
  };

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'dd MMMM yyyy', { locale: es });
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return dateString;
    }
  };

  const fetchEventData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/activity/event/findById/${id}`,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.type === "SUCCESS") {
        setEventData({
          id: data.result.id,
          name: data.result.name,
          description: data.result.description,
          date: data.result.date,
          imageUrls: data.result.imageUrls || [],
        });
      } else {
        throw new Error(data.text || "Error al obtener los datos del evento");
      }
    } catch (err) {
      console.error("Error fetching event data:", err);
      setError(err.message);
    }
  };

  // Cargar datos del evento
  useEffect(() => {

    fetchEventData();
  }, [id]);

  // Cargar usuarios de la actividad
  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const usersResponse = await fetch(`${apiUrl}/user-activities/findByActivity/${id}`,{
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (usersResponse.status === 404) {
          setUserActivities([]);
          return;
        }

        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`);
        }

        const usersData = await usersResponse.json();
        if (usersData.type === "SUCCESS") {
          setUserActivities(usersData.result);

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
        <div className="card-details col-12 col-lg-10 col-xl-10 mx-auto">
          <h1>{eventData.name}</h1>
          <p>
            <span className="badge bg-purple text-white">
              Fecha: {formatDate(eventData.date)}
            </span>

          </p>
          <p>
            <strong>Descripción:</strong> {eventData.description}
          </p>

          <div className="col-6 d-flex gap-2">
            <a href="#!"
              className="event-info"
              onClick={(e) => {
                e.preventDefault();
                handleView(`/administrar/ver-checadores-evento/${id}`);
              }}>
              Ver checadores
            </a>
            <a href="#!"
              className="event-info"
              onClick={(e) => {
                e.preventDefault();
                handleView(`/administrar/ver-talleres-evento/${id}`);
              }}>
              Ver talleres
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
          <div className="col-12 col-lg-10 col-xl-10 mx-auto">
            <h1>Asistencias</h1>

            {userActivities.length === 0 ? (
              <div className="card-details" role="alert">
                <div className="row justify-content-center text-center">
                  <img className="icon-xxlg" src={voidImg} alt="void" />
                </div>
                <div className="row justify-content-center text-center">
                  <strong>No hay usuarios inscritos en este taller aún.</strong>
                </div>
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

      <UpdateEventModal
        showModal={showModal}
        eventData={eventData}
        handleClose={handleCloseModal}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
}