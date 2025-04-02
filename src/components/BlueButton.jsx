import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/buttonStyles.css'

export default function BlueButton({children, onClick}){

    return(
        <button className="bt btn-blue" onClick={onClick}>{children}</button>
    );
}