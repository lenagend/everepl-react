import {useEffect, useState} from "react";
import {useAuth} from "./AuthProvider";
import {useLocation, useNavigate} from "react-router-dom";

export const useRequireAuth = () => {
    const { authToken, verifyToken } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        if (authToken === undefined) {
            setIsAuthenticated(null);  // 로딩 상태 표시
            return;
        }

        const verify = async () => {
            const result = await verifyToken(authToken);

            setIsAuthenticated(result);  // 비동기 결과에 따라 인증 상태 업데이트
        };

        verify();

    }, [authToken, verifyToken]);

    return isAuthenticated;  // 인증 상태 반환
};
