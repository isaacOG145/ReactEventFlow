import React from "react";
import InputComponent from "../components/InputComponent";
import CustomPasswordInput from "../components/CustomPasswordInput";
import BlueButton from "../components/BlueButton";
// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';

//png
import backgroundSecondary from '../assets/backgroundSecondary.png';
import loginLogo from '../assets/loginLogo.png';
import userIcon from '../assets/icons/user.png';
import sobre from '../assets/icons/sobres.png';
import cellphone from '../assets/icons/telefono-inteligente.png';
import passwordIcon from '../assets/icons/llave.png';

export default function CreateAccount() {

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundSecondary})` }}>

            <div className="row justify-content-center mb-3">
                <img className="logo" src={loginLogo} alt="Logo de la aplicación" />
            </div>

            <div className="login-container col-12 col-md-8 col-lg-6">

                <h1 className="login-title">Crear cuenta</h1>

                <form>
                    <div className="row">
                        {/* Primera columna */}
                        <div className="col-md-6">
                            <div className="form-block p-3">
                                <InputComponent

                                    type="text"
                                    label={
                                        <>
                                            <img src={userIcon} alt="Icono" className="icon-sm" />
                                            <span className="label-text">Nombres</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="name"

                                />

                            </div>
                        </div>

                        {/* Segunda columna */}
                        <div className="col-md-6">
                            <div className="form-block p-3">
                                <InputComponent

                                    type="text"
                                    label={
                                        <>
                                            <img src={userIcon} alt="Icono" className="icon-sm" />
                                            <span className="label-text">Apellidos</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="lastName"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Primera columna */}
                        <div className="col-md-6">
                            <div className="form-block p-2">
                                <InputComponent

                                    type="text"
                                    label={
                                        <>
                                            <img src={sobre} alt="Icono" className="icon-md" />
                                            <span className="label-text">Correo electrónico</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="email"

                                />
                            </div>
                        </div>

                        {/* Segunda columna */}
                        <div className="col-md-6">
                            <div className="form-block p-2">
                                <div className="form-block p-2">
                                    <InputComponent

                                        type="text"
                                        label={
                                            <>
                                                <img src={cellphone} alt="Icono" className="icon-sm" />
                                                <span className="label-text">Teléfono</span>
                                                <span className="required-asterisk">*</span>
                                            </>
                                        }
                                        id="phone"

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Primera columna */}
                        <div className="col-md-6">
                            <div className="form-block p-2">
                                <CustomPasswordInput

                                    label={
                                        <>
                                            <img className="icon-md" src={passwordIcon} alt="Icono" />
                                            <span className="label-text">Ingresar contraseña</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="password"

                                />
                            </div>
                        </div>

                        {/* Segunda columna */}
                        <div className="col-md-6">
                            <div className="form-block p-2">
                                <CustomPasswordInput

                                    label={
                                        <>
                                            <img className="icon-md" src={passwordIcon} alt="Icono" />
                                            <span className="label-text">Confirmar contraseña</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="rePassword"

                                />

                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <InputComponent
                            label={
                                <>
                                    <img className="icon-md" src={passwordIcon} alt="Icono" />
                                    <span className="label-text">Empresa o razón social</span>
                                    <span className="required-asterisk">*</span>
                                </>
                            }
                            id="company"
                        />
                    </div>
                    <div className="mb-3">
                        <BlueButton type="submit">Crear cuenta</BlueButton>
                    </div>
                </form>


            </div>

            <a className="pass-message mb-5">Volver al inicio</a>



        </div>
    );
}