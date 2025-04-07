import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import CheckerCard from "../components/CheckerCard";

export default function ShowCheckersEvent() {
    const { id } = useParams();  // ID del evento desde la URL
    const [eventAssignments, setEventAssignments] = useState([]);
    const [workshopAssignments, setWorkshopAssignments] = useState([]);
    const [checkers, setCheckers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener las asignaciones de evento y talleres
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/assignment/findAssignmentsByActivity/${id}`);
                const data = await response.json();

                console.log("Datos de asignaciones:", data); // Log para verificar lo que recibimos

                if (data.type === "SUCCESS") {
                    setEventAssignments(data.result.eventAssignments || []);
                    setWorkshopAssignments(data.result.workshopAssignments || []);
                } else {
                    setError("No se encontraron asignaciones.");
                }
            } catch (err) {
                setError("Error al cargar las asignaciones.");
                console.error('Error fetching assignments:', err);
            }
        };

        fetchAssignments();
    }, [id]);  // Dependemos del 'id' para que se recargue cuando cambie

    const handleChangeStatus = async (checkerId) => {
        try {
            const response = await fetch(`http://localhost:8080/user/change-status/${checkerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                // Si la solicitud es exitosa, actualizamos el estado del checador
                setCheckers((prevCheckers) =>
                    prevCheckers.map((checker) =>
                        checker.id === checkerId ? { ...checker, status: !checker.status } : checker
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

    // Obtener detalles de la actividad por ID (usamos activityId de las asignaciones)
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Recorremos las asignaciones y obtenemos el nombre de la actividad
                const activityIds = [
                    ...eventAssignments.map(assignment => assignment.activityId),
                    ...workshopAssignments.map(assignment => assignment.activityId)
                ];

                if (activityIds.length > 0) {
                    // Hacemos las peticiones para obtener los nombres de las actividades
                    const activityResponses = await Promise.all(
                        activityIds.map(activityId =>
                            fetch(`http://localhost:8080/activity/findById/${activityId}`).then(res => res.json())
                        )
                    );

                    const activitiesData = activityResponses.map(response => response.result.name);
                    setActivities(activitiesData);

                    console.log("Actividades obtenidas:", activitiesData); // Log para verificar actividades
                }
            } catch (err) {
                setError("Error al cargar las actividades.");
                console.error("Error fetching activities:", err);
            }
        };

        // Solo ejecutar la solicitud si ya tenemos asignaciones
        if (eventAssignments.length > 0 || workshopAssignments.length > 0) {
            fetchActivities();
        }
    }, [eventAssignments, workshopAssignments]);  // Solo ejecutar si las asignaciones cambian

    // Obtener detalles de los checadores (por userId)
    useEffect(() => {
        const fetchCheckers = async () => {
            try {
                // Obtenemos los userId de todas las asignaciones (event y workshop)
                const checkerIds = [
                    ...eventAssignments.map(assignment => assignment.userId),
                    ...workshopAssignments.map(assignment => assignment.userId)
                ];

                if (checkerIds.length > 0) {
                    const checkerResponses = await Promise.all(
                        checkerIds.map(userId =>
                            fetch(`http://localhost:8080/user/findId/${userId}`).then(res => res.json())
                        )
                    );

                    const checkersData = checkerResponses.map(response => response.result);
                    setCheckers(checkersData);

                    console.log("Checadores obtenidos:", checkersData); // Log para verificar checadores
                }
            } catch (err) {
                setError("Error al cargar los checadores.");
                console.error("Error fetching checkers:", err);
            }
        };

        // Solo ejecutar la solicitud si ya tenemos asignaciones
        if (eventAssignments.length > 0 || workshopAssignments.length > 0) {
            fetchCheckers();
        }
    }, [eventAssignments, workshopAssignments]);  // Solo ejecutar si las asignaciones cambian

    // Cuando todos los datos están cargados, establecer loading en false
    useEffect(() => {
        if (
            eventAssignments.length > 0 &&
            workshopAssignments.length > 0 &&
            activities.length > 0 &&
            checkers.length > 0
        ) {
            setLoading(false);
        }
    }, [eventAssignments, workshopAssignments, activities, checkers]);

    if (loading) {
        return (
            <div className="app-container">
                <CustomerRootHeader />
                <div className="admin-nav">
                    <AdminNav />
                </div>
                <div className="content">
                    <h1>Checadores del Evento</h1>
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p>Cargando checadores...</p>
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
                    <h1>Checadores del Evento</h1>
                    <div className="alert alert-danger" role="alert">
                        Error al cargar los checadores: {error}
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
                <h1>Checadores del Evento</h1>

                <div className="row mt-4">
                    {/* Renderizar checadores para el evento */}
                    {eventAssignments.map((assignment, index) => (
                        <CheckerCard
                            key={assignment.assignmentId}
                            checker={checkers[index]}  // Información del checador
                            assignment={activities[index]}  // Nombre de la actividad
                            onChangeStatus={() => handleChangeStatus(checkers[index].id)}  // Pasamos el ID del checador
                        />
                    ))}
                </div>

                <div className="row mt-4">
                    {/* Renderizar checadores para los talleres */}
                    {workshopAssignments.map((assignment, index) => (
                        <CheckerCard
                            key={assignment.assignmentId}
                            checker={checkers[index + eventAssignments.length]}  // Información del checador
                            assignment={activities[index + eventAssignments.length]}  // Nombre de la actividad
                            onChangeStatus={() => handleChangeStatus(checkers[index + eventAssignments.length].id)}  // Pasamos el ID del checador
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
