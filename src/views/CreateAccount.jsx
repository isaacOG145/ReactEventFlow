import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import '../styles/iconStyles.css';

import backgroundSecondary from '../assets/backgroundSecondary.png';

export default function CreateAccount() {
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <div className="background-container d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundSecondary})`, height: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "40rem" }}>
        <div className="text-center mb-3">
          <h2 className="text-primary">Crear cuenta</h2>
        </div>
        <form>
          <div className="row mb-3">
            <div className="col">
              <input type="text" className="form-control" placeholder="Nombres*" />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Apellidos*" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input type="email" className="form-control" placeholder="Email*" />
            </div>
            <div className="col">
              <input type="tel" className="form-control" placeholder="Teléfono*" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input type="password" className="form-control" placeholder="Contraseña*" />
            </div>
            <div className="col">
              <input type="password" className="form-control" placeholder="Confirmar contraseña*" />
            </div>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Empresa o razón social*" />
          </div>
          <div className="text-center">
            <button className="btn btn-primary w-100">Crear cuenta</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <button className="btn btn-link text-muted" onClick={() => navigate("/")}>
            ¿Ya tienes una cuenta?
          </button>
        </div>
      </div>
    </div>
  );
}
