import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/tableStyles.css";
import "../styles/iconStyles.css";


import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import NavigatePurpleButton from "../components/NavigatePurpleButton";
import ChargeWorkshop from "../components/ChargeWorkshop";

export default function AdminEventWorkshops() {
  const { eventId } = useParams();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {

        const response = await fetch(`http://localhost:8080/activity/findByEvent/${eventId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.result);
        setWorkshops(data.result || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching checkers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);



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
            <p className="mt-2">Cargando talleres...</p>
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
            Error al cargar los datos: {error}
          </div>
          <div className="text-center">
            <NavigatePurpleButton onClick={fetchWorkshops}>
              Reintentar
            </NavigatePurpleButton>
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
        {workshops.length > 0 ? (
          <div className="row">
            {workshops.map((workshop) => (
              <ChargeWorkshop
                key={workshop.id}
                id={workshop.id}
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