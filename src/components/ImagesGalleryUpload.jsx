import React, { useEffect, useRef, useState } from "react";
import '../styles/imagesStyles.css';

import VoidImage from '../assets/icons/galeria-de-imagenes.png';
import MoreImages from '../assets/icons/mas.png';
import GalleryIcon from '../assets/icons/img-icon.png';

export default function ImageGalleryUpload({
  label = "Galería (mínimo 3 imágenes)",
  images = [],
  onChange = () => { },
  minImages = 3,
  error = "",
  required = false,
  maxImages = 10,
}) {
  const fileInputRefs = useRef([]);
  const [processing, setProcessing] = useState(false);
  const [galleryError, setGalleryError] = useState('');

  // Limpieza de URLs de objeto
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image?.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  // Función para redimensionar imágenes a 16:9
  const resizeTo16_9 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Tamaño objetivo 16:9 (800x450)
          canvas.width = 800;
          canvas.height = 450;

          // Calculamos el recorte centrado
          const sourceAspect = img.width / img.height;
          const targetAspect = 16 / 9;

          let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

          if (sourceAspect > targetAspect) {
            // Imagen más ancha - recortar lados
            drawHeight = img.height;
            drawWidth = drawHeight * targetAspect;
            offsetX = (img.width - drawWidth) / 2;
          } else {
            // Imagen más alta - recortar arriba/abajo
            drawWidth = img.width;
            drawHeight = drawWidth / targetAspect;
            offsetY = (img.height - drawHeight) / 2;
          }

          ctx.drawImage(
            img,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight,
            0,
            0,
            800,
            450
          );

          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }));
          }, 'image/jpeg', 0.85);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (index, file) => {
    if (!file) {
      // Eliminar imagen
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Por favor, selecciona solo archivos de imagen.");
      return;
    }

    setProcessing(true);
    try {
      let processedFile = file;

      // Solo redimensionamos imágenes nuevas (no las existentes)
      if (!images[index]?.existing) {
        processedFile = await resizeTo16_9(file);
      }

      const newImages = [...images];
      newImages[index] = {
        ...newImages[index],
        file: processedFile,
        preview: URL.createObjectURL(file), // Mostrar preview original
        existing: images[index]?.existing || false // Marcar si es imagen existente
      };

      onChange(newImages);
    } catch (error) {
      console.error("Error procesando imagen:", error);
      alert("Error al procesar la imagen");
    } finally {
      setProcessing(false);
    }
  };

  const handleAddMore = () => {
    if (images.length < maxImages) {
      onChange([...images, null]);
    }
  };

  const triggerFileInput = (index) => {
    fileInputRefs.current[index]?.click();
  };

  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  useEffect(() => {
    const validImages = images.filter((img) => img !== null);
    if (required && validImages.length < minImages) {
      setGalleryError(`Debes subir al menos ${minImages} imágenes.`);
    } else {
      setGalleryError('');
    }
  }, [images, minImages, required]);


  return (
    <div className="image-gallery-upload-container">
      <label className="image-gallery-upload-label">
        <img src={GalleryIcon} alt="Icono galería" className="label-icon" />
        {label} {required && <span className="image-gallery-upload-required">*</span>}
      </label>

      {processing && (
        <div className="image-processing-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Procesando imagen...</span>
          </div>
        </div>
      )}

      <div className="image-gallery-upload-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-gallery-upload-wrapper">
            {image ? (
              <>
                <img
                  src={image.preview || image.url || image}
                  alt={`Preview ${index + 1}`}
                  className="image-gallery-upload-thumbnail"
                />
                <button
                  type="button"
                  className="image-gallery-upload-delete btn btn-danger btn-sm"
                  onClick={() => handleDeleteImage(index)}
                  aria-label={`Eliminar imagen ${index + 1}`}
                >
                  ×
                </button>
              </>
            ) : (
              <div
                className="image-gallery-upload-placeholder"
                onClick={() => triggerFileInput(index)}
              >
                <img className="img-icon" src={VoidImage} alt="Subir imagen" />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files?.[0])}
              className="image-gallery-upload-input"
              aria-label={`Subir imagen ${index + 1}`}
              ref={el => fileInputRefs.current[index] = el}
              style={{ display: "none" }}
            />
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            className="image-gallery-upload-add"
            onClick={handleAddMore}
            disabled={images.length >= maxImages || processing}
          >
            <img className="more-icon" src={MoreImages} alt="Añadir más imágenes" />
          </button>
        )}
      </div>

      {(error || galleryError) && (
        <div className="image-gallery-upload-error">
          {galleryError || error}
        </div>
      )}

    </div>
  );
}