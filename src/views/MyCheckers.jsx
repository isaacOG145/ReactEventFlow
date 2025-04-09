import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import CheckerCard from "../components/CheckerCard";
import MessageModal from "../components/modals/MessageModal";

export default function MyCheckers() {
  const [checkers, setCheckers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchCheckers = async () => {
      try {
        showNotification("Cargando checadores...", "loading");
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('No se encontró userId en el localStorage');
        }

        const response = await fetch(`http://localhost:8080/user/findByBoss/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCheckers(data.result || []);
        showNotification("Checadores cargados exitosamente", "success");
      } catch (err) {
        setError(err.message);
        showNotification(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckers();
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      showNotification("Actualizando estado...", "loading");
      const response = await fetch(`http://localhost:8080/user/change-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCheckers((prevCheckers) =>
          prevCheckers.map((checker) =>
            checker.id === id ? { ...checker, status: !checker.status } : checker
          )
        );
        showNotification("Estado actualizado exitosamente", "success");
      } else {
        showNotification("Error al actualizar estado", "error");
      }
    } catch (error) {
      showNotification("Error al realizar la solicitud", "error");
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <CustomerRootHeader />
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="content">
          <h1>Mis checadores</h1>
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
          <h1>Mis checadores</h1>
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
        <h1>Mis checadores</h1>

        {checkers.length > 0 ? (
          <div className="row">
            {checkers.map((checker) => (
              <CheckerCard
                key={checker.id}
                checker={checker}
                onChangeStatus={handleChangeStatus}
              />
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            No tienes checadores registrados.
          </div>
        )}
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