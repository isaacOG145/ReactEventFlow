import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

// PNG
import purpleLogo from '../assets/purpleLogo.png';

import ProfileModal from "./ProfileModal";

export default function CustomerRootHeader() {
    return (
        <div className="root-header">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    {/* Columna para el logo */}
                    <div className="col">
                        <img src={purpleLogo} alt="logo" className="logo" />
                    </div>

                    {/* Columna para el ProfileModal (alineada a la derecha) */}
                    <div className="col-auto ml-auto">
                        <ProfileModal />
                    </div>
                </div>
            </div>
        </div>
    );
}
 