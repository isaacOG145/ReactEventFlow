import React, { useState, useEffect } from "react";
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
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  // Inicializar valores cuando cambia el prop value
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setHours(h);
      setMinutes(m);
    } else {
      setHours("");
      setMinutes("");
    }
  }, [value]);

  // Generar opciones para los selectores
  const hourOptions = [];
  for (let i = 0; i < 24; i++) {
    hourOptions.push(i.toString().padStart(2, '0'));
  }

  const minuteOptions = [];
  for (let i = 0; i < 60; i += 5) { // Incrementos de 5 minutos
    minuteOptions.push(i.toString().padStart(2, '0'));
  }

  const handleTimeChange = (newHours, newMinutes) => {
    const timeString = `${newHours}:${newMinutes}`;
    
    if (newHours && newMinutes) {
      // Solo llamar a onChange si ambos valores están seleccionados
      const event = {
        target: {
          value: timeString,
          id: id
        }
      };
      onChange(event);
      setLocalError("");
    } else if (required && (!newHours || !newMinutes)) {
      setLocalError("Seleccione una hora completa");
    } else {
      // Para campos no requeridos o cuando se borra la selección
      const event = {
        target: {
          value: "",
          id: id
        }
      };
      onChange(event);
    }
  };

  const handleHourChange = (e) => {
    const newHours = e.target.value;
    setHours(newHours);
    handleTimeChange(newHours, minutes);
  };

  const handleMinuteChange = (e) => {
    const newMinutes = e.target.value;
    setMinutes(newMinutes);
    handleTimeChange(hours, newMinutes);
  };

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={id} className="input-label">
          <span className="label-text">{label}</span>
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <div className="time-selectors">
        <select
          value={hours}
          onChange={handleHourChange}
          id={`${id}-hours`}
          className="select-field"
          required={required}
          style={{ width: '100%' }}
        >
          <option value="">Hora</option>
          {hourOptions.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        
        <span className="time-separator">:</span>
        
        <select
          value={minutes}
          onChange={handleMinuteChange}
          id={`${id}-minutes`}
          className="select-field"
          required={required}
          style={{ width: '100%' }}
        >
          <option value="">Minutos</option>
          {minuteOptions.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
      
      {localError && <span className="error-message">{localError}</span>}
    </div>
  );
}