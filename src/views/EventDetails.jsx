import React, { useEffect, useState } from "react";
import Carrusel from "../components/Carrusel";
import BlueButton from "../components/BlueButton";
import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";

export default function EventDetails() {
    const images = [
        'https://m.media-amazon.com/images/S/pv-target-images/c1818c4c4de1a2d35550f21448aa0a2b233fe9d107cc353665efa25891f1988b._SX1080_FMjpg_.jpg',
        'https://st1.uvnimg.com/dims4/default/571d1ed/2147483647/thumbnail/1024x576/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fo%2Fone_punch_man_live_action_perfecto_fan_made.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfux1WNBEyO403fo_IXfbTdDcFy2P8J4iaV0cR0hN63vxc5eIwHJY69LigcSeSaw4w0bk&usqp=CAU',
    ];

    // Datos de prueba solo para nombre y descripción
    const eventName = "Convención Anime Xtreme 2023";
    const eventDate = "25-27 de Noviembre, 2023";
    const eventDescription = "El evento más esperado por los fans del anime en la región. Tendremos invitados especiales, competencias de cosplay, estrenos exclusivos, stands con merchandising oficial y mucho más. Una experiencia única para conectar con otros fans y celebrar nuestra pasión por la cultura japonesa.";

    return (
        <div className="app-container">
            <CustomerRootHeader />

            <div className="content-container">
                <div className="row justify-content-center mt-4">
                    <div className="card-details">
                        <h1>{eventName}</h1>

                        <p><strong>Fecha:</strong> {eventDate}</p>

                        <p><strong>Descripción:</strong> {eventDescription}</p>

                        <Carrusel images={images}/>

                        <div className="row">
                            <div className="col-9"></div>
                            
                            <div className="col-3">
                                <BlueButton>Inscribirse</BlueButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}