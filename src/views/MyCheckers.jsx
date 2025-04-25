import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import CheckerCard from "../components/CheckerCard";

export default function MyCheckers() {
  const [checkers, setCheckers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckers = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('No se encontró userId en el localStorage');
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/user/findByBoss/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCheckers(data.result || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching checkers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckers();
  }, []);

  // Función para manejar el cambio de estado
  const handleChangeStatus = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/user/change-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Si la solicitud es exitosa, actualizamos el estado del checador
        setCheckers((prevCheckers) =>
          prevCheckers.map((checker) =>
            checker.id === id ? { ...checker, status: !checker.status } : checker
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
                onChangeStatus={handleChangeStatus}  // Pasamos la función para manejar el cambio de estado
              />
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            No tienes checadores registrados.
          </div>
        )}
      </div>
    </div>
  );
}
