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
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [originalImages, setOriginalImages] = useState([]);

    useEffect(() => {
        if (eventData && showModal) {
            setEventName(eventData.name || "");
            setEventDescription(eventData.description || "");
            setEventDate(eventData.date || "");
            // Guardamos las imágenes originales por separado
            const initialImages = eventData.imageUrls ? [...eventData.imageUrls] : [];
            setOriginalImages(initialImages);
            setImages(initialImages);
        }
    }, [eventData, showModal]);

    const handleDateChange = (e) => {
        setEventDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventName || !eventDate || !eventDescription) {
            setError("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Determinar qué imágenes son nuevas (no están en originalImages)
            const newImages = images.filter(img => 
                typeof img === 'object' || !originalImages.includes(img)
            );

            // Determinar qué imágenes se eliminaron (están en originalImages pero no en images)
            const deletedImages = originalImages.filter(img => 
                !images.some(currentImg => 
                    typeof currentImg === 'string' && currentImg === img
                )
            );

            const formData = new FormData();

            // Preparar datos del evento
            const activityDTO = {
                id: eventData.id,
                name: eventName,
                description: eventDescription,
                date: eventDate,
                deletedImages: deletedImages, // Imágenes a eliminar
                // No incluimos las imágenes aquí, las mandamos como parte del FormData
            };

            formData.append("activity", new Blob([JSON.stringify(activityDTO)], {
                type: "application/json"
            }));

            // Agregar solo las imágenes nuevas al FormData
            newImages.forEach((img) => {
                if (typeof img === 'object' && img.file) {
                    formData.append("images", img.file);
                }
            });

            const response = await fetch('http://localhost:8080/activity/updateEvent', {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el evento');
            }

            const result = await response.json();
            
            if (onUpdateSuccess) {
                onUpdateSuccess(result.result);
            }

            handleClose();
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
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-block">
                                    <InputComponent
                                        type="text"
                                        label={
                                            <>
                                                <img className="icon-sm" src={Event} alt="Icono de evento" />
                                                <span className="label-text">Nombre del evento</span>
                                                <span className="required-asterisk">*</span>
                                            </>
                                        }
                                        value={eventName}
                                        onChange={(e) => setEventName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-block">
                                    <DateInputComponent
                                        value={eventDate}
                                        onChange={handleDateChange}
                                        label={
                                            <>
                                                <img className="icon-sm" src={EventDate} alt="Icono de fecha" />
                                                <span className="label-text">Fecha</span>
                                                <span className="required-asterisk">*</span>
                                            </>
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="form-block">
                                    <InputComponent
                                        type="text"
                                        label={
                                            <>
                                                <img className="icon-sm" src={DetailsImg} alt="Icono de detalles" />
                                                <span className="label-text">Descripción</span>
                                                <span className="required-asterisk">*</span>
                                            </>
                                        }
                                        value={eventDescription}
                                        onChange={(e) => setEventDescription(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <ImageGalleryUpload
                                    images={images}
                                    onChange={setImages}
                                    required
                                    minImages={1}
                                    label="Galería de imágenes"
                                />
                            </div>
                        </div>

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