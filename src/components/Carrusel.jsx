import React, { useState } from 'react';

const Carrusel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar al siguiente ítem
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Cambiar al anterior ítem
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="carrusel-container" style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 'auto' }}>
      <div className="image-container" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={images[currentIndex]}
          alt="Carrusel"
          style={{ width: '100%', height: 'auto', transition: 'transform 0.5s ease' }}
        />
      </div>
      
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        &#60;
      </button>
      
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        &#62;
      </button>
    </div>
  );
};

export default Carrusel;
