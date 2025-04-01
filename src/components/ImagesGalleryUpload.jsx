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

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image && typeof image === "object" && image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  const resizeImageTo16_9 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Tamaño objetivo 16:9 (ejemplo: 800x450)
          const targetWidth = 800;
          const targetHeight = 450;
          
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          // Calculamos el ratio para cubrir completamente el área manteniendo aspecto
          const sourceAspect = img.width / img.height;
          const targetAspect = targetWidth / targetHeight;
          
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
            targetWidth,
            targetHeight
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
      // Eliminar imagen si el archivo es null
      let newImages = [...images];
      if (newImages[index]?.preview) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages = newImages.filter((_, i) => i !== index);
      onChange(newImages);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Por favor, selecciona solo archivos de imagen.");
      return;
    }

    setProcessing(true);
    try {
      // Redimensionamos la imagen a 16:9 pero mantenemos la preview original
      const resizedFile = await resizeImageTo16_9(file);
      
      let newImages = [...images];
      
      // Revoke previous URL if exists
      if (newImages[index]?.preview) {
        URL.revokeObjectURL(newImages[index].preview);
      }

      newImages[index] = {
        file: resizedFile, // Guardamos la versión redimensionada
        preview: URL.createObjectURL(file) // Mostramos la original para el thumbnail
      };

      onChange(newImages);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Ocurrió un error al procesar la imagen");
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
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleDeleteImage = (index) => {
    let newImages = [...images];
    if (newImages[index]?.preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages = newImages.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="image-gallery-upload-container">
      <label className="image-gallery-upload-label">
        <img
          src={GalleryIcon}
          alt="Icono galería"
          className="label-icon" 
        />
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
                  src={image.preview}
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

      {error && <div className="image-gallery-upload-error">{error}</div>}
    </div>
  );
}