import React, { useState } from "react";
import eyeOpen from "../assets/icons/show.png"; 
import eyeClosed from "../assets/icons/dontShow.png"; 
import '../styles/main.css'; 

export default function CustomPasswordInput({
    type = "password", 
    value = "",
    onChange = () => {},
    label = "",
    id = "",
    required = false,
    error = "" 
}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-container">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}
            <div style={{ position: "relative", width: "100%" }}>
                <input
                    type={showPassword ? "text" : type} 
                    value={value}
                    onChange={onChange}
                    id={id}
                    className="input-field"
                    required={required}
                    style={{ paddingRight: "40px" }} 
                />
                <button
                    type="button" 
                    onClick={togglePasswordVisibility}
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                    }}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    <img
                        src={showPassword ? eyeOpen : eyeClosed} 
                        alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        style={{ width: "24px", height: "24px" }} 
                    />
                </button>
            </div>
        
            {error && <span className="error-message">{error}</span>}
        </div>
    );
}