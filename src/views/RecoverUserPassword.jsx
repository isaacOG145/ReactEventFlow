import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';
import backgroundMenu from '../assets/backgroundSecondary.png';
import loginLogo from '../assets/loginLogo.png';
import userIcon from '../assets/icons/user.png';
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";

export default function RecoverUserPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const validateEmail = () => {
        if (!email) {
            setEmailError("El correo electrónico es requerido");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("El correo electrónico no es válido");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail()) {
            console.log("Correo enviado a:", email);
            navigate('/recover-password-code');
        }
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundMenu})` }}>
            <div className="row justify-content-center">
                <img className="logo" src={loginLogo} alt="Logo de la aplicación" />
            </div>


            <div className="login-container col-12 col-md-8 col-lg-6">
                <h1 className="login-title">Recuperar <br/>contraseña</h1>
                <form onSubmit={handleSubmit}>
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
                        {emailError && <span className="error-message">{emailError}</span>}
                    </div>
                    <div className="mb-3">
                        <BlueButton type="submit">Enviar código</BlueButton>
                    </div>
                </form>
            </div>


          
            <Link to="/login" className="pass-message ">¿Ya tienes una cuenta?</Link>

                
            
        </div>
    );
}