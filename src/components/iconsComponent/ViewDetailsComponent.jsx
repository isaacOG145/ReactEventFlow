import React from "react";
import { Link } from 'react-router-dom';  // Asegúrate de importar Link
import '../../styles/iconStyles.css';
import Eye from '../../assets/icons/mas-detalles.png';

const ViewDetailsComponent = ({ to, children }) => {
    return (
        <button className="view-details-button">
            <Link to={to} className="view-details-link">
               <img className="icon-md" src={Eye} alt="Detalles" /> 
            </Link>
            
        </button>
    );
};

export default ViewDetailsComponent;
