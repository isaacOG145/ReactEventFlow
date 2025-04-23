import React from "react";
import InputComponent from "../components/InputComponent";
import CustomPasswordInput from "../components/CustomPasswordInput";
import BlueButton from "../components/BlueButton";
import { useState } from "react";
import { Link } from 'react-router-dom';
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


    const registerAdmin = async (formData) => {
        try {

            const response = await fetch('http://localhost:8080/user/saveAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData, // Incluye todos los datos del formulario
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        password: "",
        email: "",
        phone: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        password: "",
        email: "",
        phone: "",
        rePassword: "",
        company: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "El nombre es obligatorio.";
        if (!formData.lastName) newErrors.lastName = "El apellido es obligatorio.";
        if (!formData.email.includes("@")) newErrors.email = "Ingresa un email válido.";
        if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
        if (formData.password !== formData.rePassword) newErrors.rePassword = "Las contraseñas no coinciden.";
        // Validación del teléfono
        if (!formData.phone) {
            newErrors.phone = "El teléfono es obligatorio.";
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = "El teléfono solo puede contener números.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await registerAdmin(formData);
                console.log("Respuesta del servidor:", response);
                alert("Administrador registrado exitosamente");

                // Limpiar el formulario
                setFormData({
                    name: "",
                    lastName: "",
                    password: "",
                    email: "",
                    phone: "",
                    company: ""

                });
            } catch (error) {
                console.error("Error al registrar al administrador:", error);
                alert(error.message);
            }
        } else {
            console.log("Formulario con errores");
        }
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundSecondary})` }}>

            <div className="row justify-content-center mb-3">
                <img className="logo" src={loginLogo} alt="Logo de la aplicación" />
            </div>

            <div className="login-container col-12 col-md-8 col-lg-6">

                <h1 className="login-title">Crear cuenta</h1>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Primera columna */}
                        <div className="col-md-6">
                            <div className="form-block p-3">
                                <InputComponent
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    label={
                                        <>
                                            <img src={userIcon} alt="Icono" className="icon-sm" />
                                            <span className="label-text">Nombres</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="name"
                                    error={errors.name}

                                />

                            </div>
                        </div>

                        {/* Segunda columna */}
                        <div className="col-md-6">
                            <div className="form-block p-3">
                                <InputComponent
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    type="text"
                                    label={
                                        <>
                                            <img src={userIcon} alt="Icono" className="icon-sm" />
                                            <span className="label-text">Apellidos</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    error={errors.lastName}
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
                                    value={formData.email}
                                    onChange={handleInputChange}

                                    type="text"
                                    label={
                                        <>
                                            <img src={sobre} alt="Icono" className="icon-md" />
                                            <span className="label-text">Correo electrónico</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="email"
                                    error={errors.email}

                                />
                            </div>
                        </div>

                        {/* Segunda columna */}
                        <div className="col-md-6">
                            <div className="form-block p-2">
                                <div className="form-block p-2">
                                    <InputComponent
                                        value={formData.phone}
                                        onChange={handleInputChange}

                                        type="text"
                                        label={
                                            <>
                                                <img src={cellphone} alt="Icono" className="icon-sm" />
                                                <span className="label-text">Teléfono</span>
                                                <span className="required-asterisk">*</span>
                                            </>
                                        }
                                        id="phone"
                                        error={errors.phone}
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
                                    value={formData.password}
                                    onChange={handleInputChange}

                                    label={
                                        <>
                                            <img className="icon-md" src={passwordIcon} alt="Icono" />
                                            <span className="label-text">Ingresar contraseña</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="password"
                                    error={errors.password}

                                />
                            </div>
                        </div>

                        {/* Segunda columna */}
                        <div className="col-md-6">
                            <div className="form-block p-2">
                                <CustomPasswordInput
                                    value={formData.rePassword}
                                    onChange={handleInputChange}

                                    label={
                                        <>
                                            <img className="icon-md" src={passwordIcon} alt="Icono" />
                                            <span className="label-text">Confirmar contraseña</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    id="rePassword"
                                    error={errors.rePassword}
                                />

                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <InputComponent
                            value={formData.company}
                            onChange={handleInputChange}
                            label={
                                <>
                                    <img className="icon-md" src={passwordIcon} alt="Icono" />
                                    <span className="label-text">Empresa o razón social</span>
                                    <span className="required-asterisk">*</span>
                                </>
                            }
                            id="company"
                            error={errors.company}
                        />
                    </div>
                    <div className="mb-3">
                        <BlueButton type="submit">Crear cuenta</BlueButton>
                    </div>
                </form>

            </div>

            <Link to="/login" className="pass-message mt-3">¿Ya tienes una cuenta?</Link>

            <Link to="/" className="pass-message mt-3 mb-5">Volver al inicio</Link>



        </div>
    );
}