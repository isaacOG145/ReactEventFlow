import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
    /*
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirigir al login si no hay token
        }
    }, [navigate]);
    */
    
    
    return(
        <div>
            <h1>Hola, soy el dashboard</h1>
        </div>
    );
}