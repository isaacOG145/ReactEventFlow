import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/buttonStyles.css'

export default function PurpleButton({children, onClick}){
    


    return(
        <button className="bt btn-purple" onClick={onClick}>{children}</button>
    );
}

