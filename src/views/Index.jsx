import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/modalStyles.css';


import CustomerRootHeader from "../components/CustomerRootHeader";

export default function Index() {

  const handleCloseModal = () => {
    // Lógica para cerrar el modal
    console.log("Modal cerrado");
  };
 

  return (
    <div className="app-container">
      <CustomerRootHeader />
      {/* esto deberia quitarse o ponerse al presionar un boton de icono*/}


      

      

  
      

    </div>
  );
} 