// components/CheckerCard.js
import React from "react";
import EditComponent from "./iconsComponent/EditComponent";
import ChangeStatus from "./iconsComponent/ChangeStatus";

export default function CheckerCard({ checker }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card p-3 shadow-sm h-100"
        style={{
          paddingLeft: "16px",
          borderLeft: "5px solid #142ea9",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
        }}
      >
        <h5>{checker.name} {checker.lastName}</h5>
        <p className="mb-1">Correo: {checker.email}</p>
        <p className="mb-3">Teléfono: {checker.phone}</p>
        <p className="mb-1">Estado: {checker.status ? 'Activo' : 'Inactivo'}</p>
        <div className="d-flex mt-auto">
          <div className="p-3">
            <EditComponent />
          </div>
          <div className="p-3">
            <ChangeStatus status={checker.status} />
          </div>
        </div>
      </div>
    </div>
  );
}