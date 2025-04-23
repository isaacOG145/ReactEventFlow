import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import CheckerCard from "../components/CheckerCard";

export default function ShowCheckersEvent() {
  const { id } = useParams();
  const [eventAssignments, setEventAssignments] = useState([]);
  const [workshopAssignments, setWorkshopAssignments] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const [assignmentsLoaded, setAssignmentsLoaded] = useState(false);
  const [checkersLoaded, setCheckersLoaded] = useState(false);
  const [activitiesLoaded, setActivitiesLoaded] = useState(false);

  // 1. Obtener asignaciones
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/assignment/findAssignmentsByActivity/${id}`,{
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();

        if (data.type === "SUCCESS") {
          setEventAssignments(data.result.eventAssignments || []);
          setWorkshopAssignments(data.result.workshopAssignments || []);
        } else {
          setError("No se encontraron asignaciones.");
        }
      } catch (err) {
        setError("Error al cargar las asignaciones.");
      } finally {
        setAssignmentsLoaded(true);
      }
    };

    fetchAssignments();
  }, [id]);

  // 2. Obtener detalles de actividades
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activityIds = [
          ...eventAssignments.map(a => a.activityId),
          ...workshopAssignments.map(a => a.activityId)
        ];

        if (activityIds.length > 0) {
          const apiUrl = import.meta.env.VITE_API_URL;
          const activityResponses = await Promise.all(
            activityIds.map(activityId =>
              fetch(`${apiUrl}/activity/findById/${activityId}`,{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              }
              
              ).then(res => res.json())
            )
          );

          const activitiesData = activityResponses.map(res => res.result.name);
          setActivities(activitiesData);
        }
      } catch (err) {
        setError("Error al cargar las actividades.");
      } finally {
        setActivitiesLoaded(true);
      }
    };

    if (assignmentsLoaded) {
      fetchActivities();
    }
  }, [eventAssignments, workshopAssignments, assignmentsLoaded]);

  // 3. Obtener checadores
  useEffect(() => {
    const fetchCheckers = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token aquí
        if (!token) throw new Error('No authentication token found');

        const checkerIds = [
          ...eventAssignments.map(a => a.userId),
          ...workshopAssignments.map(a => a.userId)
        ];

        if (checkerIds.length > 0) {
          const apiUrl = import.meta.env.VITE_API_URL;
          const checkerResponses = await Promise.all(
            checkerIds.map(userId =>
              fetch(`${apiUrl}/user/findId/${userId}`, {
                headers: {
                  'Authorization': `Bearer ${token}` // Incluir el token en cada request
                }
              }).then(res => res.json())
            )
          );

          const checkersData = checkerResponses.map(res => res.result);
          setCheckers(checkersData);
        }
      } catch (err) {
        setError("Error al cargar los checadores.");
        console.error("Error details:", err); // Mejor para debugging
      } finally {
        setCheckersLoaded(true);
      }
    };

    if (assignmentsLoaded) {
      fetchCheckers();
    }
  }, [eventAssignments, workshopAssignments, assignmentsLoaded]);

  const handleChangeStatus = async (checkerId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/user/change-status/${checkerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCheckers(prev =>
          prev.map(c => c.id === checkerId ? { ...c, status: !c.status } : c)
        );
      }
    } catch (err) {
      console.error('Error al cambiar estado del checador:', err);
    }
  };

  const loading = !assignmentsLoaded || !activitiesLoaded || !checkersLoaded;

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav"><AdminNav /></div>
      <div className="content">
        <h1>Checadores del Evento</h1>

        {loading && (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando checadores...</p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Asignaciones del evento */}
            <div className="row mt-4">
              {eventAssignments.length > 0 ? (
                <>
                  <div className="col-12"><h2>Asignaciones del Evento</h2></div>
                  {eventAssignments.map((assignment, index) => (
                    <CheckerCard
                      key={assignment.assignmentId}
                      checker={checkers[index]}
                      assignment={activities[index]}
                      onChangeStatus={() => handleChangeStatus(checkers[index]?.id)}
                    />
                  ))}
                </>
              ) : (
                <div className="col-12 text-muted">No hay checadores asignados al evento.</div>
              )}
            </div>

            {/* Asignaciones de talleres */}
            <div className="row mt-4">
              {workshopAssignments.length > 0 ? (
                <>
                  <div className="col-12"><h2>Asignaciones de Talleres</h2></div>
                  {workshopAssignments.map((assignment, index) => {
                    const i = index + eventAssignments.length;
                    return (
                      <CheckerCard
                        key={assignment.assignmentId}
                        checker={checkers[i]}
                        assignment={activities[i]}
                        onChangeStatus={() => handleChangeStatus(checkers[i]?.id)}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="col-12 text-muted">No hay checadores asignados a talleres.</div>
              )}
            </div>

            {eventAssignments.length === 0 && workshopAssignments.length === 0 && (
              <div className="alert alert-info mt-4">Este evento aún no tiene checadores asignados.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
