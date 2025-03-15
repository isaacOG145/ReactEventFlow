import React, { useState } from "react";
import eyeOpen from "../assets/icons/show.png"; // Ícono de ojo abierto
import eyeClosed from "../assets/icons/dontShow.png"; // Ícono de ojo cerrado
import '../styles/main.css'; // Importa los estilos

export default function CustomPasswordInput({
    type = "password", // Por defecto es un campo de contraseña
    value = "",
    onChange = () => {},
    label = "",
    id = "",
    required = false
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
                    type={showPassword ? "text" : type} // Cambia el tipo de input
                    value={value}
                    onChange={onChange}
                    id={id}
                    className="input-field"
                    required={required}
                    style={{ paddingRight: "40px" }} // Espacio para el ícono
                />
                <button
                    type="button" // Evita que el botón envíe el formulario
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
                        src={showPassword ? eyeOpen : eyeClosed} // Cambia el ícono según el estado
                        alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        style={{ width: "24px", height: "24px" }} // Tamaño del ícono
                    />
                </button>
            </div>
        </div>
    );
}