import React, { useState } from "react";
import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";
import CustomPasswordInput from "../CustomPasswordInput";
import MessageModal from "./MessageModal";

import passwordIcon from '../../assets/icons/llave.png';
import { validatePassword, validateRequired } from "../../utils/validateInputs";

export default function UpdatePassword({ handleClose, onUpdateSuccess }) {
    const [formData, setFormData] = useState({
        password: "",
        repassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        if (type !== 'loading') {
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 2500);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
        setErrors(prev => ({ ...prev, [id]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const { password, repassword } = formData;
        let formErrors = {};

        if (!validateRequired(password)) {
            formErrors.password = "La contraseña es obligatoria";
        } else if (!validatePassword(password)) {
            formErrors.password = "La contraseña debe tener al menos 8 caracteres";
        }

        if (!validateRequired(repassword)) {
            formErrors.repassword = "La confirmación es obligatoria";
        } else if (!validatePassword(repassword)) {
            formErrors.repassword = "La confirmación debe tener al menos 8 caracteres";
        }

        if (password !== repassword) {
            formErrors.repassword = "Las contraseñas deben coincidir";
            showNotification("Las contraseñas deben coincidir", "warning")
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            showNotification("Por favor revisa los datos", "warning");
            setIsLoading(false);
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8080/user/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: userId,
                    password: password
                })
            });

            const updateData = await response.json();

            if (updateData.type === "WARNING") {
                showNotification(updateData.text, "warning");
            } else if (updateData.type === "SUCCESS") {
                showNotification("Contraseña actualizada correctamente", "success");
                setTimeout(() => {
                    onUpdateSuccess();
                    handleClose();
                }, 2500);
            } else {
                showNotification("Hubo un error en la actualización", "error");
            }
        } catch (error) {
            showNotification(error.message || "Error al actualizar la contraseña", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CustomPasswordInput
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    label={
                        <>
                            <img className="icon-md" src={passwordIcon} alt="Icono" />
                            <span className="label-text">Contraseña</span>
                            <span className="required-asterisk">*</span>
                        </>
                    }
                />
                <CustomPasswordInput
                    id="repassword"
                    value={formData.repassword}
                    onChange={handleInputChange}
                    error={errors.repassword}
                    label={
                        <>
                            <img className="icon-md" src={passwordIcon} alt="Icono" />
                            <span className="label-text">Confirmar contraseña</span>
                            <span className="required-asterisk">*</span>
                        </>
                    }
                />

                <div className="mb-3">
                    <BlueButton type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Confirmar'}
                    </BlueButton>
                </div>
                <PurpleButton type="button" onClick={handleClose} disabled={isLoading}>
                    Cancelar
                </PurpleButton>
            </form>

            <MessageModal
                show={notification.show}
                onClose={() => setNotification({ ...notification, show: false })}
                type={notification.type}
                message={notification.message}
            />
        </div>
    );
}
