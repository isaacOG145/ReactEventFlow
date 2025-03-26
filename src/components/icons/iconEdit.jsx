import React from "react";
import editIcon from "../../assets/icons/editar.png";

const IconEdit = ({ onClick }) => {
  return (
    <button className="btn-icon" onClick={onClick}>
      <img className="icon-md" src={editIcon} alt="Editar" />
    </button>
  );
};

export default IconEdit;
