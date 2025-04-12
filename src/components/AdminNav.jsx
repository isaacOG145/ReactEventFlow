import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import NavigateButton from "./NavigateButton";

export default function AdminNav() {

    return (
        <div className="admin-nav">
            <NavigateButton to="/dashboard/nuevo-evento">Nuevo evento</NavigateButton>
            <NavigateButton to="/dashboard/nuevo-taller">Nuevo Taller</NavigateButton>
            <NavigateButton to="/dashboard/nuevo-checador">Nuevo checador</NavigateButton>
            <NavigateButton to="/dashboard/mis-checadores">Mis checadores</NavigateButton>
            <NavigateButton to="/dashboard/mis-eventos">Mis eventos</NavigateButton>
            <NavigateButton to="/dashboard/mis-talleres">Mis talleres</NavigateButton>
            <NavigateButton to="/dashboard/mis-asignaciones">Mis asignaciones</NavigateButton>
            
        </div>
    );
}