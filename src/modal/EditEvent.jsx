import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/iconStyles.css";

import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import DetailsImg from "../assets/icons/details.png";
import InputComponent from "../components/InputComponent";
import ImageGalleryUpload from "../components/ImagesGalleryUpload";

export default function EditEvent({ show, handleClose }) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [images, setImages] = useState([]);

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-lg"> {/* Modal más grande */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Actualizar Evento</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form className="event-form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-block">
                    <InputComponent
                      type="text"
                      label={
                        <>
                          <span className="label-text">Nombre del taller</span>
                          <span className="required-asterisk">*</span>
                        </>
                      }
                      id="name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-block">
                    <InputComponent
                      type="text"
                      label={
                        <>
                          <span className="label-text">Nombre del ponente</span>
                          <span className="required-asterisk">*</span>
                        </>
                      }
                      id="speaker"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <InputComponent
                  type="text"
                  label={
                    <>
                      <img className="icon-sm" src={DetailsImg} alt="" />
                      <span className="label-text">Descripción</span>
                      <span className="required-asterisk">*</span>
                    </>
                  }
                />
              </div>
              <div className="row">
                <ImageGalleryUpload
                  images={images}
                  onChange={setImages}
                  required
                  minImages={3}
                  error={images.length < 3 ? "Sube al menos 3 imágenes" : ""}
                />
              </div>
              {/* Botones uno debajo del otro */}
              <div className="mt-4 d-grid gap-4">
                <BlueButton className="w-100 mb-2">Actualizar evento</BlueButton> {/* Usamos w-100 para que los botones ocupen el 100% del contenedor y mb-2 para separarlos */}
                <PurpleButton className="w-100">Cancelar</PurpleButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
