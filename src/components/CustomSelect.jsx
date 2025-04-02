import React from "react";
import "../styles/main.css"; // Asegúrate de que los estilos están en este archivo

const CustomSelect = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="custom-select">
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
