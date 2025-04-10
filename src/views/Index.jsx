import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/modalStyles.css';
import '../styles/iconStyles.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import ActivityCard from "../components/ActivityCard";
import MessageModal from "../components/modals/MessageModal";

import Admin from '../assets/icons/administrator.png';
import UserAvatar from '../assets/icons/user-avatar.png';
import QRImg from '../assets/icons/qr.png';
import Enrollment from '../assets/icons/enrollment.png';
import EventDate from '../assets/icons/calendario.png';
import Time from '../assets/icons/time-and-date.png';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Index() {
  const [activities, setActivities] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    if (type !== "loading") {
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Mostrar el modal de "Cargando actividades..."
        showNotification("Cargando actividades...", "loading");
  
        const response = await fetch('http://localhost:8080/activity/findActiveEvents');
        if (!response.ok) throw new Error('Error al obtener las actividades');
  
        const data = await response.json();
        if (data.type === 'SUCCESS') {
          const formattedActivities = data.result.map((activity) => {
            const activityDate = activity.date ? new Date(activity.date) : null;
            if (activityDate) activityDate.setDate(activityDate.getDate() + 1);
            const formattedDate = activityDate
              ? format(activityDate, 'dd MMM yyyy', { locale: es })
              : 'Fecha no disponible';
            return { ...activity, formattedDate };
          });
          setActivities(formattedActivities);
  
          // Cerrar el modal de "Cargando actividades..."
          setNotification({ ...notification, show: false });
        }
      } catch (error) {
        console.error("Error al cargar actividades:", error);
  
        // Mostrar el modal de error después de "Cargando actividades..."
        setTimeout(() => {
          showNotification("Error al cargar actividades", "error");
        }, 1000); // Esperar 1 segundo antes de mostrar el error
      }
    };
  
    fetchActivities();
  }, []);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        // Mostrar el modal de "Cargando talleres..."
        showNotification("Cargando talleres...", "loading");

        const response = await fetch('http://localhost:8080/activity/findActiveWorkshops');
        if (!response.ok) throw new Error('Error al obtener los talleres');

        const data = await response.json();
        if (data.type === 'SUCCESS') {
          const formattedWorkshops = data.result.map((workshop) => {
            const formattedTime = workshop.time
              ? workshop.time.substring(0, 5)
              : 'Hora no disponible';
            return { ...workshop, formattedTime };
          });
          setWorkshops(formattedWorkshops);
        }
      } catch (error) {
        console.error("Error al cargar talleres:", error);

        // Mostrar el modal de error después de "Cargando talleres..."
        setTimeout(() => {
          showNotification("Error al cargar talleres", "error");
        }, 1000); // Esperar 1 segundo antes de mostrar el error
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className="app-container">
      <CustomerRootHeader />

      <div className="content-container">
        <div className="presentation-block">
          <div className="about-us">
            <h2>Sobre nuestros servicios</h2>
            <p>Nuestra plataforma está creada para simplificar la gestión de eventos<br />
              para compañías y organizaciones. Además, ofrecemos la posibilidad de<br />
              dar a conocerlos e inscribirse al público en general.</p>
            <div className="row justify-content-center">
              <div className="card-presentation col-12 col-sm-6 col-md-3 mb-4">
                <img className="icon-presentation" src={Admin} alt="" />
                <h3>Organiza tus eventos</h3>
                <p>Como compañía organiza tus eventos y publícalos en nuestra plataforma</p>
              </div>
              <div className="card-presentation col-12 col-sm-6 col-md-3 mb-4">
                <img className="icon-presentation" src={UserAvatar} alt="" />
                <h3>Asigna cargos</h3>
                <p>Asigna tus empleados en tus eventos para tener un mejor control de acceso</p>
              </div>
              <div className="card-presentation col-12 col-sm-6 col-md-3 mb-4">
                <img className="icon-presentation" src={Enrollment} alt="" />
                <h3>Inscríbete a eventos</h3>
                <p>Explora actividades de interés e inscríbete a ellos en línea</p>
              </div>
              <div className="card-presentation col-12 col-sm-6 col-md-3 mb-4">
                <img className="icon-presentation" src={QRImg} alt="" />
                <h3>Accede por QR desde tu teléfono</h3>
                <p>Accede a tu cuenta en la aplicación móvil y usa el QR para acceder a tus eventos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 justify-content-center">
          <div className="row p-4 text-center">
            <h1>Eventos disponibles</h1>
          </div>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                to={`/detalles-evento/${activity.id}`}
                buttonText="Ver detalles"
                label={
                  <label>
                    <img className="icon-ssm" src={EventDate} alt="Ícono de fecha" />
                    <span className="date-text">{activity.formattedDate}</span>
                  </label>
                }
              />
            ))
          ) : (
            <p>No hay actividades disponibles.</p>
          )}
        </div>

        <div className="row mt-4 justify-content-center">
          <div className="row p-4 text-center">
            <h1>Talleres Disponibles</h1>
          </div>
          {workshops.length > 0 ? (
            workshops.map((workshop) => (
              <ActivityCard
                key={workshop.id}
                activity={workshop}
                to={`/detalles-evento/${workshop.fromActivity.id}`}
                buttonText="Ver evento asociado"
                label={
                  <label>
                    <img className="icon-ssm" src={Time} alt="Ícono de hora" />
                    <span className="date-text">{workshop.formattedTime}</span>
                  </label>
                }
              />
            ))
          ) : (
            <p>No hay actividades disponibles.</p>
          )}
        </div>
      </div>

      {/* Modal de notificación */}
      <MessageModal
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        type={notification.type}
        message={notification.message}
      />
    </div>
  );
}