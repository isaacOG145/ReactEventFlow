import React from "react";
import '../../styles/iconStyles.css';

import iconEdit from '../../assets/icons/editar.png';

const EditComponent = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            <img className="icon-md" src={iconEdit} alt="Editar" />
        </button>
    );
};

export default EditComponent;
