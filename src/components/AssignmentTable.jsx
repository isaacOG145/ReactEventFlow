import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/tableStyles.css"

import ChangeStatus from "./iconsComponent/ChangeStatus";
import EditComponent from "./iconsComponent/EditComponent";

export default function AssignmentTable({ title, assignments }) {

    return (
        <div className="table-container mb-5">

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
                                    <EditComponent />
                                </div>
                            </td>
                            <td className="actions">
                                <ChangeStatus />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
