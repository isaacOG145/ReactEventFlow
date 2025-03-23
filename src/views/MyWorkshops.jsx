// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/main.css';

// import CustomerRootHeader from "../components/CustomerRootHeader";
// import AdminNav from "../components/AdminNav";

// export default function MyWorkshops() {
//   return (
//     <div className="app-container">
//       <CustomerRootHeader />
//       <div className="admin-nav">
//         <AdminNav />
//       </div>
//       <div className="content">
//         <h1>Mis talleres</h1>
//         <p>Este es el contenido principal del dashboard.</p>
//         <p>Puedes agregar más elementos aquí.</p>

//       </div>
//     </div>
//   );
// } 
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

// Importación de iconos locales
import iconoDetalles from '../assets/icons/mas-detalles.png';
import iconoEliminar from '../assets/icons/eliminar.png';
import iconoEditar from '../assets/icons/editar.png';


import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import { Table, Button } from 'react-bootstrap';

const events = [
  { id: 1, name: "Feria de ciencias", description: "Evento con concursos y exposiciones", asociado: "Evento_1" },
  { id: 2, name: "Concurso de arte", description: "Evento anual para exposiciones artísticas", asociado: "Evento_1" }
];
export default function MyWorkshops() {
  return (
    <div className="app-container">
<<<<<<< HEAD
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Mis talleres</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Evento asociado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Proyectos químicos</td>
              <td><a href="#">Estudiantes muestran sus proyect...</a></td>
              <td>Feria de ciencias</td>
              <td>
                <Button variant="link">👁</Button>
                <Button variant="link">✏</Button>
                <Button variant="link" className="text-danger">🗑</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Sección de esculturas</td>
              <td><a href="#">Concursantes compiten por quie...</a></td>
              <td>Concurso de arte</td>
              <td>
                <Button variant="link">👁</Button>
                <Button variant="link">✏</Button>
                <Button variant="link" className="text-danger">🗑</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
=======
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
                   <td>{event.asociado}</td>
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
>>>>>>> josue
  );
}
