import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/buttonStyles.css'
import { Button } from 'react-bootstrap';

export default function EventPurpleButton({ children, ...props }) {
    return (
        <Button className="bt btn-purple" {...props}>
            {children}
        </Button>
    );
}