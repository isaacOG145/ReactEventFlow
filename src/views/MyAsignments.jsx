import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import EditComponent from "../components/iconsComponent/EditComponent";
import ChangeStatus from "../components/iconsComponent/ChangeStatus";

export default function MyAsignments() {
    return (
        <div className="app-container">
            <CustomerRootHeader />
            <div className="admin-nav">
                <AdminNav />
            </div>
            <div className="content">

                <h1>Asignaciones de Eventos</h1>


                <div className="table-container mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nombre del checador</th>
                                <th>Nombre del evento</th>
                                <th>Editar asignación</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td className="td-blue">1</td>
                                <td>Nombre del checador</td>
                                <td className="td-blue">Nombre del evento</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <EditComponent />
                                    </div>
                                </td>
                                <td className="actions">


                                    <ChangeStatus />

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>


                <h1>Asignaciones de Talleres</h1>


                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nombre del checador</th>
                                <th>Nombre del Taller</th>
                                <th>Editar asignación</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td className="td-blue">1</td>
                                <td>Nombre del checador</td>
                                <td className="td-blue">Nombre del taller</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <EditComponent />
                                    </div>
                                </td>
                                <td className="actions">


                                    <ChangeStatus />

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
} 