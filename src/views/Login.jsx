import React, { useState } from "react";
// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';
// PNGs
import backgroundLogin from '../assets/backgroundLogin.png';
import loginLogo from '../assets/loginLogo.png';
import userIcon from '../assets/icons/user.png';
import PasswordIcon from '../assets/icons/password.png';
// Componentes
import PurpleButton from "../components/PurpleButton";
import BlueButton from "../components/BlueButton";
import InputComponent from "../components/InputComponent";
import CustomPasswordInput from "../components/CustomPasswordInput";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundLogin})` }}>
            <div className="row justify-content-center">
                <img className="logo" src={loginLogo} alt="Logo de la aplicación" />
            </div>

            <div className="login-container col-12 col-md-8 col-lg-6">
                <h1 className="login-title">Iniciar sesión</h1>
                <form>
                    <div className="row">
                        <InputComponent
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            label={
                                <>
                                    <img src={userIcon} alt="Icono" className="icon-sm" />
                                    <span className="label-text">Ingresar usuario</span>
                                    <span className="required-asterisk">*</span>
                                </>
                            }
                            id="email"
                        />
                    </div>
                    <div className="row mb-3">
                        <CustomPasswordInput
                            value={password}
                            onChange={handlePasswordChange}
                            label={
                                <>
                                    <img src={PasswordIcon} alt="Icono" />
                                    <span className="label-text">Ingresar contraseña</span>
                                    <span className="required-asterisk">*</span>
                                </>
                            }
                            id="password"
                        />
                    </div>
                    <div className="mb-3">
                        <BlueButton>Iniciar sesión</BlueButton>
                    </div>
                    <div className="mb-3">
                        <PurpleButton>Crear una cuenta</PurpleButton>
                    </div>
                </form>
            </div>

            <a href="*" className="pass-message">¿Has olvidado la contraseña?</a>
        </div>
    );
}