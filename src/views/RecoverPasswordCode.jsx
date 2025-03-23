import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';
import backgroundMenu from '../assets/backgroundSecondary.png';
import loginLogo from '../assets/loginLogo.png';
import codeIcon from '../assets/icons/sobres.png';
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";

export default function RecoverPasswordCode() {
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");
    const navigate = useNavigate();

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        setCodeError("");
    };

    const validateCode = () => {
        if (!code) {
            setCodeError("El código es requerido");
            return false;
        } else if (code.length !== 6) {
            setCodeError("El código debe tener 6 caracteres");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateCode()) {
            console.log("Código verificado:", code);
            navigate('/new-password'); // Redirigir a la página para crear una nueva contraseña
        }
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundMenu})` }}>
            <div className="row justify-content-center">
                <img className="logo" src={loginLogo} alt="Logo de la aplicación" />
            </div>

            <div className="login-container col-12 col-md-8 col-lg-6">
                <h1 className="login-title">Recuperar <br />contraseña</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <InputComponent
                            type="text"
                            value={code}
                            onChange={handleCodeChange}
                            label={
                                <>
                                    <img src={codeIcon} alt="Icono" className="icon-sm" />
                                    <span className="label-text">Ingresar código </span>
                                    <span className="required-asterisk">*</span>
                                </>
                            }
                            id="code"
                        />
                        {codeError && <span className="error-message">{codeError}</span>}
                    </div>
                    <div className="mb-3">
                        <BlueButton type="submit">Confirmar código</BlueButton>
                    </div>
                </form>
            </div>

            <div className="text-center mt-4">
                <a href="/recover-password">¿No recibiste el código?</a>
            </div>
        </div>
    );
}