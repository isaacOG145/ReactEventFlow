import React, { useState } from "react";
import { format, isValid } from 'date-fns';
import '../styles/main.css';

export default function BirthDateComponent({
  value = "",
  onChange = () => {},
  label = "",
  id = "",
  required = false,
  error = "",
}) {
  const [localError, setLocalError] = useState("");

  // Convertir la fecha a formato 'YYYY-MM-DD' sin manipularla
  const toLocalDateString = (dateValue) => {
    if (!dateValue) return "";
    // Solo devolver la fecha en formato 'YYYY-MM-DD'
    return dateValue; // Extraer solo la parte de la fecha (YYYY-MM-DD)
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (!newValue) {
      onChange({ target: { value: "" } });
      setLocalError("");
      return;
    }

    // Validar si la fecha seleccionada no es anterior a hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(newValue);  // No convertimos ni ajustamos la zona horaria

    if (selectedDate > today) {
      setLocalError("La fecha no puede ser superior a hoy");
      return;
    }

    // Enviar la fecha tal cual al backend (sin conversión adicional)
    setLocalError("");
    onChange({ target: { value: newValue } }); // Enviamos la fecha como está
  };

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <input
        type="date"
        value={toLocalDateString(value)}  // Solo pasamos la fecha en formato 'YYYY-MM-DD'
        onChange={handleChange}
        id={id}
        className={`input-field ${localError || error ? 'input-error' : ''}`}
        required={required}
        min="1910-01-01"
        max={format(new Date(), 'yyyy-MM-dd')}
      />
      
      {(localError || error) && (
        <span className="error-message">{localError || error}</span>
      )}
    </div>
  );
}
