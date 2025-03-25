import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

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

        const response = await fetch(`http://localhost:8080/user/findByBoss/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Respuesta de la API:", result);  // Para verificar el contenido

        const data = Array.isArray(result.result) ? result.result : [];  // Asegúrate de que es un arreglo
        setCheckers(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching checkers:', err);
      } finally {
        setLoading(false);
      }
    };


    fetchCheckers();
  }, []);

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

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando checadores...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            Error al cargar los checadores: {error}
          </div>
        ) : (
          Array.isArray(checkers) && checkers.length > 0 ? (
            <div className="row">
              {checkers.map((checker, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card p-3 shadow-sm h-100">
                    <h5>{checker.name} {checker.lastName}</h5>
                    <p className="mb-1">{checker.email}</p>
                    <p className="mb-3">{checker.phone}</p>
                    <p className="mb-1">{checker.status ? 'Activo' : 'Inactivo'}</p>
                    <div className="d-flex justify-content-between mt-auto">
                      <button className="btn btn-outline-primary btn-sm">🔄 Actualizar</button>
                      <button className="btn btn-outline-secondary btn-sm">✏ Editar</button>
                      <button className="btn btn-outline-danger btn-sm">🗑 Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info" role="alert">
              No tienes checadores registrados.
            </div>
          )
        )}
      </div>
    </div>
  );

}