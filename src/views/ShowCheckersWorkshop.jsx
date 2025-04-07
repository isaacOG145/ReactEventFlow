import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import CheckerCard from "../components/CheckerCard";

export default function ShowCheckersByActivity() {
  const { id } = useParams();  // Aquí usamos el id de la actividad desde la URL
  const [assignments, setAssignments] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las asignaciones por actividad
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/assignment/findByActivity/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setAssignments(data.result || []);  // Asignamos las asignaciones al estado
      } catch (err) {
        setError(err.message);
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [id]);  // Dependencia en el 'id' para volver a ejecutar si cambia el id de la actividad

  // Usar los user.id de las asignaciones para buscar los checkers
  useEffect(() => {
    if (assignments.length > 0) {
      const fetchCheckers = async () => {
        try {
          const checkerIds = assignments.map((assignment) => assignment.user.id);  // Extraemos los user.id de las asignaciones

          // Realizamos las peticiones para obtener los checkers
          const checkerResponses = await Promise.all(
            checkerIds.map((userId) =>
              fetch(`http://localhost:8080/user/findId/${userId}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                }
              })
            )
          );

          const checkerData = await Promise.all(checkerResponses.map((response) => response.json()));
          setCheckers(checkerData.map((data) => data.result || {}));  // Guardamos los checkers en el estado
        } catch (err) {
          setError(err.message);
          console.error('Error fetching checkers:', err);
        }
      };

      fetchCheckers();
    }
  }, [assignments]);  // Solo ejecutar este useEffect si las asignaciones cambian

  // Función para manejar el cambio de estado de un checker
  const handleChangeStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/user/change-status/${id}`, {
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
        <h1>Checador</h1>

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
