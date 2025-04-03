import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import AssignmentTable from "../components/AssignmentTable";

export default function MyAssignments() {
    const [events, setEvents] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ownerId = localStorage.getItem('userId');

    useEffect(() => {
        async function fetchEvents() {
            if (!ownerId) {
                setError("No se ha encontrado el ID del propietario.");
                return;
            }

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
                    setError("No se pudieron cargar los eventos.");
                }
            } catch (error) {
                setError("Error al cargar los eventos.");
            }
        }

        async function fetchWorkshops() {
            if (!ownerId) {
                setError("No se ha encontrado el ID del propietario.");
                return;
            }

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
                    setError("No se pudieron cargar los talleres.");
                }
            } catch (error) {
                setError("Error al cargar los talleres.");
            }
        }

        fetchEvents();
        fetchWorkshops();
        setLoading(false);
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
                setEvents(prevEvents =>
                    prevEvents.map((event) =>
                        event.id === id ? { ...event, status: !event.status } : event
                    )
                );
                setWorkshops(prevWorkshops =>
                    prevWorkshops.map((workshop) =>
                        workshop.id === id ? { ...workshop, status: !workshop.status } : workshop
                    )
                );
                console.log('Estado actualizado:', data);
            } else {
                console.log('Error al actualizar estado:', data);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const handleUpdateAssignment = (updatedAssignment) => {
        // Actualizar eventos
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

        // Actualizar talleres
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

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="app-container">
            <CustomerRootHeader />
            <div className="admin-nav">
                <AdminNav />
            </div>
            <div className="content">
                <h1>Asignaciones de Eventos</h1>
                <AssignmentTable
                    title="Evento"
                    assignments={events}
                    onChangeStatus={handleChangeStatus}
                    onUpdate={handleUpdateAssignment}
                />

                <h1>Asignaciones de Talleres</h1>
                <AssignmentTable
                    title="Taller"
                    assignments={workshops}
                    onChangeStatus={handleChangeStatus}
                    onUpdate={handleUpdateAssignment}
                />
            </div>
        </div>
    );
}