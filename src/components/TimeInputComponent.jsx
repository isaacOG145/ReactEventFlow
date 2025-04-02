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
  const [localError, setLocalError] = useState(error);

  const isValidTime = (timeString) => {
    // Validación simple de formato de hora HH:MM
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (newValue && !isValidTime(newValue)) {
      setLocalError("Hora inválida");
    } else {
      setLocalError("");
    }

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
        onChange={handleChange}
        id={id}
        className="input-field"
        required={required}
        step="300" // Incrementos de 5 minutos
      />
      
      {localError && <span className="error-message">{localError}</span>}
    </div>
  );
}