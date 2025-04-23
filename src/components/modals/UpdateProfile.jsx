import React, { useEffect, useState } from "react";
import InputComponent from "../InputComponent";
import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";
import cellphone from '../../assets/icons/telefono-inteligente.png';
import MessageModal from "./MessageModal";
import { validatePhone, validateRequired } from "../../utils/validateInputs";

export default function UpdateProfile({ profileData, handleClose, onUpdateSuccess }) {
    const [cellPhone, setCellPhone] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const showNotification = (message, type = "success") => {
        setNotification({
            show: true,
            message,
            type
        });

        if (type !== 'loading') {
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 2500);
        }
    };

    useEffect(() => {
        if (profileData) {
            setCellPhone(profileData.phone || "");
        }
    }, [profileData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Validación
        if (!validateRequired(cellPhone)) {
            setError("El teléfono es obligatorio");
            setIsLoading(false);
            showNotification("El teléfono es obligatorio", "error");
            return;
        } else if (!validatePhone(cellPhone)) {
            setError("Ingresa un teléfono válido (10 dígitos)");
            setIsLoading(false);
            showNotification("Ingresa un teléfono válido (10 dígitos)", "error");
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/user/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: userId,
                    phone: cellPhone,
                    name: profileData?.name,
                    lastName: profileData?.lastName,
                    email: profileData?.email,
                    company: profileData?.company
                })
            });

            const updateData = await response.json();

            if (updateData.type === "WARNING") {
                showNotification(updateData.text, "warning")
            }else {
                showNotification("Hubo un error en la inscripcion", "error")
            }

            if (updateData.type === "SUCCESS") {
                showNotification("Teléfono actualizado correctamente", "success");
                setTimeout(() => {
                    onUpdateSuccess();
                    handleClose();
                }, 2500);
            }


        } catch (error) {
            setError(error.message || "Ocurrió un error al actualizar los datos");
            showNotification(error.message || "Error al actualizar el teléfono", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (e) => {
        setCellPhone(e.target.value);
        if (error) setError(null); // Limpiar error al editar
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputComponent
                    type="text"
                    label={
                        <>
                            <img className="icon-sm" src={cellphone} alt="Icono de teléfono" />
                            <span className="label-text">Teléfono </span>
                            <span className="required-asterisk">*</span>
                        </>
                    }
                    value={cellPhone}
                    onChange={handlePhoneChange}
                    error={error}
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