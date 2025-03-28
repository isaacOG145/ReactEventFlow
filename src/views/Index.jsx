import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';  // Agregamos useNavigate
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

export default function Index() {
  const [activities, setActivities] = useState([]); // Estado para almacenar las actividades
  const navigate = useNavigate();  // Inicializamos la función de navegación

  useEffect(() => {
    // Realizamos la solicitud GET usando fetch
    fetch('http://localhost:8080/activity/findAll')
      .then((response) => {
        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Error al obtener las actividades');
        }
        return response.json(); // Convertimos la respuesta a JSON
      })
      .then((data) => {
        if (data.type === 'SUCCESS') {
          setActivities(data.result); // Almacenamos las actividades en el estado
        }
      })
      .catch((error) => {
        console.error("Hubo un error al cargar las actividades:", error);
      });
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  // Función para manejar el clic del botón y redirigir
  const handleDetailsClick = (activityId) => {
    // Aquí pasamos el ID de la actividad como parte de la URL
    navigate(`/detalles-evento/${activityId}`);
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
        <div className="row justify-content-center mt-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                onDetailsClick={() => handleDetailsClick(activity.id)} // Pasamos la función aquí
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
