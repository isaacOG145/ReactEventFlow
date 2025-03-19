// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/main.css';

// import CustomerRootHeader from "../components/CustomerRootHeader";
// import AdminNav from "../components/AdminNav";

// export default function MyChechers() {
//   return (
//     <div className="app-container">
//       <CustomerRootHeader />
//       <div className="admin-nav">
//         <AdminNav />
//       </div>
//       <div className="content">
//         <h1>Mis checadores</h1>
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

export default function MyCheckers() {
  const checkers = [
    { name: "Juan Perez Bosques", email: "juanB@gmail.com", phone: "789124981" },
    { name: "Maria Lopez Perez", email: "MLP@gmail.com", phone: "789122981" },
    { name: "Jose Roman Gutierrez", email: "JoseRoman@gmail.com", phone: "712124942" }
  ];

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <h1>Mis checadores</h1>
        <div className="row">
          {checkers.map((checker, index) => (
            <div key={index} className="col-md-4">
              <div className="card p-3 shadow-sm">
                <h5>{checker.name}</h5>
                <p>{checker.email}</p>
                <p>{checker.phone}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-link">🔄</button>
                  <button className="btn btn-link">✏</button>
                  <button className="btn btn-link">🔘</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
