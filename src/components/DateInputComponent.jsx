import React, { useState } from "react";
import { format, parseISO, isValid } from 'date-fns';
import '../styles/main.css';

export default function DateInputComponent({
  value = "",
  onChange = () => {},
  label = "",
  id = "",
  required = false,
  error = "",
}) {
  const [localError, setLocalError] = useState(error);

  // Función para convertir a fecha local sin cambiar el día
  const toLocalDateString = (dateValue) => {
    if (!dateValue) return "";
    
    try {
      let date;
      
      // Si es una cadena ISO (desde el backend)
      if (typeof dateValue === 'string' && dateValue.includes('T')) {
        date = new Date(dateValue);
      } 
      // Si ya está en formato YYYY-MM-DD
      else if (typeof dateValue === 'string') {
        date = new Date(dateValue + 'T12:00:00'); // Mediodía para evitar problemas de zona horaria
      }
      // Si es un objeto Date
      else if (dateValue instanceof Date) {
        date = new Date(dateValue);
      } else {
        return "";
      }

      if (!isValid(date)) return "";
      
      // Ajustar a la zona horaria local sin cambiar el día
      const offset = date.getTimezoneOffset() * 60000;
      const localDate = new Date(date.getTime() - offset);
      
      return localDate.toISOString().split('T')[0];
    } catch (e) {
      console.error('Error formateando fecha:', e);
      return "";
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (newValue && !isValid(new Date(newValue))) {
      setLocalError("Fecha inválida");
    } else {
      setLocalError("");
    }

    // Crear fecha en UTC para evitar problemas
    const utcDate = new Date(newValue + 'T00:00:00Z');
    
    onChange({
      target: {
        value: utcDate.toISOString() // Enviamos la fecha en formato ISO
      }
    });
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
        min={toLocalDateString(new Date())} // Fecha mínima = hoy
        max="2050-12-31"
      />
      
      {(localError || error) && (
        <span className="error-message">{localError || error}</span>
      )}
    </div>
  );
}