import React, { useEffect, useRef } from "react";
import '../styles/imagesStyles.css';


import VoidImage from '../assets/icons/galeria-de-imagenes.png';
import MoreImages from '../assets/icons/mas.png'

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

  const handleImageChange = (index, file) => {
    let newImages = [...images]; // Hacer una copia del array

    if (file) {
      // Verificar que el archivo sea una imagen
      if (file.type.startsWith('image/')) {
        // Revoke previous URL if exists
        if (newImages[index]?.preview) {
          URL.revokeObjectURL(newImages[index].preview);
        }

        newImages[index] = {
          file,
          preview: URL.createObjectURL(file),
        };
      } else {
        alert("Por favor, selecciona solo archivos de imagen.");
        return;
      }
    } else {
      // Eliminar imagen si el archivo es null
      if (newImages[index]?.preview) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      // Crear un nuevo array sin el elemento en la posición index
      newImages = newImages.filter((_, i) => i !== index);
    }

    onChange(newImages); // Actualizar el estado con la nueva lista de imágenes
  };

  const handleAddMore = () => {
    if (images.length < maxImages) {
      onChange([...images, null]); // Agregar un espacio vacío para nueva imagen
    }
  };

  const triggerFileInput = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  // Eliminar imagen por index
  const handleDeleteImage = (index) => {
    let newImages = [...images];
    if (newImages[index]?.preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages = newImages.filter((_, i) => i !== index); // Filtramos la imagen en el índice
    onChange(newImages); // Actualizamos el estado
  };

  return (
    <div className="image-gallery-upload-container">
      <label className="image-gallery-upload-label">
        {label} {required && <span className="image-gallery-upload-required">*</span>}
      </label>

      <div className="image-gallery-upload-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-gallery-upload-wrapper">
            {image ? (
              <>
                <img
                  src={image.preview || image}
                  alt={`Preview ${index + 1}`}
                  className="image-gallery-upload-thumbnail"
                />
                <button
                  type="button"
                  className="image-gallery-upload-delete btn btn-danger btn-sm"
                  onClick={() => handleDeleteImage(index)} // Llamar para eliminar la imagen
                  aria-label={`Eliminar imagen ${index + 1}`}
                >
                  ×
                </button>
              </>
            ) : (
              <div
                className="image-gallery-upload-placeholder"
                onClick={() => triggerFileInput(index)} // Al hacer clic, abre el selector de archivos
              >
                <img className="img-icon" src={VoidImage} alt="img" />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files?.[0])}
              className="image-gallery-upload-input"
              aria-label={`Subir imagen ${index + 1}`}
              ref={el => fileInputRefs.current[index] = el}
              style={{ display: "none" }} // Ocultar el input de archivo
            />
          </div>
        ))}

        {/* Botón de agregar nueva imagen */}
        {images.length < maxImages && (
          <button
            type="button"
            className="image-gallery-upload-add"
            onClick={handleAddMore}
            disabled={images.length >= maxImages}
          >
            <img className="more-icon" src={MoreImages} alt="icon" />
          </button>
        )}
      </div>

      {/* Mensajes de validación */}
      {error && <div className="image-gallery-upload-error">{error}</div>}
      {required && images.length < minImages && (
        <div className="image-gallery-upload-error">
          Mínimo {minImages} imágenes requeridas.
        </div>
      )}
      {images.length >= maxImages && (
        <div className="image-gallery-upload-info">
          Máximo {maxImages} imágenes permitidas.
        </div>
      )}
    </div>
  );
}
