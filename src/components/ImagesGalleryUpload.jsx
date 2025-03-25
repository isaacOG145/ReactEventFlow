import React, { useEffect } from "react";

export default function ImageGalleryUpload({
  label = "Galería (mínimo 3 imágenes)",
  images = [],                     // Array de File objects o URLs (pre-cargadas)
  onChange = () => {},             // Función al cambiar imágenes: (newImages) => {}
  minImages = 3,                   // Mínimo requerido
  error = "",                      // Mensaje de error
  required = false,
}) {
  // Liberar memoria de las URLs al desmontar el componente
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (typeof image === "object" && image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    if (file) {
      newImages[index] = {
        file,
        preview: URL.createObjectURL(file), // Previsualización
      };
    } else {
      newImages.splice(index, 1); // Eliminar imagen si no hay archivo
    }
    onChange(newImages);
  };

  const handleAddMore = () => {
    onChange([...images, null]); // Añadir espacio para nueva imagen
  };

  return (
    <div className="mb-3">
      <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      
      <div className="d-flex flex-wrap gap-3">
        {images.map((image, index) => (
          <div key={index} className="position-relative">
            {image ? (
              <img
                src={image.preview || image} // Soporta tanto Files como URLs strings
                alt={`Preview ${index + 1}`}
                className="img-thumbnail"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="img-thumbnail d-flex justify-content-center align-items-center"
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                  background: "#f8f9fa",
                }}
              >
                <span>+</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files?.[0])}
              className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
              aria-label={`Subir imagen ${index + 1}`}
            />
          </div>
        ))}

        {/* Botón para añadir más imágenes */}
        {images.length < 10 && ( // Límite opcional
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ width: "100px", height: "100px" }}
            onClick={handleAddMore}
          >
            +
          </button>
        )}
      </div>

      {/* Validación y errores */}
      {error && <div className="text-danger small mt-2">{error}</div>}
      {required && images.length < minImages && (
        <div className="text-danger small mt-2">
          Mínimo {minImages} imágenes requeridas.
        </div>
      )}
    </div>
  );
}