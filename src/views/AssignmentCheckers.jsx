import React from "react";

import '../styles/main.css';
import '../styles/iconStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import SelectInputComponent from "../components/SelectInput.Component";
import BlueButton from "../components/BlueButton";

export default function AssignmentChecker() {


    return (
        <div className="app-container">
            <CustomerRootHeader />
            <div className="admin-nav">
                <AdminNav />
            </div>
            <div className="content">
                <div className="form-asign">
                    <h1 className="mb-4">Asignacion de checadores</h1>

                    <SelectInputComponent
                        label={
                            <>
                                <span className="label-text">Actividad</span>
                                <span className="required-asterisk">*</span>
                            </>
                        }
                    />

                    <SelectInputComponent
                        label={
                            <>
                                <span className="label-text">Checador</span>
                                <span className="required-asterisk">*</span>
                            </>
                        }
                    />

                    <BlueButton>Asignar checador </BlueButton>
                </div>

            </div>
        </div>

    );
} 