import React, { useState } from 'react';

const Carrusel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Función para obtener el índice circular
  const getCircularIndex = (index) => (index + images.length) % images.length;

  return (
    <div
      className="carrusel-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: 'auto',
        perspective: '1000px', // Para efecto 3D
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px', // Altura fija para el contenedor
          position: 'relative',
        }}
      >
        {/* Imagen anterior (a la izquierda) */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              left: '5%',
              transform: 'translateX(-50%) scale(0.8)',
              transition: 'all 0.5s ease',
              zIndex: 2,
              opacity: 0.7,
              filter: 'blur(1px)',
            }}
          >
            <img
              src={images[getCircularIndex(currentIndex - 1)]}
              alt={`Imagen anterior`}
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Imagen actual (centrada) */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            transform: 'scale(1)',
            transition: 'all 0.5s ease',
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`Imagen actual`}
            style={{
              width: '320px',
              height: '300px',
              borderRadius: '10px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Imagen siguiente (a la derecha) */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              right: '5%',
              transform: 'translateX(50%) scale(0.8)',
              transition: 'all 0.5s ease',
              zIndex: 2,
              opacity: 0.7,
              filter: 'blur(1px)',
            }}
          >
            <img
              src={images[getCircularIndex(currentIndex + 1)]}
              alt={`Imagen siguiente`}
              style={{
                width: '320px',
                height: '200px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>

      {/* Botones de navegación */}
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
          padding: '15px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 4,
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
          padding: '15px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 4,
        }}
      >
        &#62;
      </button>

      {/* Indicadores de posición */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          gap: '10px',
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#333' : '#ccc',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;