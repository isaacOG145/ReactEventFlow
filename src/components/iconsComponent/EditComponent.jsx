import React from "react";
import '../../styles/iconStyles.css';
import iconEdit from '../../assets/icons/editar.png';

const EditComponent = ({ onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="edit-button" // Añadimos clase para estilos
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
            }}
        >
            <img className="icon-sm" src={iconEdit} alt="Editar" />
        </button>
    );
};

export default EditComponent;