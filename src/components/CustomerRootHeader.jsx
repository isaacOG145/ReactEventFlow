import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

//png
import purpleLogo from '../assets/purpleLogo.png';

export default function CustomerRootHeader(){

    return(
        <div className="row">
            <div className="root-header">
                <img src={purpleLogo} alt="logo"></img>
            </div>
        </div>
    );

}