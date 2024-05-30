import {useAuth} from "./AuthProvider";
import { Navigate, useLocation } from 'react-router-dom';
import Box from "@mui/joy/Box";

const AdminRoute = ({ element: Component }) => {
    const { isAuthenticated, isAuthLoading, user } = useAuth();
    const location = useLocation();

    if (isAuthLoading) {
        return <Box>권한 확인 중입니다...</Box>; // 권한 체크 로딩 중일 때 표시할 컴포넌트
    }

    const isAdmin = user && user.role === 'ROLE_ADMIN';

    return isAuthenticated && isAdmin ? (
        <Component />
    ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
    );
};

export default AdminRoute;