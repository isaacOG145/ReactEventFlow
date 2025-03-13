import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/buttonStyles.css'

export default function PurpleButton({children}){
    


    return(
        <button className="btn btn-purple">{children}</button>
    );
}

