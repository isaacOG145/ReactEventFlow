import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import CustomSelect from "../components/CustomSelect";

export default function EventDetails({ show, handleClose }) {
  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-4">
          <div className="modal-header border-0">
            <h3 className="modal-title text-primary fw-bold">Detalles del evento</h3>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <InputComponent label="Evento:" value="" disabled />
              </div>
              <div className="mb-3">
                <InputComponent label="Fecha y hora:" value="" disabled />
              </div>
              <div className="mb-3">
                <InputComponent label="Lugar:" value="" disabled />
              </div>
              <div className="mb-3">
                <label className="fw-bold">Checadores Asignados:</label>
                <CustomSelect options={[{ label: "Seleccionar", value: "" }]} value="" onChange={() => {}} />
              </div>
              <div className="mb-4">
                <label className="fw-bold">Talleres asociados:</label>
                <CustomSelect options={[{ label: "Seleccionar", value: "" }]} value="" onChange={() => {}} />
              </div>
              <div className="d-flex justify-content-between">
                <PurpleButton>Cancelar</PurpleButton>
                <BlueButton>Editar</BlueButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
