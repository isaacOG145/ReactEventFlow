import React from "react";
import { redirectDocument } from "react-router-dom";

export default function ChargeManyWorkshops(){

    return(
        
        <div className="card-details col-12 col-lg-10 col-xl-10 mx-auto">
          <h1>{eventData.name}</h1>
          <div className="row mb-2">
            <div className="col-12">
              <div className="row g-2"> {/* `g-2` añade espacio entre badges cuando se apilen */}
                {/* Badge 1 */}
                <div className="col-auto"> {/* `col-auto` ajusta el ancho al contenido */}
                  <span className="badge bg-purple text-white">
                    Evento relacionado: {eventData.fromActivity.name}
                  </span>
                </div>

                {/* Badge 2 */}
                <div className="col-auto">
                  <span className="badge bg-magent text-white">
                    Cupo: {eventData.quota}
                  </span>
                </div>

                {/* Badge 3 */}
                <div className="col-auto">
                  <span className="badge bg-blue text-white">
                    Hora: {formatTime(eventData.time)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p>
            <strong>Ponente:</strong> {eventData.speaker}
          </p>

          <p>
            <strong>Descripción:</strong> {eventData.description}
          </p>

          <div className="col-12 col-md-6 d-flex gap-2">
            <a href="#!" className="event-info" onClick={(e) => {
              e.preventDefault();
              handleView(`/administrar/ver-checador-taller/${eventData.id}`);
            }}>
              Ver checador
            </a>
            <a href="#!" className="event-info" onClick={(e) => {
              e.preventDefault();
              handleView(`/administrar/detalles-evento/${eventData.fromActivity.id}`);
            }}>
              Ver evento asociado
            </a>
          </div>

          {eventData.imageUrls.length > 0 ? (
            <Carrusel images={eventData.imageUrls} />
          ) : (
            <div className="alert alert-info">
              No hay imágenes disponibles para este evento
            </div>
          )}

          <div className="row mt-3">
            <div className="col-6"></div>
            <div className="col-12 col-md-3 mb-2">
              <NavigatePurpleButton onClick={handleReturn}>Volver</NavigatePurpleButton>
            </div>
            <div className="col-12 col-md-3 mb-2">
              <BlueButton onClick={handleEdit}>Editar</BlueButton>
            </div>
          </div>
        </div>

        //tabla de asistencias 
        
        
    );
    

}