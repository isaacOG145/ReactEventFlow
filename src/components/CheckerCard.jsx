import React from "react";
import EditComponent from "./iconsComponent/EditComponent";
import ChangeStatus from "./iconsComponent/ChangeStatus";

export default function CheckerCard({ checker, onChangeStatus }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <div
        className="card p-3 shadow-sm h-100"
        style={{
          paddingLeft: "16px",
          borderLeft: "10px solid #142ea9",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
        }}
      >
        <h5>{checker.name} {checker.lastName}</h5>
        <p className="mb-1">Correo: {checker.email}</p>
        <p className="mb-3">Teléfono: {checker.phone}</p>
        <div className="d-flex mt-auto">
          <div className="p-3">
            <EditComponent />
          </div>
          <div className="p-3">
            <ChangeStatus
              currentStatus={checker.status}  // El estado del checador
              onChangeStatus={() => onChangeStatus(checker.id)}  // Función para cambiar el estado
            />
          </div>
        </div>
      </div>
    </div>
  );
}
