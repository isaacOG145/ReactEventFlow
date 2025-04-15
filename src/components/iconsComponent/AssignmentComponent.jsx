import React from "react";

import '../../styles/iconStyles.css';
import AssignmentIcon from '../../assets/icons/asignacion.png';

const AssignmentComponent = ({ onClick }) =>  {

    return (
        <button
            onClick={onClick}
            className="edit-button" // Añadimos clase para estilos
            title="Asignar checador"
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
            }}
        >
            <img className="icon-sm" src={AssignmentIcon} alt="Editar" />
        </button>
    );

}

export default AssignmentComponent;