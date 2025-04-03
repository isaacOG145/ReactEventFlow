import React from "react";
import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import AssignmentTable from "../components/AssignmentTable";

export default function MyAsignments() {

    const [events, setEvents] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');
    if (!userId) {
        throw new Error('No se encontró userId en el localStorage');
    }

    // Cargar eventos
    useEffect(() => {
        async function fetchEvents() {
            try {
 
                const response = await fetch(`http://localhost:8080/assignment/events/findByOwner/${userId}`);
                const data = await response.json();
                if (data.type === "SUCCESS") {
                    const eventsData = data.result.map(item => ({
                        id: item.id,
                        checkerName: `${item.user.name} ${item.user.lastName}`,
                        activityName: item.activity.name
                    }));
                    setEvents(eventsData);
                } else {
                    setError("No se pudieron cargar los eventos.");
                }
            } catch (error) {
                setError("Error al cargar los eventos.");
            }
        }

        // Cargar talleres
        async function fetchWorkshops() {
            try {
                const response = await fetch(`http://localhost:8080/assignment/workshops/findByOwner/${userId}`);
                const data = await response.json();
                if (data.type === "SUCCESS") {
                    const workshopsData = data.result.map(item => ({
                        id: item.id,
                        checkerName: `${item.user.name} ${item.user.lastName}`,
                        activityName: item.activity.name
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
    }, []);

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

                <AssignmentTable title="Eventos" assignments={events} />

                <h1>Asignaciones de Talleres</h1>

                <AssignmentTable title="Talleres" assignments={workshops} />

            </div>
        </div>
    );
} 