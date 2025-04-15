import React, { useState } from "react";
import EditComponent from "./iconsComponent/EditComponent";
import ChangeStatus from "./iconsComponent/ChangeStatus";
import ModalComponent from '../components/modals/ModalComponent';
import UpdateChecker from "../components/modals/UpdateChecker";

import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CheckerCard({
  checker,
  onChangeStatus,
  onEdit,
  assignment
}) {

  const [showModal, setShowModal] = useState(false);
  const [checkerToEdit, setCheckerToEdit] = useState("");

  const handleEditClick = (checker) => {
    setCheckerToEdit(checker);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCheckerToEdit(null);
  };


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
            <span className="badge bg-purple text-white">
              Actividad asignada: {assignment}
            </span>
          </p>
        )}

        <div className="d-flex mt-auto justify-content-end">

          <EditComponent onClick={() => handleEditClick(checker)} />


          <ChangeStatus
            currentStatus={checker.status}
            onChangeStatus={() => onChangeStatus(checker.id)}
            aria-label="Cambiar estado"
          />
        </div>
      </div>
      {showModal && (
        <ModalComponent
          show={showModal}
          onClose={handleModalClose}
          title="Actualizar checador">
          <UpdateChecker
            checker={checkerToEdit}
            handleClose={handleModalClose}
            onUpdateSuccess={onEdit} />
        </ModalComponent>
      )}

    </div>
  );
}
