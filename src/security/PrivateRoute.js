import React from 'react';
import {useRequireAuth} from "./useRequireAuth";
import { Navigate, useLocation } from 'react-router-dom';
import LoadingProgressModal from "../components/loading/LoadingProgressModal";

const PrivateRoute = ({ element: Component }) => {
    const isAuthValid = useRequireAuth();
    const location = useLocation();

    if (isAuthValid === null) {
        return <LoadingProgressModal isLoading={true}/>;
    }

    return isAuthValid ? <Component /> : <Navigate to="/login" state={{ from: location.pathname }} />;
};


export default PrivateRoute;