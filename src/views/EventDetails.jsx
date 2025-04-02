import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; // Asegúrate de importar useParams correctamente
import Carrusel from "../components/Carrusel";
import BlueButton from "../components/BlueButton";
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import ActivityCard from "../components/ActivityCard";
import Time from '../assets/icons/time-and-date.png';

export default function EventDetails() {
    const { id } = useParams();  
    const [eventDetails, setEventDetails] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los detalles del evento
    const fetchEventDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/activity/event/findById/${id}`);
            const data = await response.json();
            if (data.type === "SUCCESS") {
                setEventDetails(data.result);
            }
        } catch (error) {
            console.error("Error al obtener detalles del evento:", error);
        }
    };

    // Función para obtener las actividades del evento
    const fetchActivities = async () => {
        try {
            const response = await fetch(`http://localhost:8080/activity/findByEvent/${id}`);
            const data = await response.json();
            if (data.type === "SUCCESS") {
                setActivities(data.result);
            }
        } catch (error) {
            console.error("Error al obtener actividades:", error);
        }
    };

    // Usamos useEffect para hacer el fetch cuando se monte el componente
    useEffect(() => {
        fetchEventDetails();
        fetchActivities();
        setLoading(false);
    }, [id]); // Dependemos del id para hacer el fetch cada vez que cambia

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!eventDetails) {
        return <div>No se encontraron detalles para este evento.</div>;
    }

    const { name, date, description, imageUrls } = eventDetails;

    return (
        <div className="app-container">
            <CustomerRootHeader />
            <div className="content-container">
                <div className="row justify-content-center mt-4">
                    <div className="card-details">
                        <h1>{name}</h1>
                        <p><strong>Fecha:</strong> {date}</p>
                        <p><strong>Descripción:</strong> {description}</p>
                        <Carrusel images={imageUrls} />

                        <div className="row">
                            <div className="col-9"></div>
                            <div className="col-3">
                                <BlueButton>Inscribirse</BlueButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 justify-content-center">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                                buttonText="Inscribirse"
                                label={
                                    <label>
                                        <img className="icon-sm" src={Time} alt="Ícono de fecha" />
                                        <span className="date-text">{activity.time}</span>
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
