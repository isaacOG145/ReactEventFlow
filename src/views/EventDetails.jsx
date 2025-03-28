import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";

export default function EventDetails() {
    const { eventId } = useParams(); // Usamos useParams para obtener el ID del evento
    const [eventDetails, setEventDetails] = useState(null); // Estado para almacenar los detalles del evento

    useEffect(() => {
        // Hacemos la solicitud para obtener los detalles del evento usando el ID
        fetch(`http://localhost:8080/activity/event/findById/${eventId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del evento');
                }
                return response.json();
            })
            .then((data) => {
                // Almacenamos los detalles del evento en el estado
                setEventDetails(data.result);
            })
            .catch((error) => {
                console.error("Hubo un error al cargar los detalles del evento:", error);
            });
    }, [eventId]); // Se vuelve a ejecutar si el ID del evento cambia

    if (!eventDetails) {
        return <div>Cargando detalles del evento...</div>;
    }

    return (
        <div className="app-container">
            <CustomerRootHeader />

            <div className="content-container">
                <div className="event-details">
                    <h2>{eventDetails.name}</h2>
                    <p><strong>Descripción:</strong> {eventDetails.description}</p>
                    <p><strong>Fecha:</strong> {eventDetails.date}</p>
                    <p><strong>Organizador:</strong> {eventDetails.ownerActivity.name}</p>
                    
                    {/* Mostrar imágenes */}
                    <div className="event-images">
                        {eventDetails.imageUrls.map((imageUrl, index) => (
                            <img key={index} src={imageUrl} alt={`Imagen ${index + 1} del evento`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
