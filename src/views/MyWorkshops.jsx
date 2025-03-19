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

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import { Table, Button } from 'react-bootstrap';

export default function MyWorkshops() {
  return (
    <div className="app-container">
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
  );
}
