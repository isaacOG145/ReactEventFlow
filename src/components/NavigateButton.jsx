import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/buttonStyles.css';

export default function NavigateButton({ children, to, onClick }) {
  if (to) {
    return (
      <button className="bt btn-nav">
        <Link to={to} style={{ textDecoration: "none", color: "inherit", width: "100%", display: "block" }}>
          {children}
        </Link>
      </button>
    );
  }

  return (
    <button className="bt btn-nav" onClick={onClick}>
      {children}
    </button>
  );
}