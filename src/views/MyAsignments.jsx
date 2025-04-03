import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import AssignmentTable from "../components/AssignmentTable";

export default function MyAssignments() {
    const [events, setEvents] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingWorkshops, setLoadingWorkshops] = useState(true);
    const [errorEvents, setErrorEvents] = useState(null);
    const [errorWorkshops, setErrorWorkshops] = useState(null);

    const ownerId = localStorage.getItem('userId');

    useEffect(() => {
        if (!ownerId) {
            setErrorEvents("No se ha encontrado el ID del propietario.");
            setErrorWorkshops("No se ha encontrado el ID del propietario.");
            setLoadingEvents(false);
            setLoadingWorkshops(false);
            return;
        }

        // Cargar eventos
        async function fetchEvents() {
            try {
                const response = await fetch(`http://localhost:8080/assignment/events/findByOwner/${ownerId}`);
                const data = await response.json();
                
                if (data.type === "SUCCESS") {
                    const eventsData = data.result.map(item => ({
                        id: item.id,
                        checkerName: `${item.user.name} ${item.user.lastName}`,
                        activityName: item.activity.name,
                        status: item.status
                    }));
                    setEvents(eventsData);
                } else {
                    setErrorEvents("No se pudieron cargar los eventos.");
                }
            } catch (error) {
                setErrorEvents("Error al cargar los eventos.");
            } finally {
                setLoadingEvents(false);
            }
        }

        // Cargar talleres
        async function fetchWorkshops() {
            try {
                const response = await fetch(`http://localhost:8080/assignment/workshops/findByOwner/${ownerId}`);
                const data = await response.json();
                
                if (data.type === "SUCCESS") {
                    const workshopsData = data.result.map(item => ({
                        id: item.id,
                        checkerName: `${item.user.name} ${item.user.lastName}`,
                        activityName: item.activity.name,
                        status: item.status
                    }));
                    setWorkshops(workshopsData);
                } else {
                    setErrorWorkshops("No se pudieron cargar los talleres.");
                }
            } catch (error) {
                setErrorWorkshops("Error al cargar los talleres.");
            } finally {
                setLoadingWorkshops(false);
            }
        }

        fetchEvents();
        fetchWorkshops();
    }, [ownerId]);

    const handleChangeStatus = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/assignment/change-status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                // Buscar y actualizar en eventos
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === id ? { ...event, status: !event.status } : event
                    )
                );
                // Buscar y actualizar en talleres
                setWorkshops(prevWorkshops =>
                    prevWorkshops.map(workshop =>
                        workshop.id === id ? { ...workshop, status: !workshop.status } : workshop
                    )
                );
            }
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    };

    const handleUpdateAssignment = (updatedAssignment) => {
        // Actualizar en eventos
        setEvents(prevEvents =>
            prevEvents.map(event =>
                event.id === updatedAssignment.id
                    ? {
                        ...event,
                        checkerName: `${updatedAssignment.user.name} ${updatedAssignment.user.lastName}`,
                        status: updatedAssignment.status || event.status
                    }
                    : event
            )
        );

        // Actualizar en talleres
        setWorkshops(prevWorkshops =>
            prevWorkshops.map(workshop =>
                workshop.id === updatedAssignment.id
                    ? {
                        ...workshop,
                        checkerName: `${updatedAssignment.user.name} ${updatedAssignment.user.lastName}`,
                        status: updatedAssignment.status || workshop.status
                    }
                    : workshop
            )
        );
    };

    return (
        <div className="app-container">
            <CustomerRootHeader />
            <div className="admin-nav">
                <AdminNav />
            </div>
            <div className="content">
                {/* Sección de Eventos */}
                <h1 className="mb-4">Asignaciones de Eventos</h1>
                {loadingEvents ? (
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p>Cargando eventos...</p>
                    </div>
                ) : errorEvents ? (
                    <div className="alert alert-danger">{errorEvents}</div>
                ) : (
                    <AssignmentTable
                        title="Evento"
                        assignments={events}
                        onChangeStatus={handleChangeStatus}
                        onUpdate={handleUpdateAssignment}
                    />
                )}

                {/* Sección de Talleres */}
                <h1 className="mb-4 mt-5">Asignaciones de Talleres</h1>
                {loadingWorkshops ? (
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p>Cargando talleres...</p>
                    </div>
                ) : errorWorkshops ? (
                    <div className="alert alert-danger">{errorWorkshops}</div>
                ) : (
                    <AssignmentTable
                        title="Taller"
                        assignments={workshops}
                        onChangeStatus={handleChangeStatus}
                        onUpdate={handleUpdateAssignment}
                    />
                )}
            </div>
        </div>
    );
}