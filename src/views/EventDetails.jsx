import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'; // Importamos el locale en español

import '../styles/main.css';

import Carrusel from "../components/Carrusel";
import BlueButton from "../components/BlueButton";
import ModalComponent from "../components/modals/ModalComponent";
import CustomerRootHeader from "../components/CustomerRootHeader";
import ActivityCard from "../components/ActivityCard";

import eventDate from '../assets/icons/calendario.png';
import Time from '../assets/icons/time-and-date.png';

import CreateUserAcount from "../components/modals/CreateUserAcount";


export default function EventDetails() {
    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => {
        fetchEventDetails();
        fetchActivities();
        setLoading(false);
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!eventDetails) {
        return <div>No se encontraron detalles para este evento.</div>;
    }

    const { name, date, description, imageUrls } = eventDetails;

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'dd MMMM yyyy', { locale: es }); // Usamos el locale en español
    };

    // Función para formatear la hora
    const formatTime = (timeString) => {
        const dateObj = new Date(`1970-01-01T${timeString}Z`); // Convertir la hora en un objeto Date
        const hours = dateObj.getUTCHours(); // Obtener las horas
        const minutes = dateObj.getUTCMinutes(); // Obtener los minutos

        // Formatear como 'HH:mm'
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <div className="app-container">
            <CustomerRootHeader />
            <div className="content-container">
                {/* Contenedor principal centrado */}
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="card-details mt-4" id="card">
                            <h1>{name}</h1>
                            <label>
                                <img className="icon-ssm" src={eventDate} alt="Ícono de fecha" />
                                <span className="date-text">{formatDate(date)}</span>
                            </label>
                            <p><strong>Descripción:</strong> {description}</p>
                            <div className="col-6 d-flex gap-2">
                                
                                <a className="event-info" href="#workshopsZone">Ver talleres</a>
                            </div>
                            <Carrusel images={imageUrls} />

                            <div className="row">
                                <div className="col-9"></div>
                                <div className="col-3">
                                    <BlueButton onClick={handleOpenModal}>Inscribirse</BlueButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <ModalComponent show={showModal} onClose={handleCloseModal} title="Crear cuenta">
                    <CreateUserAcount activityId={id} onRegistrationSuccess={handleCloseModal} />
                </ModalComponent>

                <div className="row p-4 mt-4 text-center">
                    <h1>Talleres Asociados</h1>
                </div>

                <div className="row mt-4 justify-content-center" id="workshopsZone">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                                scrollToId="card"
                                buttonText="Ir al evento"
                                label={
                                    <label>
                                        <img className="icon-sm" src={Time} alt="Ícono de fecha" />
                                        <span className="date-text">{formatTime(activity.time)}</span>
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
