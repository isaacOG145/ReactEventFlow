import React from "react";
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyProfile(){

    return (
        <div className="app-container">
          <CustomerRootHeader />
          <div className="admin-nav">
            <AdminNav />
          </div>
          <div className="content">
            <h1>Esta es la vista de mi perfil</h1>
          </div>
        </div>
      );

}