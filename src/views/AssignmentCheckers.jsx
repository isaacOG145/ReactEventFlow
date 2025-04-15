import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/iconStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SelectInputComponent from "../components/SelectInput.Component";
import BlueButton from "../components/BlueButton";
import MessageModal from "../components/modals/MessageModal";

export default function AssignmentChecker({ activity, onClose, onUpdateSuccess }) {
  const [checkers, setCheckers] = useState([]);
  const [selectedChecker, setSelectedChecker] = useState("");
  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const navigate = useNavigate();

  const showNotification = (message, type = "success", duration = 3000) => {
    setNotification({ show: true, message, type });

    if (type !== "loading") {
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "success" });

        if (type === "success") {
          if (onUpdateSuccess) onUpdateSuccess(); // ✅ refrescar datos suavemente
          if (onClose) onClose(); // ✅ cerrar modal
        }
      }, duration);
    }
  };

  useEffect(() => {
    const bossId = localStorage.getItem("userId");

    if (bossId) {
      setLoading(true);
      fetch(`http://localhost:8080/user/findByBoss/${bossId}`,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al cargar checadores");
          return res.json();
        })
        .then(data => {
          if (data.type === "SUCCESS") {
            const activos = data.result.filter(c => c.status === true);
            setCheckers(activos);
          } else {
            showNotification(data.message || "No se encontraron checadores activos", "error");
          }
        })
        .catch(err => {
          showNotification(`Error al cargar checadores: ${err.message}`, "error");
        })
        .finally(() => setLoading(false));
    } else {
      showNotification("No se encontró el ID del jefe. Inicie sesión.", "error");
      setLoading(false);
      navigate('/login');
    }
  }, [navigate]);

  const handleAssign = () => {
    if (!activity || !selectedChecker) {
      showNotification("Por favor seleccione un checador", "error");
      return;
    }

    showNotification("Asignando checador...", "loading");

    const assignmentData = {
      userId: selectedChecker,
      activityId: activity.id
    };

    fetch("http://localhost:8080/assignment/saveAssignment", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
       },
      body: JSON.stringify(assignmentData),
    })
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          // Si es un 400 con tipo WARNING, no es un error real
          if (response.status === 400 && data.type === "WARNING") {
            return data; // ⚠️ Se trata como advertencia
          }

          // Otros errores sí los lanzamos
          throw new Error(data.message || data.text || "Error en la respuesta del servidor");
        }

        return data; // éxito
      })
      .then(data => {
        if (data.type === "SUCCESS") {
          showNotification("Asignación realizada con éxito", "success");
        } else if (data.type === "WARNING") {
          showNotification(data.text || "Advertencia", "warning");
          // ⚠️ No cerramos el modal en este caso, si así lo quieres
        } else {
          throw new Error(data.message || "Respuesta desconocida");
        }
      })
      .catch(err => {
        console.error("Error en asignación:", err);
        // ⚠️ Solo mostramos error real aquí
        showNotification(err.message || "Ocurrió un error inesperado", "error");
      });
  };


  return (
    <div>
      <div className="form-block mb-4">
        <label className="form-label fw-bold">Actividad a asignar:</label>
        <p className="activity-edit">{activity?.name} ({activity?.typeActivity === 'EVENT' ? 'Evento' : 'Taller'})</p>
      </div>

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
            ...checkers.map(c => ({
              value: c.id,
              label: `${c.name} ${c.lastName}`
            }))
          ]}
          value={selectedChecker}
          onChange={e => setSelectedChecker(e.target.value)}
          disabled={loading || checkers.length === 0}
        />
        {checkers.length === 0 && !loading && (
          <p className="text-muted small mt-2">No hay checadores activos disponibles</p>
        )}
      </div>

      <BlueButton
        onClick={handleAssign}
        disabled={!activity || !selectedChecker}
      >
        Asignar Checador
      </BlueButton>

      <MessageModal
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        type={notification.type}
        message={notification.message}
      />
    </div>
  );
}
