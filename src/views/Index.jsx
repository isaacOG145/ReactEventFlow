import React, { useEffect, useState } from "react";
// Eliminamos useNavigate
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/modalStyles.css';
import '../styles/iconStyles.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import ActivityCard from "../components/ActivityCard";

import Admin from '../assets/icons/administrator.png';
import UserAvatar from '../assets/icons/user-avatar.png';
import QRImg from '../assets/icons/qr.png';
import Enrollment from '../assets/icons/enrollment.png';
import EventDate from '../assets/icons/calendario.png';

import { format } from 'date-fns'; 
import { es } from 'date-fns/locale'; 

export default function Index() {
  const [activities, setActivities] = useState([]); // Mantiene el estado de las actividades
  
  useEffect(() => {
    // Realizamos la solicitud GET usando fetch
    fetch('http://localhost:8080/activity/findActiveEvents')
      .then((response) => {
        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Error al obtener las actividades');
        }
        return response.json(); // Convertimos la respuesta a JSON
      })
      .then((data) => {
        if (data.type === 'SUCCESS') {
          // Formateamos la fecha antes de almacenarla en el estado
          const formattedActivities = data.result.map((activity) => {
            // Formateamos la fecha y la hora
            const formattedDate = activity.date
              ? format(new Date(activity.date), 'dd MMM yyyy', { locale: es }) 
              : 'Fecha no disponible';
            return { ...activity, formattedDate };
          });
          setActivities(formattedActivities); 
        }
      })
      .catch((error) => {
        console.error("Hubo un error al cargar las actividades:", error);
      });
  }, []);  // Se ejecuta solo una vez al cargar el componente

  // El handleDetailsClick se ha comentado, ya no navega a otras páginas.
  const handleDetailsClick = (id) => {
    console.log("Detalles del evento (navegación eliminada) con ID:", id);
    // Aquí puedes agregar la lógica de navegación cuando la necesites
    // navigate(`/detalles-evento/:${id}`);
  };

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
              <div className="card-presentation col-2">
                <img className="icon-presentation" src={Admin} alt="" />
                <h3>Organiza tus
                  eventos</h3>
                <p>Como compañia organiza<br />
                  tus eventos y publicalos<br />
                  en nuestra plataforma</p>
              </div>
              <div className="card-presentation col-2">
                <img className="icon-presentation" src={UserAvatar} alt="" />
                <h3>asigna cargos</h3>
                <p>Asigna tus empleados<br />
                  en tus eventos para<br />
                  tener un mejor control<br />
                  de acceso</p>
              </div>
              <div className="card-presentation col-2">
                <img className="icon-presentation" src={Enrollment} alt="" />
                <h3>Inscribete a eventos</h3>
                <p>
                  Explora actividades<br />
                  de interes e inscribete<br />
                  a ellos en linea
                </p>
              </div>
              <div className="card-presentation col-2">
                <img className="icon-presentation" src={QRImg} alt="" />
                <h3>accede por QR
                  desde tu télefono</h3>
                <p>Accede a tu cuenta en<br />
                  la aplicación móvil y<br />
                  usa el QR para acceder<br />
                  a tus eventos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mostramos las actividades */}
        <div className="row justify-content-center mt-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onDetailsClick={() => handleDetailsClick(activity.id)}  // Llamamos a la función sin navegar
                label={  
                  <label>
                    <img className="icon-sm" src={EventDate} alt="Ícono de fecha" />
                    <span className="date-text">{activity.formattedDate}</span>
                  </label>
                }
              />
            ))
          ) : (
            <p>No hay actividades disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
