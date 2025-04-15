import React, { useState } from "react";
import '../../styles/iconStyles.css';
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cellphone from '../../assets/icons/telefono-inteligente.png';
import sobre from '../../assets/icons/sobres.png';
import userIcon from '../../assets/icons/usuario.png';

import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";
import InputComponent from '../InputComponent';
import MessageModal from "./MessageModal";

import {
    validateEmail,
    validatePhone,
    validateMaxLength,
    validateRequired
} from "../../utils/validateInputs";

export default function UpdateChecker({ checker, handleClose, onUpdateSuccess }) {
    const [formData, setFormData] = useState({
        name: checker?.name || "",
        lastName: checker?.lastName || "",
        email: checker?.email || "",
        phone: checker?.phone || ""
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: null }));
    };

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        if (type !== "loading") {
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 2500);
        }
    };

    const validateFields = () => {
        let valid = true;
        let newErrors = {};

        if (!validateRequired(formData.name)) {
            newErrors.name = "El nombre es obligatorio";
            valid = false;
        } else if (!validateMaxLength(formData.name, 100)) {
            newErrors.name = "Máximo 100 caracteres";
            valid = false;
        }

        if (!validateRequired(formData.lastName)) {
            newErrors.lastName = "El apellido es obligatorio";
            valid = false;
        } else if (!validateMaxLength(formData.lastName, 100)) {
            newErrors.lastName = "Máximo 100 caracteres";
            valid = false;
        }

        if (!validateRequired(formData.email)) {
            newErrors.email = "El correo es obligatorio";
            valid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Correo inválido";
            valid = false;
        }

        if (!validateRequired(formData.phone)) {
            newErrors.phone = "El teléfono es obligatorio";
            valid = false;
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Teléfono inválido (10 dígitos)";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!validateFields()) {
            setIsLoading(false);
            showNotification("Por favor corrige los errores", "error");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const payload = { id: checker?.id };

            if (formData.name !== checker?.name) payload.name = formData.name;
            if (formData.lastName !== checker?.lastName) payload.lastName = formData.lastName;
            if (formData.email !== checker?.email) payload.email = formData.email;
            if (formData.phone !== checker?.phone) payload.phone = formData.phone;

            if (Object.keys(payload).length === 1) {
                showNotification("No se detectaron cambios para actualizar.", "warning");
                setIsLoading(false);
                return;
            }

            const response = await fetch(`http://localhost:8080/user/updateChecker`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const updateData = await response.json();

            if (updateData.type === "WARNING") {
                showNotification(updateData.text, "warning");
            } else if (updateData.type === "SUCCESS") {
                showNotification("Checador actualizado correctamente", "success");
                setTimeout(() => {
                    
                    handleClose();
                }, 2500);
            } else {
                showNotification("Hubo un error en la actualización", "error");
            }

        } catch (error) {
            setError(error.message || "Ocurrió un error al actualizar los datos");
            showNotification(error.message || "Error al actualizar", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form>
                <InputComponent
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    label={<><img src={userIcon} alt="Icono" className="icon-sm" />Nombres<span className="required-asterisk">*</span></>}
                    id="name"
                    error={errors.name}
                />
                <InputComponent
                    value={formData.lastName}
                    onChange={handleInputChange}
                    type="text"
                    label={<><img src={userIcon} alt="Icono" className="icon-sm" />Apellidos<span className="required-asterisk">*</span></>}
                    id="lastName"
                    error={errors.lastName}
                />
                <InputComponent
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    label={<><img src={sobre} alt="Icono" className="icon-sm" />Correo electrónico<span className="required-asterisk">*</span></>}
                    id="email"
                    error={errors.email}
                />
                <InputComponent
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    label={<><img src={cellphone} alt="Icono" className="icon-sm" />Teléfono<span className="required-asterisk">*</span></>}
                    id="phone"
                    error={errors.phone}
                />

                <div className="mb-3">
                    <BlueButton onClick={handleUpdate} disabled={isLoading}>
                        Confirmar
                    </BlueButton>
                </div>
                <PurpleButton onClick={handleClose} disabled={isLoading}>
                    Cancelar
                </PurpleButton>
            </form>

            {notification.show && (
                <MessageModal
                    show={notification.show}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(prev => ({ ...prev, show: false }))}
                />
            )}
        </div>
    );
}
