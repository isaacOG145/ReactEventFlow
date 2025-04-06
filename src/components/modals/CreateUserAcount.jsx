import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main.css';
import '../../styles/modalStyles.css'

import userIcon from '../../assets/icons/user.png';
import sobre from '../../assets/icons/sobres.png';
import cellphone from '../../assets/icons/telefono-inteligente.png';
import passwordIcon from '../../assets/icons/llave.png';
import EventDate from '../../assets/icons/calendario-black.png';
import newsPaper from '../../assets/icons/periodico.png';
import gender from '../../assets/icons/generos.png';
import job from '../../assets/icons/trabajo.png';
import place from '../../assets/icons/edificio-de-oficinas.png';
import successImage from '../../assets/icons/success.png';
import alertImage from '../../assets/icons/error.png';

import BirthDateComponent from "../BirthDateComponent";
import InputComponent from "../InputComponent";
import CustomPasswordInput from "../CustomPasswordInput";
import SelectInputComponent from "../SelectInput.Component";
import BlueButton from "../BlueButton";
import MessageModal from "./MessageModal";


export default function CreateUserAcount({ activityId, onRegistrationSuccess }) {

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
        birthday: "",
        gender: "",
        address: "",
        job: "",
        workPlace: "",
        howFound: "",
        address: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
        birthday: "",
        gender: "",
        address: "",
        job: "",
        workPlace: "",
        howFound: "",
        address: ""
    });

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

        if (formData.password !== formData.rePassword) {
            newErrors.rePassword = "Las contraseñas no coinciden";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        try {
            const { rePassword, ...dataToSend } = formData;

            const response = await fetch("http://localhost:8080/user/saveUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error("Error al guardar el usuario");
            }

            const data = await response.json();

            if (data.type === "SUCCESS") {
                const userId = data.result.id; // Obtenemos el ID del usuario
                localStorage.setItem('userId', userId);  // Guardamos el ID en el localStorage

                setNotificationMessage(
                    <div>
                        <img src={successImage} alt="Éxito" style={{ width: '50px', marginRight: '10px' }} />
                        ¡Cuenta creada exitosamente!
                    </div>
                );
                setMessageType('success'); // Tipo de mensaje de éxito
                setShowNotification(true); // Mostrar el modal de éxito

                const userActivityDTO = {
                    userId: localStorage.getItem("userId"),
                    activityId: activityId, // Obtén el ID de la actividad del prop
                    
                };
                console.log("Datos que se están enviando al servidor:", userActivityDTO);


                // Enviar la inscripción al evento
                const registerResponse = await fetch('http://localhost:8080/user-activities/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userActivityDTO),
                });

                if (!registerResponse.ok) {
                    throw new Error('Error al inscribir en la actividad');
                }

                const registerData = await registerResponse.json();

                if (registerData.type === "SUCCESS") {
                    setNotificationMessage(
                        <div>
                            <img src={successImage} alt="Éxito" style={{ width: '50px', marginRight: '10px' }} />
                            ¡Registro exitoso al evento!
                            Ahora puedes usar la aplicación e interactuar con el 
                        </div>
                    );
                    setTimeout(() => {
                        onRegistrationSuccess(); // Cerrar el modal después de 2 segundos
                    }, 3000);
                } else {
                    setNotificationMessage(
                        <div>
                            <img src={alertImage} alt="Alerta" style={{ width: '50px', marginRight: '10px' }} />
                            ¡Error al inscribir en la actividad!
                        </div>
                    );
                }

                setShowNotification(true);



                // Limpiar el formulario
                setFormData({
                    name: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: "",
                    rePassword: "",
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
            setNotificationMessage(
                <div>
                    <img src={alertImage} alt="alert" style={{ width: '50px', marginRight: '10px' }} />
                    ¡Error al crear la cuenta!
                </div>
            );
            setMessageType('error'); // Tipo de mensaje de error
            setShowNotification(true); // Mostrar el modal de error
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

                <div className="row">
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


                <div className="mb-3">
                    <BlueButton type="submit">
                        Crear cuenta
                    </BlueButton>
                </div>
            </form>
            {/* Modal de notificación */}
            <MessageModal
                show={showNotification}
                onClose={() => setShowNotification(false)}
                type={messageType}
                message={notificationMessage}  // Pasa el mensaje como prop correctamente
            />

        </div>


    );


}