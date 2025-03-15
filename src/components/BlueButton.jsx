import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/buttonStyles.css'

export default function BlueButton({children}){

    return(
        <button className="bt btn-blue">{children}</button>
    );
}