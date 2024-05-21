import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import {SPRING_BOOT_SERVER_URL, STATIC_SERVER_URL} from "../config/Config";

const AuthContext = createContext({
    user: null,
    authToken: null,
    isAuthLoading: true, // 권한 체크 로딩 상태를 추가합니다.
    isAuthenticated: null,
    fetchUser: () => {},
    login: () => {},
    logout: () => {},
    axiosInstance: undefined,
    verifyToken: () => {}
});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true); // 초기 로딩 상태를 true로 설정

    const navigate = useNavigate();
    const location = useLocation();

    // 사용자 로그인 처리 함수
    const login = (token) => {
        handleUserToken(token)
            .then(() => {
                const { from } = location.state || { from: { pathname: "/" } };
                navigate(from, { replace: true });  // 토큰 처리가 완료된 후에 페이지 이동
            })
            .catch((error) => {
                console.error("Login failed:", error);
                // 실패 처리 로직, 예를 들어 에러 메시지를 사용자에게 보여주기
            });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        if (authToken) {
            handleUserToken(authToken);
        } else {
            setIsAuthLoading(false); // 토큰이 없으면 로딩 상태를 false로 설정
        }
    }, [location.pathname]);

    const handleUserToken = (token) => {
        setIsAuthLoading(true); // 권한 체크 시작
        return verifyToken(token)
            .then(isValid => {
                if (isValid) {
                    setAuthToken(token);  // 상태 업데이트
                    setIsAuthenticated(true);
                    localStorage.setItem("authToken", token);
                    const decoded = jwtDecode(token);
                    const userId = decoded.sub;
                    return fetchUser(userId);  // 이 반환값이 다음 then()에 연결됩니다.
                } else {
                    logout();
                }
            })
            .finally(() => {
                setIsAuthLoading(false); // 권한 체크 완료
            });
    };

    const fetchUser = (userId) => {
        axiosInstance.get(`/auth/${userId}`)
            .then(response => {
                const userData = response.data;
                userData.imageUrl = userData.imageUrl && `${STATIC_SERVER_URL}${userData.imageUrl}`;
                setUser(userData);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    };


    const verifyToken = async (token) => {
        try {
            const response = await axios.get(SPRING_BOOT_SERVER_URL + '/api/auth/verify-token', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.status === 200;
        } catch (error) {
            return false;
        }
    };

    const axiosInstance = axios.create({
        baseURL: SPRING_BOOT_SERVER_URL + '/api',
    });

    axiosInstance.interceptors.request.use(config => {
        if (authToken) {
            config.headers['Authorization'] = 'Bearer ' + authToken;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    return (
        <AuthContext.Provider value={{ user, fetchUser,  authToken, isAuthenticated, isAuthLoading, login, logout, axiosInstance, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);