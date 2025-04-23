import React from "react";
import '../styles/main.css'; // Asegúrate de que los estilos sean compatibles

export default function SelectInputComponent({
    options = [],          
    value = "",            
    onChange = () => {},   
    label = "",             
    id = "",                
    required = false,       
    error = "",            
    placeholder = "Selecciona una opción" 
}) {
    return (
        <div className="input-container">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}
            
            <select
                value={value}
                onChange={onChange}
                id={id}
                className="input-field" // Reutiliza la clase de tu input (o añade una nueva)
                required={required}
            >
                {/* Opción por defecto (placeholder) */}
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                
                {/* Mapeo de opciones */}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            
            {error && <span className="error-message">{error}</span>}
        </div>
    );
}