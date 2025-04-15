import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/tableStyles.css";
import "../styles/iconStyles.css";


import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import ChargeWorkshop from "../components/ChargeWorkshop";


export default function AdminWorkshopDetails() {
  const { id } = useParams();
  

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <ChargeWorkshop
          key={id}
          id={id}
        />
      </div>

      
    </div>
  );
}
