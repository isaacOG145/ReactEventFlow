import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import backgroundLogin from '../assets/backgroundLogin.png'
import loginLogo from '../assets/loginLogo.png'
import PurpleButton from "../components/PurpleButton";

function Login() {
    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundLogin})` }}>

            <div className="row">
                <img className="logo" src={loginLogo} alt="" />
            </div>
            
                <div className="login-container col-6 row">
                    <h1>EventFlow</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Ingresar usuario*</label>
                            <input type="text" className="form-control" id="username" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Ingresar contraseña*</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>
                        <PurpleButton>Iniciar sesión</PurpleButton>
                    </form>
                    <p>¿Has olvidado tu contraseña?</p>
                    <p>Crear una cuenta</p>
                </div>
            

        </div>
    );
}

export default Login;