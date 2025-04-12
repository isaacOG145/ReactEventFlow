import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/iconStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SelectInputComponent from "../components/SelectInput.Component";
import BlueButton from "../components/BlueButton";

export default function AssignmentChecker({ activity }) {
  const [checkers, setCheckers] = useState([]);
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
      navigate('/login');
    }
  }, [navigate]);

  const handleAssign = () => {
    if (!activity || !selectedChecker) {
      setError("Por favor seleccione un checador");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const assignmentData = {
      userId: selectedChecker,
      activityId: activity.id // usamos directamente el id
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

  return (
    <div>
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

      {/* Mostrar actividad como label */}
      <div className="form-block mb-4">
        <label className="form-label fw-bold">Actividad a asignar:</label>
        <p className="activity-edit">{activity?.name} ({activity?.typeActivity === 'EVENT' ? 'Evento' : 'Taller'})</p>
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
              label: `${checker.name} ${checker.lastName}`
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

      <BlueButton
        onClick={handleAssign}
        disabled={loading || !activity || !selectedChecker}
      >
        {loading ? "Asignando..." : "Asignar Checador"}
      </BlueButton>
    </div>
  );
}
