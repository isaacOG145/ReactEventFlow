import React, { useState, useEffect } from "react";
import InputComponent from "../InputComponent";
import ImageGalleryUpload from "../ImagesGalleryUpload";
import TimeInputComponent from "../TimeInputComponent";
import BlueButton from "../BlueButton";
import PurpleButton from "../PurpleButton";
import MessageModal from "./MessageModal";

import EventIcon from '../../assets/icons/event-date.png';
import DetailsImg from '../../assets/icons/details.png';
import TimeIcon from '../../assets/icons/time.png';
import PeopleIcon from '../../assets/icons/people.png';

import "../../styles/modalStyles.css";

const UpdateWorkshopModal = ({ showModal, workshopData, handleClose, onUpdateSuccess }) => {
  const [workshopName, setWorkshopName] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [quota, setQuota] = useState("");
  const [workshopTime, setWorkshopTime] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originalImages, setOriginalImages] = useState([]);

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
      }, 2500);
    }
  };

  useEffect(() => {
    if (workshopData && showModal) {
      setWorkshopName(workshopData.name || "");
      setSpeakerName(workshopData.speaker || "");
      setQuota(workshopData.quota || "");
      setWorkshopTime(workshopData.time || "");
      setDescription(workshopData.description || "");

      const initialImages = workshopData.imageUrls ? [...workshopData.imageUrls] : [];
      setOriginalImages(initialImages);
      setImages(initialImages);
    }

    // Cargar los eventos disponibles
    const userId = localStorage.getItem("userId");
    const apiUrl = import.meta.env.VITE_API_URL;
    if (userId) {
      fetch(`${apiUrl}/activity/events/byOwner/${userId}`,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.type === "SUCCESS") {
            const activeEvents = data.result
              .filter(event => event.status === true && event.typeActivity === "EVENT")
              .map(event => ({
                value: event.id.toString(),
                label: event.name
              }));
            setEvents(activeEvents);
          }
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [workshopData, showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workshopName || !speakerName || !quota || !workshopTime || !description) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Identificar imágenes eliminadas
      const deletedImages = originalImages.filter(originalImg =>
        !images.some(currentImg => typeof currentImg === 'string' && currentImg === originalImg)
      );

      // Identificar imágenes existentes que se conservan
      const existingImages = images.filter(img => typeof img === 'string' && originalImages.includes(img));

      // Filtrar imágenes nuevas (archivos)
      const newImages = images.filter(img => typeof img === 'object');

      const formData = new FormData();

      const workshopDTO = {
        id: workshopData.id,
        name: workshopName,
        speaker: speakerName,
        quota: parseInt(quota),
        time: workshopTime,
        description: description,
        deletedImages: deletedImages,
        existingImages: existingImages
      };

      formData.append("activity", new Blob([JSON.stringify(workshopDTO)], {
        type: "application/json"
      }));

      // Agregar imágenes nuevas al FormData
      newImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      try {
        // Mostrar estado de carga
        showNotification("Actualizando...", "loading");
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/activity/updateWorkshop`, {
          method: 'PUT',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al actualizar el taller');
        }

        const result = await response.json();

        // Mostrar éxito
        showNotification("Taller actualizado con exito", "success");

        if (onUpdateSuccess) {
          onUpdateSuccess(result.result);
        }

        setTimeout(() => {
          handleClose();
        },2500);


      } catch (error) {
        console.error("Error:", error);
        setError(error.message || "Hubo un error al actualizar el taller.");
      } finally {
        setLoading(false);
      }

    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Hubo un error al actualizar el taller", "error");
    }

  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h1>Actualizar taller</h1>
          <button onClick={handleClose} className="close-button" aria-label="Cerrar modal" disabled={loading}>
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
                        <img className="icon-sm" src={EventIcon} alt="Icono de evento" />
                        <span className="label-text">Nombre del taller</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    value={workshopName}
                    onChange={(e) => setWorkshopName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="text"
                    label={
                      <>
                        <img className="icon-sm" src={EventIcon} alt="Icono de ponente" />
                        <span className="label-text">Nombre del ponente</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-block">
                  <TimeInputComponent
                    label={
                      <>
                        <img className="icon-sm" src={TimeIcon} alt="Icono de tiempo" />
                        <span className="label-text">Hora del taller</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    value={workshopTime}
                    onChange={(e) => setWorkshopTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-block">
                  <InputComponent
                    type="number"
                    label={
                      <>
                        <img className="icon-sm" src={PeopleIcon} alt="Icono de personas" />
                        <span className="label-text">Cupo</span>
                        <span className="required-asterisk">*</span>
                      </>
                    }
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    required
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <ImageGalleryUpload
              images={images}
              onChange={setImages}
              required
              minImages={3}
            />

            <div className="row mt-4">
              <div className="col-6"></div>
              <div className="col-3">
                <PurpleButton onClick={handleClose} type="button">
                  Cancelar
                </PurpleButton>
              </div>
              <div className="col-3">
                <BlueButton type="submit">
                  Actualizar
                </BlueButton>
              </div>
            </div>
          </form>
        </div>
      </div>
      <MessageModal
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        type={notification.type}
        message={notification.message}
      />
    </div>

  );
};

export default UpdateWorkshopModal;
