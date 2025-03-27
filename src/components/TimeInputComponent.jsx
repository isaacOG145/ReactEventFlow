import React, { useState } from "react";
import '../styles/main.css';

export default function TimeInputComponent({
  value = "",
  onChange = () => {},
  label = "",
  id = "",
  required = false,
  error = "",
}) {
  const [localError, setLocalError] = useState(error); // Estado para gestionar los errores localmente

  // Función para verificar si la hora es válida (formato correcto)
  const isValidTime = (timeString) => {
    const time = timeString.split(":");
    if (time.length !== 2) return false;
    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Verificamos si la hora es válida
    if (newValue && !isValidTime(newValue)) {
      setLocalError("Hora inválida");
    } else {
      setLocalError(""); // Si la hora es válida, eliminamos el error
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
        type="time"
        value={value}
        onChange={handleChange} // Llamamos a la nueva función handleChange
        id={id}
        className="input-field"
        required={required}
        max="23:59" // Limita la hora a no superar las 23:59
      />
      
      {/* Mostramos el error si existe */}
      {localError && <span className="error-message">{localError}</span>}
    </div>
  );
}
