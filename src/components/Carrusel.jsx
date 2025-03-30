import React, { useState, useEffect } from 'react';

const Carrusel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imgAspectRatios, setImgAspectRatios] = useState([]);
  const carruselRef = React.useRef(null);

  // Efecto para manejar el resize y obtener el ancho del contenedor
  useEffect(() => {
    const updateWidth = () => {
      if (carruselRef.current) {
        setContainerWidth(carruselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calcular aspect ratios de las imágenes
  useEffect(() => {
    const calculateAspectRatios = () => {
      const ratios = [];
      const imgElements = [];
      
      images.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          ratios[index] = img.width / img.height;
          if (ratios.length === images.length && !ratios.includes(undefined)) {
            setImgAspectRatios([...ratios]);
          }
        };
        imgElements.push(img);
      });
    };

    calculateAspectRatios();
  }, [images]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getCircularIndex = (index) => (index + images.length) % images.length;

  // Calculamos tamaños basados en el ancho del contenedor y aspect ratio
  const getImageSizes = () => {
    if (!imgAspectRatios.length) return {};
    
    const mainAspectRatio = imgAspectRatios[currentIndex] || 16/9;
    const sideAspectRatio = 16/9; // Usamos un ratio estándar para las imágenes laterales

    if (containerWidth < 600) {
      // Mobile
      return {
        mainWidth: '90%',
        mainHeight: `${Math.min(containerWidth * 0.9 / mainAspectRatio, 300)}px`,
        sideWidth: '25%',
        sideHeight: `${Math.min(containerWidth * 0.25 / sideAspectRatio, 120)}px`,
        sideOffset: '10%',
        mainObjectFit: mainAspectRatio > 1.5 ? 'cover' : 'contain'
      };
    } else if (containerWidth < 900) {
      // Tablet
      return {
        mainWidth: '75%',
        mainHeight: `${Math.min(containerWidth * 0.75 / mainAspectRatio, 400)}px`,
        sideWidth: '30%',
        sideHeight: `${Math.min(containerWidth * 0.3 / sideAspectRatio, 150)}px`,
        sideOffset: '15%',
        mainObjectFit: mainAspectRatio > 1.8 ? 'cover' : 'contain'
      };
    } else {
      // Desktop
      return {
        mainWidth: '60%',
        mainHeight: `${Math.min(containerWidth * 0.6 / mainAspectRatio, 500)}px`,
        sideWidth: '35%',
        sideHeight: `${Math.min(containerWidth * 0.35 / sideAspectRatio, 180)}px`,
        sideOffset: '20%',
        mainObjectFit: mainAspectRatio > 2 ? 'cover' : 'contain'
      };
    }
  };

  const imageSizes = getImageSizes();

  return (
    <div
      ref={carruselRef}
      className="carrusel-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        margin: 'auto',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: imageSizes.mainHeight,
          position: 'relative',
          margin: '20px 0',
          minHeight: '150px' // Altura mínima para evitar colapso
        }}
      >
        {/* Imagen anterior (a la izquierda) */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              left: imageSizes.sideOffset,
              transform: 'translateX(-50%) scale(0.8)',
              transition: 'all 0.5s ease',
              zIndex: 2,
              opacity: 0.7,
              filter: 'blur(1px)',
              width: imageSizes.sideWidth,
            }}
          >
            <img
              src={images[getCircularIndex(currentIndex - 1)]}
              alt={`Imagen anterior`}
              style={{
                width: '100%',
                height: imageSizes.sideHeight,
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                objectFit: 'cover',
                objectPosition: 'center'
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
            width: imageSizes.mainWidth,
            height: imageSizes.mainHeight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5' // Fondo por si la imagen es transparente
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`Imagen actual`}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              objectFit: imageSizes.mainObjectFit || 'contain',
              objectPosition: 'center',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>

        {/* Imagen siguiente (a la derecha) */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              right: imageSizes.sideOffset,
              transform: 'translateX(50%) scale(0.8)',
              transition: 'all 0.5s ease',
              zIndex: 2,
              opacity: 0.7,
              filter: 'blur(1px)',
              width: imageSizes.sideWidth,
            }}
          >
            <img
              src={images[getCircularIndex(currentIndex + 1)]}
              alt={`Imagen siguiente`}
              style={{
                width: '100%',
                height: imageSizes.sideHeight,
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      {images.length > 1 && (
        <>
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
              padding: containerWidth < 600 ? '8px' : '12px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 4,
              fontSize: containerWidth < 600 ? '14px' : '18px',
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
              padding: containerWidth < 600 ? '8px' : '12px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 4,
              fontSize: containerWidth < 600 ? '14px' : '18px',
            }}
          >
            &#62;
          </button>
        </>
      )}

      {/* Indicadores de posición */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            gap: '8px',
          }}
        >
          {images.map((_, index) => (
            <div
              key={index}
              style={{
                width: containerWidth < 600 ? '8px' : '12px',
                height: containerWidth < 600 ? '8px' : '12px',
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? '#333' : '#ccc',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carrusel;