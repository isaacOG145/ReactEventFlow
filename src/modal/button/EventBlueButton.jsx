import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/buttonStyles.css'
import { Button } from 'react-bootstrap';

export default function EventBlueButton({ children, ...props }) {
    return (
        <Button className="bt btn-blue" {...props}>
            {children}
        </Button>
    );
}