import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "./AuthProvider";

const PrivateRoute = ({ element: Component }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated ? <Component /> : <Navigate to="/login" state={{ from: location.pathname }} />;
};


export default PrivateRoute;