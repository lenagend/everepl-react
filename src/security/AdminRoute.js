import {useAuth} from "./AuthProvider";
import { Navigate, useLocation } from 'react-router-dom';
import Box from "@mui/joy/Box";

const AdminRoute = ({ element: Component }) => {
    const { isAuthenticated, isAuthLoading, user } = useAuth();

    if (isAuthLoading) {
        return <Box>권한 확인 중입니다...</Box>; // 권한 체크 로딩 중일 때 표시할 컴포넌트
    }

    const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

    if (!isAdmin) {
        return <Box>관리자만 이용가능합니다...</Box>; // 권한 체크 로딩 중일 때 표시할 컴포넌트
    }

    return isAuthenticated && isAdmin && (
        <Component />
    );
};

export default AdminRoute;