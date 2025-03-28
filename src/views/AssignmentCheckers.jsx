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

  const navigate = useNavigate();

  useEffect(() => {
    const bossId = localStorage.getItem("userId"); // Obtener bossId desde localStorage

    if (bossId) {
      // Obtener eventos/talleres
      fetch(`http://localhost:8080/activity/events/byOwner/${bossId}`)
        .then(response => response.json())
        .then(data => {
          if (data.type === "SUCCESS") {
            setEventsAndWorkshops(data.result); // Guardamos talleres y eventos
          } else {
            setError("No se encontraron eventos/talleres.");
          }
        })
        .catch(error => {
          setError("Hubo un error al cargar los eventos/talleres.");
        });

      // Obtener checadores
      fetch(`http://localhost:8080/user/findByBoss/${bossId}`)
        .then(response => response.json())
        .then(data => {
          if (data.type === "SUCCESS") {
            setCheckers(data.result); // Guardamos los checadores
          } else {
            setError("No se encontraron checadores.");
          }
        })
        .catch(error => {
          setError("Hubo un error al cargar los checadores.");
        })
        .finally(() => setLoading(false));
    } else {
      setError("No se encontró el ID del jefe.");
      setLoading(false);
    }
  }, []);

  const handleAssign = () => {
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
      .then((response) => response.json())
      .then((data) => {
        if (data.type === "SUCCESS") {
          alert("Asignación realizada con éxito.");
        } else {
          alert("Error al realizar la asignación.");
        }
      })
      .catch((error) => {
        console.error("Hubo un error al realizar la asignación:", error);
        alert("Hubo un error al realizar la asignación.");
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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

          {/* Select para actividades (Eventos/Talleres) */}
          <SelectInputComponent
            label={
              <>
                <span className="label-text">Actividad</span>
                <span className="required-asterisk">*</span>
              </>
            }
            options={[
              { value: "", label: "Seleccionar actividad" },
              ...eventsAndWorkshops.map(event => ({
                value: event.id,
                label: event.name
              }))
            ]}
            value={selectedEvent}
            onChange={e => setSelectedEvent(e.target.value)}
          />

          {/* Select para checadores */}
          <SelectInputComponent
            label={
              <>
                <span className="label-text">Checador</span>
                <span className="required-asterisk">*</span>
              </>
            }
            options={[
              { value: "", label: "Seleccionar checador" },
              ...checkers.map(checker => ({
                value: checker.id,
                label: checker.name
              }))
            ]}
            value={selectedChecker}
            onChange={e => setSelectedChecker(e.target.value)}
          />

          {/* Botón para asignar */}
          <BlueButton onClick={handleAssign}>Asignar Checador</BlueButton>
        </div>
      </div>
    </div>
  );
}
