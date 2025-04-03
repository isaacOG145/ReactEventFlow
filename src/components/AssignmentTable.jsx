import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/tableStyles.css";

import ChangeStatus from "./iconsComponent/ChangeStatus";
import EditComponent from "./iconsComponent/EditComponent";
import UpdateAssignmentModal from "./modals/UpdateAssignmentModal";

export default function AssignmentTable({ title, assignments, onChangeStatus, onUpdate }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

    const handleEditClick = (assignment) => {
        setSelectedAssignmentId(assignment.id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedAssignmentId(null);
    };

    return (
        <div className="table-container mb-5">
            {assignments.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nombre del checador</th>
                                <th>Nombre del {title.toLowerCase()}</th>
                                <th>
                                    <div className="d-flex justify-content-center">
                                        Editar asignación
                                    </div>
                                </th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => (
                                <tr key={assignment.id}>
                                    <td className="td-blue">{index + 1}</td>
                                    <td>{assignment.checkerName}</td>
                                    <td className="td-blue">{assignment.activityName}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <EditComponent onClick={() => handleEditClick(assignment)} />
                                        </div>
                                    </td>
                                    <td className="actions">
                                        <ChangeStatus
                                            currentStatus={assignment.status}
                                            onChangeStatus={() => onChangeStatus(assignment.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showModal && (
                        <UpdateAssignmentModal
                            showModal={showModal}
                            setShowModal={handleModalClose}
                            assignmentId={selectedAssignmentId}
                            onUpdate={(updatedData) => {
                                onUpdate(updatedData);
                                handleModalClose();
                            }}
                        />
                    )}
                </>
            ) : (
                <div className="card no-data-card">
                    <div className="card-body text-center">
                        <h5 className="card-title">No hay asignaciones disponibles</h5>
                        <p className="card-text">No se encontraron {title.toLowerCase()}s asignados en este momento.</p>
                    </div>
                </div>
            )}
        </div>
    );
}