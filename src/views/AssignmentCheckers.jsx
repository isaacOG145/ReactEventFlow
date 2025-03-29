import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/iconStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import SelectInputComponent from "../components/SelectInput.Component";
import BlueButton from "../components/BlueButton";

export default function AssignmentChecker() {
  const [eventsAndWorkshops, setEventsAndWorkshops] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedChecker, setSelectedChecker] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const bossId = localStorage.getItem("userId");

    if (bossId) {
      setLoading(true);
      setError(null);
      
      // Obtener eventos/talleres activos
      fetch(`http://localhost:8080/activity/events/byOwner/${bossId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al cargar actividades");
          }
          return response.json();
        })
        .then(data => {
          if (data.type === "SUCCESS") {
            // Filtrar solo actividades con status: true
            const activeActivities = data.result.filter(activity => activity.status === true);
            setEventsAndWorkshops(activeActivities);
          } else {
            setError(data.message || "No se encontraron actividades activas");
          }
        })
        .catch(error => {
          setError(`Error al cargar actividades: ${error.message}`);
        });

      // Obtener checadores activos
      fetch(`http://localhost:8080/user/findByBoss/${bossId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al cargar checadores");
          }
          return response.json();
        })
        .then(data => {
          if (data.type === "SUCCESS") {
            // Filtrar solo checadores activos (asumiendo que tienen propiedad status)
            const activeCheckers = data.result.filter(checker => checker.status === true);
            setCheckers(activeCheckers);
          } else {
            setError(data.message || "No se encontraron checadores activos");
          }
        })
        .catch(error => {
          setError(`Error al cargar checadores: ${error.message}`);
        })
        .finally(() => setLoading(false));
    } else {
      setError("No se encontró el ID del jefe. Por favor, inicie sesión nuevamente.");
      setLoading(false);
      navigate('/login'); // Redirigir a login si no hay userId
    }
  }, [navigate]);

  const handleAssign = () => {
    if (!selectedEvent || !selectedChecker) {
      setError("Por favor seleccione una actividad y un checador");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const assignmentData = {
      userId: selectedChecker,
      activityId: selectedEvent
    };

    fetch("http://localhost:8080/assignment/saveAssignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignmentData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then(data => {
        if (data.type === "SUCCESS") {
          setSuccessMessage("Asignación realizada con éxito");
          // Limpiar selecciones después de asignar
          setSelectedEvent("");
          setSelectedChecker("");
        } else {
          throw new Error(data.message || "Error al realizar la asignación");
        }
      })
      .catch(error => {
        setError(`Error al asignar: ${error.message}`);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="app-container">
        <CustomerRootHeader />
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="content">
          <div className="text-center mt-5">Cargando...</div>
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
        <div className="form-asign">
          <h1 className="mb-4">Asignación de Checadores</h1>

          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success mb-4" role="alert">
              {successMessage}
            </div>
          )}

          {/* Select para actividades activas */}
          <div className="form-block mb-4">
            <SelectInputComponent
              label={
                <>
                  <span className="label-text">Actividad Activa</span>
                  <span className="required-asterisk">*</span>
                </>
              }
              options={[
                { value: "", label: "Seleccionar actividad activa" },
                ...eventsAndWorkshops.map(activity => ({
                  value: activity.id,
                  label: `${activity.name} (${activity.typeActivity})`
                }))
              ]}
              value={selectedEvent}
              onChange={e => setSelectedEvent(e.target.value)}
              disabled={loading || eventsAndWorkshops.length === 0}
            />
            {eventsAndWorkshops.length === 0 && (
              <p className="text-muted small mt-2">No hay actividades activas disponibles</p>
            )}
          </div>

          {/* Select para checadores activos */}
          <div className="form-block mb-4">
            <SelectInputComponent
              label={
                <>
                  <span className="label-text">Checador Activo</span>
                  <span className="required-asterisk">*</span>
                </>
              }
              options={[
                { value: "", label: "Seleccionar checador activo" },
                ...checkers.map(checker => ({
                  value: checker.id,
                  label: checker.name
                }))
              ]}
              value={selectedChecker}
              onChange={e => setSelectedChecker(e.target.value)}
              disabled={loading || checkers.length === 0}
            />
            {checkers.length === 0 && (
              <p className="text-muted small mt-2">No hay checadores activos disponibles</p>
            )}
          </div>

          {/* Botón para asignar */}
          <BlueButton 
            onClick={handleAssign}
            disabled={loading || !selectedEvent || !selectedChecker}
          >
            {loading ? "Asignando..." : "Asignar Checador"}
          </BlueButton>
        </div>
      </div>
    </div>
  );
}