import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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

const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json();
        return data; // Retorna los datos del servidor (por ejemplo, un token)
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    };

    const validateForm = () => {
        let isValid = true;

        if (!email) {
            setEmailError("El correo electrónico es requerido");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("El correo electrónico no es válido");
            isValid = false;
        }

        if (!password) {
            setPasswordError("La contraseña es requerida");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const userData = await loginUser(email, password);
                console.log('Autenticación exitosa:', userData);

                // Guardar el token en localStorage
                localStorage.setItem('token', userData.jwt);
                localStorage.setItem('userId', userData.userId);
                localStorage.setItem('role', userData.role);

                if(userData.role != 'ADMIN' || userData.role != "SUPER_ADMIN"){
                    navigate('/');
                }
                navigate('/dashboard/mis-talleres');

            } catch (error) {
                console.error('Error en la autenticación:', error);
                setPasswordError('Correo electrónico o contraseña incorrectos');
            }
        } else {
            console.log("Formulario con errores");
        }
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundLogin})` }}>
            <div className="row justify-content-center">
                <img className="logo" src={loginLogo} alt="Logo de la aplicación" />
            </div>

            <div className="login-container col-12 col-md-8 col-lg-6">
                <h1 className="login-title">Iniciar sesión</h1>
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
                        {passwordError && <span className="error-message">{passwordError}</span>}
                    </div>
                    <div className="mb-3">
                        <BlueButton type="submit">Iniciar sesión</BlueButton>
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