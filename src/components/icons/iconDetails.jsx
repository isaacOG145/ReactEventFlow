import React from 'react';
import iconDetails from '../../assets/icons/mas-detalles.png';

const IconDetails = ({ onClick }) => {
  return (
    <button className="btn-icon" onClick={onClick}>
      <img className="icon-md" src={iconDetails} alt="Detalles" />
    </button>
  );
};

export default IconDetails;