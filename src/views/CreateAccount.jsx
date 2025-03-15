import React from "react";
// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';

//png
import backgroundSecondary from '../assets/backgroundSecondary.png';

export default function CreateAccount(){

    return(
        <div className="background-container" style={{ backgroundImage: `url(${backgroundSecondary})` }}>

        </div>
    );
}