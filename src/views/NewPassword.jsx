import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';
import backgroundMenu from '../assets/backgroundSecondary.png';
import loginLogo from '../assets/loginLogo.png';
import key from '../assets/icons/llave.png';
import CustomPasswordInput from "../components/CustomPasswordInput";
import BlueButton from "../components/BlueButton";

export default function NewPassword() {
    // Estados independientes para cada campo
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    // Función para manejar cambios en el campo "Nueva Contraseña"
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setPasswordError(""); // Limpiar el error al cambiar el valor
    };

    // Función para manejar cambios en el campo "Confirmar Contraseña"
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError(""); // Limpiar el error al cambiar el valor
    };

    // Función para validar los campos
    const validatePasswords = () => {
        if (!newPassword || !confirmPassword) {
            setPasswordError("Ambos campos son requeridos");
            return false;
        } else if (newPassword !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return false;
        } else if (newPassword.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        return true;
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePasswords()) {
            console.log("Nueva contraseña guardada:", newPassword);
            navigate('/login'); // Redirigir al login después de guardar la contraseña
        }
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundMenu})` }}>
            <div className="row justify-content-center">
                <img className="logo" src={loginLogo} alt="Logo de la aplicación" />
            </div>

            <div className="login-container col-12 col-md-8 col-lg-6">
                <h1 className="login-title">Crear nueva contraseña</h1>
                <form onSubmit={handleSubmit}>
                    {/* Campo para la nueva contraseña */}
                    <div className="row">
                        <CustomPasswordInput
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            label={
                                <>
                                    <img className="icon-md" src={key} alt="Icono" />
                                    <span className="label-text">Nueva Contraseña</span>
                                    <span className="required-asterisk">*</span>
                                </>
                            }
                            id="newPassword"
                            required={false}
                            error={passwordError}
                        />
                    </div>

                    {/* Campo para confirmar la contraseña */}
                    <div className="row">
                        <CustomPasswordInput
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            label={
                                <>
                                    <img className="icon-md" src={key} alt="Icono" />
                                    <span className="label-text">Confirmar Contraseña</span>
                                    <span className="required-asterisk">*</span>
                                </>
                            }
                            id="confirmPassword"
                            required={false}
                            error={passwordError}
                        />
                        
                    </div>

                    {/* Botón para enviar el formulario */}
                    <div className="mb-3">
                        <BlueButton type="submit">Cambiar contraseña</BlueButton>
                    </div>
                </form>
            </div>
        </div>
    );
}