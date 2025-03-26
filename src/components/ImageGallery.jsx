import React from "react";
import galleryIcon from "../assets/icons/galeria-de-imagenes.png";
import addIcon from "../assets/icons/mas.png";

const ImageGallery = ({ gallery, handleImageChange, required = true }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Galería (mínimo 3 imágenes)</label>
      <div className="d-flex gap-3">
        {gallery.map((image, index) => (
          <div key={index} className="position-relative">
            {image ? (
              <img 
                src={typeof image === 'string' ? image : URL.createObjectURL(image)} 
                alt="preview" 
                className="img-thumbnail" 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
              />
            ) : (
              <img 
                src={index === gallery.length - 1 ? addIcon : galleryIcon} 
                alt="icon" 
                className="img-thumbnail" 
                style={{ width: '100px', height: '100px' }} 
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
              required={required}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;