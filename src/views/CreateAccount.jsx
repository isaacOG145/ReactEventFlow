import React, { useState } from "react";
import InputComponent from "../components/InputComponent";
import CustomPasswordInput from "../components/CustomPasswordInput";
import BlueButton from "../components/BlueButton";
import MessageModal from "../components/modals/MessageModal";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';

import backgroundSecondary from '../assets/backgroundSecondary.png';
import loginLogo from '../assets/loginLogo.png';
import userIcon from '../assets/icons/user.png';
import sobre from '../assets/icons/sobres.png';
import cellphone from '../assets/icons/telefono-inteligente.png';
import passwordIcon from '../assets/icons/llave.png';

export default function CreateAccount() {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        password: "",
        email: "",
        phone: "",
        company: ""
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        if (type !== "loading") {
            setTimeout(() => setNotification({ ...notification, show: false }), 3000);
        }
    };

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
        if (!formData.phone) newErrors.phone = "El teléfono es obligatorio.";
        else if (!/^\d+$/.test(formData.phone)) newErrors.phone = "El teléfono solo puede contener números.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const registerAdmin = async (formData) => {
        try {
            showNotification("Creando cuenta...", "loading");
            const response = await fetch('http://localhost:8080/user/saveAdmin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }

            const data = await response.json();
            showNotification("Cuenta creada exitosamente", "success");
            return data;
        } catch (error) {
            console.error("Error:", error);
            showNotification(error.message || "Hubo un error al crear la cuenta", "error");
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await registerAdmin(formData);
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
            }
        } else {
            showNotification("Por favor, completa todos los campos correctamente.", "warning");
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
                    {/* Formulario */}
                    <div className="row">
                        <div className="col-md-6">
                            <InputComponent
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text"
                                label="Nombres"
                                id="name"
                                error={errors.name}
                            />
                        </div>
                        <div className="col-md-6">
                            <InputComponent
                                value={formData.lastName}
                                onChange={handleInputChange}
                                type="text"
                                label="Apellidos"
                                id="lastName"
                                error={errors.lastName}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <InputComponent
                                value={formData.email}
                                onChange={handleInputChange}
                                type="text"
                                label="Correo electrónico"
                                id="email"
                                error={errors.email}
                            />
                        </div>
                        <div className="col-md-6">
                            <InputComponent
                                value={formData.phone}
                                onChange={handleInputChange}
                                type="text"
                                label="Teléfono"
                                id="phone"
                                error={errors.phone}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CustomPasswordInput
                                value={formData.password}
                                onChange={handleInputChange}
                                label="Ingresar contraseña"
                                id="password"
                                error={errors.password}
                            />
                        </div>
                        <div className="col-md-6">
                            <CustomPasswordInput
                                value={formData.rePassword}
                                onChange={handleInputChange}
                                label="Confirmar contraseña"
                                id="rePassword"
                                error={errors.rePassword}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <InputComponent
                            value={formData.company}
                            onChange={handleInputChange}
                            label="Empresa o razón social"
                            id="company"
                            error={errors.company}
                        />
                    </div>
                    <div className="mb-3">
                        <BlueButton type="submit">Crear cuenta</BlueButton>
                    </div>
                </form>
            </div>

            {/* Modal de notificación */}
            <MessageModal
                show={notification.show}
                onClose={() => setNotification({ ...notification, show: false })}
                type={notification.type}
                message={notification.message}
            />
        </div>
    );
}