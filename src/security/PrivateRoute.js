import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "./AuthProvider";
import Box from "@mui/joy/Box";


const PrivateRoute = ({ element: Component }) => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    const location = useLocation();

    if (isAuthLoading) {
        return <Box>권한확인중입니다...</Box>; // 권한 체크 로딩 중일 때 표시할 컴포넌트
    }

    return isAuthenticated ? <Component /> : <Navigate to="/signin" state={{ from: location.pathname }} />;
};

export default PrivateRoute;