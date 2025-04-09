import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import SelectInputComponent from "../components/SelectInput.Component";
import BlueButton from "../components/BlueButton";
import MessageModal from "../components/modals/MessageModal";

export default function AssignmentChecker() {
  const [eventsAndWorkshops, setEventsAndWorkshops] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedChecker, setSelectedChecker] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    if (type !== "loading") {
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    }
  };

  useEffect(() => {
    const fetchEventsAndWorkshops = async () => {
      try {
        showNotification("Cargando actividades activas...", "loading");
        const response = await fetch("http://localhost:8080/activity/findActive");
        if (!response.ok) throw new Error("Error al cargar actividades activas");

        const data = await response.json();
        if (data.type === "SUCCESS") {
          setEventsAndWorkshops(data.result);
          showNotification("Actividades cargadas exitosamente", "success");
        } else {
          throw new Error("No se encontraron actividades activas");
        }
      } catch (error) {
        console.error("Error al cargar actividades activas:", error);
        showNotification("Error al cargar actividades activas", "error");
      }
    };

    const fetchCheckers = async () => {
      try {
        showNotification("Cargando checadores activos...", "loading");
        const response = await fetch("http://localhost:8080/user/findActiveCheckers");
        if (!response.ok) throw new Error("Error al cargar checadores activos");

        const data = await response.json();
        if (data.type === "SUCCESS") {
          setCheckers(data.result);
          showNotification("Checadores cargados exitosamente", "success");
        } else {
          throw new Error("No se encontraron checadores activos");
        }
      } catch (error) {
        console.error("Error al cargar checadores activos:", error);
        showNotification("Error al cargar checadores activos", "error");
      }
    };

    fetchEventsAndWorkshops();
    fetchCheckers();
  }, []);

  const handleAssign = async () => {
    if (!selectedEvent || !selectedChecker) {
      showNotification("Por favor, selecciona una actividad y un checador.", "warning");
      return;
    }

    try {
      setLoading(true);
      showNotification("Asignando checador...", "loading");

      const response = await fetch("http://localhost:8080/activity/assignChecker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId: selectedEvent,
          checkerId: selectedChecker,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al asignar el checador");
      }

      showNotification("Checador asignado exitosamente", "success");
      setSelectedEvent("");
      setSelectedChecker("");
    } catch (error) {
      console.error("Error al asignar checador:", error);
      showNotification(error.message || "Hubo un error al asignar el checador", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <div className="form-asign">
          <h1 className="mb-4">Asignación de Checadores</h1>

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
                ...eventsAndWorkshops.map((activity) => ({
                  value: activity.id,
                  label: `${activity.name} (${activity.typeActivity === "EVENT" ? "Evento" : "Taller"})`,
                })),
              ]}
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              disabled={loading || eventsAndWorkshops.length === 0}
            />
            {eventsAndWorkshops.length === 0 && (
              <p className="text-muted small mt-2">No hay actividades activas disponibles</p>
            )}
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
                ...checkers.map((checker) => ({
                  value: checker.id,
                  label: `${checker.name} ${checker.lastName}`,
                })),
              ]}
              value={selectedChecker}
              onChange={(e) => setSelectedChecker(e.target.value)}
              disabled={loading || checkers.length === 0}
            />
            {checkers.length === 0 && (
              <p className="text-muted small mt-2">No hay checadores activos disponibles</p>
            )}
          </div>

          <BlueButton
            onClick={handleAssign}
            disabled={loading || !selectedEvent || !selectedChecker}
          >
            {loading ? "Asignando..." : "Asignar Checador"}
          </BlueButton>
        </div>
      </div>

      {/* Modal de notificación */}
      <MessageModal
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        type={notification.type}
        message={notification.message}
      />
    </div>
  );
}