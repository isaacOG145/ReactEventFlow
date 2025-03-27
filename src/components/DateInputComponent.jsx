import React, { useState } from "react";
import '../styles/main.css';

export default function DateInputComponent({
  value = "",
  onChange = () => {},
  label = "",
  id = "",
  required = false,
  error = "",
}) {
  const [localError, setLocalError] = useState(error); // Estado para gestionar los errores localmente

  // Función para verificar si la fecha es válida
  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Verificamos si la fecha es válida
    if (newValue && !isValidDate(newValue)) {
      setLocalError("Fecha inválida");
    } else {
      setLocalError(""); // Si la fecha es válida, eliminamos el error
    }

    // Llamamos a onChange con el valor nuevo
    onChange(e);
  };

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={handleChange} // Llamamos a la nueva función handleChange
        id={id}
        className="input-field"
        required={required}
        max="2050-12-31" // Limita la fecha a no superar el 31 de diciembre de 2050
      />
      
      {/* Mostramos el error si existe */}
      {localError && <span className="error-message">{localError}</span>}
    </div>
  );
}
