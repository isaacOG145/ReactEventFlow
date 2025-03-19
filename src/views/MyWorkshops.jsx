import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

// Importación de iconos locales
import iconoDetalles from '../assets/icons/mas-detalles.png';
import iconoEliminar from '../assets/icons/eliminar.png';
import iconoEditar from '../assets/icons/editar.png';


import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";

const events = [
  { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", date: "12/jun/2025" },
  { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", date: "01/oct/2025" }
];
export default function MyWorkshops() {
  return (
    <div className="app-container">
         <CustomerRootHeader />
         <div className="admin-nav">
           <AdminNav />
         </div>
         <div className="content">
           <h1>Mis talleres</h1>
           <table className="table">
             <thead>
               <tr>
                 <th>No.</th>
                 <th>Nombre</th>
                 <th>Descripción</th>
                 <th>Evento asociado</th>
                 <th>Acciones</th>
               </tr>
             </thead>
             <tbody>
               {events.map((event, index) => (
                 <tr key={event.id}>
                   <td>{index + 1}</td>
                   <td>{event.name}</td>
                   <td><a href="#" className="text-primary">{event.description}</a></td>
                   <td>{event.date}</td>
                   <td>
                     <button className="btn btn-link">
                       <img src={iconoDetalles} alt="Ver detalles" width="20" />
                     </button>
                     <button className="btn btn-link">
                       <img src={iconoEditar} alt="Editar" width="20" />
                     </button>
                     <button className="btn btn-link text-danger">
                       <img src={iconoEliminar} alt="Eliminar" width="20" />
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
  );
} 