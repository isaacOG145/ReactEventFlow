import React, { useState, useEffect } from "react";
import InputComponent from "../InputComponent";
import ImageGalleryUpload from "../ImagesGalleryUpload";
import DateInputComponent from "../DateInputComponent";
import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";

import Event from '../../assets/icons/event-name.png';
import EventDate from '../../assets/icons/event-date.png';
import DetailsImg from '../../assets/icons/details.png';

import "../../styles/modalStyles.css";

const UpdateEventModal = ({ showModal, eventData, handleClose, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        images: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Inicializar los datos del formulario
    useEffect(() => {
        if (eventData && showModal) {
            setFormData({
                name: eventData.name,
                description: eventData.description,
                date: eventData.date,
                images: eventData.imageUrls.map(url => ({ url })) // Convertir URLs a objetos de imagen
            });
        }
    }, [eventData, showModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.name || !formData.date || !formData.description || formData.images.length === 0) {
            setError("Por favor, completa todos los campos y sube al menos una imagen.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const requestData = new FormData();

            // Crear el objeto activityDTO con el ID del eventoData
            const activityDTO = {
                ...eventData, // Mantenemos todos los datos originales
                name: formData.name,
                description: formData.description,
                date: formData.date,
                // El ID y otros campos se mantienen del eventData original
            };

            // Agregar el JSON como string
            requestData.append("activity", new Blob([JSON.stringify(activityDTO)], {
                type: "application/json"
            }));

            // Agregar solo las imágenes nuevas (que tienen file)
            formData.images.forEach(imageObj => {
                if (imageObj.file) {
                    requestData.append("images", imageObj.file);
                }
            });

            const response = await fetch('http://localhost:8080/activity/updateEvent', {
                method: 'PUT',
                body: requestData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el evento');
            }

            const result = await response.json();
            
            if (onUpdateSuccess) {
                onUpdateSuccess(result.result); // Pasar los datos actualizados al componente padre
            }
            
            handleClose(); // Cerrar el modal
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "Hubo un error al actualizar el evento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal ${showModal ? "show" : ""}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>Actualizar evento</h1>
                    <button 
                        onClick={handleClose} 
                        className="close-button" 
                        aria-label="Cerrar modal"
                        disabled={loading}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {error && (
                        <div className="alert alert-danger mb-3">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        {/* Sección de Nombre y Fecha */}
                        <div className="row">
                            <div className="col-md-6">
                                <InputComponent
                                    type="text"
                                    name="name"
                                    label={
                                        <>
                                            <img className="icon-sm" src={Event} alt="Icono de evento" />
                                            <span className="label-text">Nombre del evento</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="col-md-6">
                                <DateInputComponent
                                    name="date"
                                    label={
                                        <>
                                            <img className="icon-sm" src={EventDate} alt="Icono de fecha" />
                                            <span className="label-text">Fecha</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Sección de Descripción */}
                        <div className="row">
                            <div className="col-12">
                                <InputComponent
                                    type="text"
                                    name="description"
                                    label={
                                        <>
                                            <img className="icon-sm" src={DetailsImg} alt="Icono de detalles" />
                                            <span className="label-text">Descripción</span>
                                            <span className="required-asterisk">*</span>
                                        </>
                                    }
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Sección de Imágenes */}
                        <div className="row">
                            <div className="col-12">
                                <ImageGalleryUpload
                                    images={formData.images}
                                    onChange={(newImages) => setFormData(prev => ({ ...prev, images: newImages }))}
                                    required
                                    minImages={1}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Botón de Envío */}
                        <div className="row mt-4">
                            <div className="col-6"></div>
                            <div className="col-3">
                                <PurpleButton 
                                    onClick={handleClose} 
                                    disabled={loading}
                                    type="button"
                                >
                                    Cancelar
                                </PurpleButton>
                            </div>
                            <div className="col-3">
                                <BlueButton 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? "Guardando..." : "Actualizar"}
                                </BlueButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateEventModal;