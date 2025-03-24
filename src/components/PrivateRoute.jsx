import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    return isAuthenticated ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;