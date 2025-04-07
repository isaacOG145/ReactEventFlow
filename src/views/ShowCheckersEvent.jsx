import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import CheckerCard from "../components/CheckerCard";

export default function ShowCheckersEvent() {
  const { id } = useParams();  // Aquí obtenemos el ID del evento desde la URL
  const [checkers, setCheckers] = useState([]);  // Guardamos los checadores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar los checadores y los detalles de los usuarios
  const fetchCheckers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/assignment/findByActivity/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log("Respuesta de la API:", data); // Log para ver la respuesta completa

      if (data.type === "SUCCESS") {
        // Si la respuesta es exitosa, obtenemos las asignaciones de los eventos
        const assignments = data.result; // Obtenemos la lista de asignaciones directamente

        // Verificamos la estructura de las asignaciones
        console.log("Asignaciones obtenidas:", assignments);

        // Procesamos los checadores con los datos de usuario ya presentes en cada asignación
        const checkersWithUserDetails = assignments.map((assignment) => {
          const user = assignment.user || {};  // Aseguramos que el usuario esté disponible
          
          // Log para verificar cómo se ve el usuario
          console.log(`Detalles del usuario para la asignación ${assignment.assignmentId}:`, user);

          return {
            ...assignment,
            user: user,  // Los detalles del usuario están directamente aquí
          };
        });

        console.log("Checadores con detalles de usuario:", checkersWithUserDetails);

        // Establecemos los checadores en el estado
        setCheckers(checkersWithUserDetails);
      } else {
        setError(data.text || "No se encontraron checadores");
      }
    } catch (err) {
      console.error("Error fetching checkers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Llamamos a la API cuando el componente se monta
  useEffect(() => {
    fetchCheckers();
  }, [id]);

  // Cambiar el estado de un checador
  const handleChangeStatus = async (checkerId) => {
    try {
      // Aquí debes hacer la lógica para cambiar el estado de un checador (activo/inactivo)
      const response = await fetch(`http://localhost:8080/assignment/change-status/${checkerId}`, {
        method: "PUT"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCheckers();  // Refrescamos la lista después de cambiar el estado
    } catch (err) {
      console.error("Error changing status:", err);
      setError("Error al cambiar el estado del checador.");
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
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando checadores...</p>
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
        <h1>Checadores del Evento</h1>

        {checkers.length > 0 ? (
          <div className="row mt-4">
            {checkers.map((checker) => {
              const user = checker.user || {};  // Nos aseguramos de que `user` esté definido

              return (
                <CheckerCard
                  key={checker.assignmentId}
                  checker={{
                    id: checker.userId,
                    name: user.name || "Nombre no disponible",  // Valor predeterminado si no hay nombre
                    lastName: user.lastName || "Apellido no disponible",  // Valor predeterminado si no hay apellido
                    email: user.email || "No especificado",  // Valor predeterminado si no hay email
                    phone: user.phone || "No especificado",  // Valor predeterminado si no hay teléfono
                    status: checker.status ? "active" : "inactive"
                  }}
                  onChangeStatus={handleChangeStatus}  // Pasamos la función para cambiar el estado
                />
              );
            })}
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
