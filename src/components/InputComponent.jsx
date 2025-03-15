import React from "react";
import '../styles/main.css';

export default function InputComponent({ 
    type = "text", 
    value = "", 
    onChange = () => {}, 
    label = "", 
    id = "", 
    required = false 
}) {
    return (
        <div className="input-container">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                id={id}
                className="input-field"
                required={required}
            />
        </div>
    );
}