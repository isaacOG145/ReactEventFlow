import React, { useState } from "react";
import { format, parseISO, isValid, addHours } from 'date-fns';
import '../styles/main.css';

export default function DateInputComponent({
  value = "",
  onChange = () => {},
  label = "",
  id = "",
  required = false,
  error = "",
}) {
  const [localError, setLocalError] = useState("");

  // Ajuste específico para GMT-6 (UTC-6)
  const adjustForGMT6 = (date) => {
    if (!date) return null;
    try {
      const d = typeof date === 'string' ? parseISO(date) : new Date(date);
      return addHours(d, 6); // Añadimos 6 horas para compensar GMT-6
    } catch {
      return null;
    }
  };

  const toLocalDateString = (dateValue) => {
    const date = adjustForGMT6(dateValue);
    return date && isValid(date) ? format(date, 'yyyy-MM-dd') : "";
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (!newValue) {
      onChange({ target: { value: "" } });
      setLocalError("");
      return;
    }

    // Crear fecha en GMT-6 (restamos 6 horas para convertir a UTC)
    const localDate = new Date(newValue);
    const utcDate = new Date(localDate.getTime() - (6 * 60 * 60 * 1000));
    
    if (!isValid(utcDate)) {
      setLocalError("Fecha inválida");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (utcDate < today) {
      setLocalError("La fecha no puede ser anterior a hoy");
      return;
    }

    setLocalError("");
    onChange({ target: { value: utcDate.toISOString() } });
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
        value={toLocalDateString(value)}
        onChange={handleChange}
        id={id}
        className={`input-field ${localError || error ? 'input-error' : ''}`}
        required={required}
        min={format(new Date(), 'yyyy-MM-dd')}
        max="2050-12-31"
      />
      
      {(localError || error) && (
        <span className="error-message">{localError || error}</span>
      )}
    </div>
  );
}