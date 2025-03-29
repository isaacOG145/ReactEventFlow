import React, { useEffect, useState } from "react";
import Carrusel from "../components/Carrusel";


import '../styles/main.css';
import CustomerRootHeader from "../components/CustomerRootHeader";

export default function EventDetails() {

    const images = [
        'https://m.media-amazon.com/images/S/pv-target-images/c1818c4c4de1a2d35550f21448aa0a2b233fe9d107cc353665efa25891f1988b._SX1080_FMjpg_.jpg',
        'https://st1.uvnimg.com/dims4/default/571d1ed/2147483647/thumbnail/1024x576/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fo%2Fone_punch_man_live_action_perfecto_fan_made.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfux1WNBEyO403fo_IXfbTdDcFy2P8J4iaV0cR0hN63vxc5eIwHJY69LigcSeSaw4w0bk&usqp=CAU',
      ];

    return (
        <div className="app-container">
            <CustomerRootHeader />

            <div className="content-container">
                <Carrusel images={images}/>
            </div>
        </div>
    );
}
