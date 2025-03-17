import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

export default function NewEvent() {
  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Crear evento</h1>
        <p>Este es el contenido principal del dashboard.</p>
        <p>Puedes agregar más elementos aquí.</p>

      </div>
    </div>
  );
} 