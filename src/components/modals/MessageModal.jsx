import React, { useEffect } from 'react';
import successImg from '../../assets/icons/success.png';
import errorImg from '../../assets/icons/error.png';
import alertImg from '../../assets/icons/alert.png';
import loadingImg from '../../assets/icons/sending.png';
import '../../styles/messageStyles.css';

export default function MessageModal({ 
  show, 
  message, 
  onClose, 
  type = 'success' 
}) {
  useEffect(() => {
    // Solo auto-cerrar si no es de tipo loading
    if (show && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose, type]); // Añadido type como dependencia

  const getIcon = () => {
    switch(type) {
      case 'error': return errorImg;
      case 'warning': return alertImg;
      case 'loading': return loadingImg;
      default: return successImg;
    }
  };

  return (
    <div className={`message-modal-backdrop ${show ? 'show' : ''}`}>
      <div className={`message-modal-content message-modal-${type}`}>
        <div className="message-modal-icon-container">
          <img 
            src={getIcon()} 
            alt={type} 
            className={`message-modal-icon ${type === 'loading' ? 'loading-spin' : ''}`} 
          />
        </div>
        <p className="message-modal-text">{message}</p>
      </div>
    </div>
  );
}