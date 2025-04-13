import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main.css';
import '../../styles/modalStyles.css'

import userIcon from '../../assets/icons/user.png';
import sobre from '../../assets/icons/sobres.png';
import cellphone from '../../assets/icons/telefono-inteligente.png';
import EventDate from '../../assets/icons/calendario-black.png';
import newsPaper from '../../assets/icons/periodico.png';
import gender from '../../assets/icons/generos.png';
import job from '../../assets/icons/trabajo.png';
import place from '../../assets/icons/edificio-de-oficinas.png';
import successImage from '../../assets/icons/success.png';
import alertImage from '../../assets/icons/error.png';

import BirthDateComponent from "../BirthDateComponent";
import InputComponent from "../InputComponent";
import SelectInputComponent from "../SelectInput.Component";
import BlueButton from "../BlueButton";
import MessageModal from "./MessageModal";


export default function CreateUserAcount({ activityId, onRegistrationSuccess }) {

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
        gender: "",
        address: "",
        job: "",
        workPlace: "",
        howFound: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
        gender: "",
        address: "",
        job: "",
        workPlace: "",
        howFound: "",
    });
    // Estado para el modal de notificación
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success" // 'success', 'error', 'warning', 'loading'
    });
    // Función para mostrar notificaciones
    const showNotification = (message, type = "success") => {
        setNotification({
            show: true,
            message,
            type
        });

        // Auto-cerrar solo si no es de tipo loading
        if (type !== 'loading') {
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
        }
    };

    const genderOptions = [
        { value: "masculino", label: "Masculino" },
        { value: "femenino", label: "Femenino" },
    ];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        if (errors[id]) {
            setErrors({
                ...errors,
                [id]: ""
            });
        }
    };

    const handleDateChange = (e) => {
        const isoDate = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            birthday: isoDate
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        const newErrors = {};
        let isValid = true;

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        try {

            const response = await fetch("http://localhost:8080/user/saveUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al guardar el usuario");
            }

            const data = await response.json();

            if (data.type === "SUCCESS") {
                const userId = data.result.id;

                const userActivityDTO = {
                    userId: userId,
                    activityId: activityId, // Obtén el ID de la actividad del prop

                };


                // Enviar la inscripción al evento
                const registerResponse = await fetch('http://localhost:8080/user-activities/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userActivityDTO),
                });

                const registerData = await registerResponse.json(); // Mover esta línea antes de verificar response.ok

                if (registerData.type === "WARNING") {
                    // Si el backend devuelve un mensaje específico en el body (como tu ejemplo de Postman)
                    showNotification(registerData.text, "warning");
                } else {
                    showNotification("Hubo un error en la inscripcion", "error")
                }

                if (registerData.type === "SUCCESS") {
                    showNotification("Incripción completada ahora puedes usar la app móvil", "success");
                    setTimeout(() => {
                        onRegistrationSuccess(); // Cerrar el modal después de 2 segundos
                    }, 3000);
                }


                // Limpiar el formulario
                setFormData({
                    name: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    birthday: "",
                    gender: "",
                    address: "",
                    job: "",
                    workPlace: "",
                    howFound: "",
                    address: ""
                });
            } else {
                throw new Error("Error en el registro");
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
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
                                id="lastName"
                                error={errors.lastName}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-block p-2">
                            <InputComponent
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
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

                    <div className="col-md-6">
                        <div className="form-block p-2">
                            <InputComponent
                                value={formData.phone}
                                onChange={handleInputChange}
                                type="tel"
                                label={
                                    <>
                                        <img src={cellphone} alt="Icono" className="icon-sm" />
                                        <span className="label-text">Teléfono</span>
                                        <span className="required-asterisk">*</span>
                                    </>
                                }
                                id="phone"
                                error={errors.phone}
                                placeholder="+502 12345678"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-block p-2">
                            <BirthDateComponent
                                value={formData.birthday}
                                onChange={handleDateChange}
                                label={
                                    <>
                                        <img className="icon-sm" src={EventDate} alt="" />
                                        <span className="label-text">Fecha de nacimiento</span>
                                        <span className="required-asterisk">*</span>
                                    </>
                                }
                                id="birthday"
                                error={errors.birthday}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-block p-2">
                            <SelectInputComponent
                                value={formData.gender}       // Valor actual del estado (formData.gender)
                                onChange={handleInputChange}  // Manejador de cambios (debe funcionar con selects)
                                options={genderOptions}       // Opciones del select
                                label={
                                    <>
                                        <img src={gender} alt="Icono" className="icon-ssm" />
                                        <span className="label-text">Sexo</span>
                                        <span className="required-asterisk">*</span>
                                    </>
                                }
                                id="gender"
                                required={true}              // Obligatorio
                                error={errors.gender}        // Mensaje de error si existe
                                placeholder="Selecciona tu género"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-block p-3">
                            <InputComponent
                                value={formData.howFound}
                                onChange={handleInputChange}
                                type="text"
                                label={
                                    <>
                                        <img className="icon-sm" src={newsPaper} alt="Icono" />
                                        <span className="label-text">Medio de difusión</span>
                                        <span className="required-asterisk">*</span>
                                    </>
                                }
                                id="howFound"
                                error={errors.howFound}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-block p-3">
                            <InputComponent
                                value={formData.address}
                                onChange={handleInputChange}
                                type="text"
                                label={
                                    <>
                                        <img src={place} alt="Icono" className="icon-sm" />
                                        <span className="label-text">Residencia</span>
                                        <span className="required-asterisk">*</span>
                                    </>
                                }
                                id="address"
                                error={errors.address}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-block p-3">
                            <InputComponent
                                value={formData.job}
                                onChange={handleInputChange}
                                type="text"
                                label={
                                    <>
                                        <img src={job} alt="Icono" className="icon-sm" />
                                        <span className="label-text">Profesión</span>
                                        <span className="required-asterisk">*</span>
                                    </>
                                }
                                id="job"
                                error={errors.job}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-block p-3">
                            <InputComponent
                                value={formData.workPlace}
                                onChange={handleInputChange}
                                type="text"
                                label={
                                    <>
                                        <img src={place} alt="Icono" className="icon-sm" />
                                        <span className="label-text">Lugar de trabajo</span>
                                        <span className="required-asterisk">*</span>
                                    </>
                                }
                                id="workPlace"
                                error={errors.workPlace}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <BlueButton type="submit">
                        Crear cuenta
                    </BlueButton>
                </div>
            </form>
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