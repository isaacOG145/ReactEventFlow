import React from "react";
import EditComponent from "./iconsComponent/EditComponent";
import ChangeStatus from "./iconsComponent/ChangeStatus";

export default function CheckerCard({ 
  checker, 
  onChangeStatus, 
  onEdit,
  assignment 
}) {
  

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <div
        className="card p-3 shadow-sm h-100"
        style={{
          paddingLeft: "16px",
          borderLeft: "10px solid #142ea9",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          opacity: checker.status === "inactive" ? 0.8 : 1
        }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="mb-2">
            {checker.name} {checker.lastName}
            {checker.status === "inactive" && (
              <span className="badge bg-secondary ms-2">Inactivo</span>
            )}
          </h5>
        </div>
        
        <p className="mb-2 text-muted">
          <i className="bi bi-envelope me-2"></i>
          {checker.email || "No especificado"}
        </p>
        
        <p className="mb-3 text-muted">
          <i className="bi bi-telephone me-2"></i>
          {checker.phone || "No especificado"}
        </p>
        
        {assignment && (
          <p className="mb-2">
            <span className="badge bg-info text-dark">
              Actividad asignada: {assignment}
            </span>
          </p>
        )}

        <div className="d-flex mt-auto justify-content-end">
          <button 
            className="btn btn-link p-2 me-2"
            onClick={() => onEdit(checker)}
            aria-label="Editar"
          >
            <EditComponent />
          </button>
          
          <ChangeStatus
            currentStatus={checker.status}
            onChangeStatus={() => onChangeStatus(checker.id)}
            aria-label="Cambiar estado"
          />
        </div>
      </div>
    </div>
  );
}
