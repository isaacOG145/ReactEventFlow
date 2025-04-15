import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/buttonStyles.css';

export default function NavigateBlueButton({ children, to, onClick, scrollToId }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    if (scrollToId) {
      // Navegación con hash para scroll inmediato
      if (to) {
        navigate(`${to}#${scrollToId}`);
      } else {
        // Scroll en la página actual
        setTimeout(() => {
          const element = document.getElementById(scrollToId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  if (to) {
    return (
      <button className="bt btn-blue" onClick={handleClick}>
        <Link 
          to={scrollToId ? `${to}#${scrollToId}` : to} 
          style={{ textDecoration: "none", color: "inherit", width: "100%", display: "block" }}
        >
          {children}
        </Link>
      </button>
    );
  }

  return (
    <button className="bt btn-blue" onClick={handleClick}>
      {children}
    </button>
  );
}