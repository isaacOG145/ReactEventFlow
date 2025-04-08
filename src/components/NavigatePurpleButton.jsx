import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/buttonStyles.css';

export default function NavigatePurpleButton({ children, to, onClick }) {
  if (to) {
    return (
      <button className="bt btn-purple">
        <Link to={to} style={{ textDecoration: "none", color: "inherit", width: "100%", display: "block" }}>
          {children}
        </Link>
      </button>
    );
  }

  return (
    <button className="bt btn-purple" onClick={onClick}>
      {children}
    </button>
  );
}