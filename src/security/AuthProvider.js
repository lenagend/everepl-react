import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({ authToken: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    // 사용자 로그인 처리 함수
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        setUser({ userId: decoded.sub });

        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from, { replace: true });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);

    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            const decoded = jwtDecode(token);
            setUser({ userId: decoded.sub });
        }
    }, []);

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const useRequireAuth = () => {
        const auth = useAuth(); // AuthContext로부터 auth 객체를 가져옵니다.
        const navigate = useNavigate();
        const location = useLocation();

        // 비동기 함수를 정의합니다. 이 함수는 토큰의 유효성을 서버에 검증 요청합니다.
        const verifyToken = async (token) => {

            try {
                const response = await axiosInstance.get('http://localhost:8080/api/auth/verify-token');
                return response.status === 200;
            } catch (error) {
                console.error('Token verification failed:', error);
                return false;
            }
        };

        // 이 함수는 비동기 작업을 수행하므로, 호출하는 쪽에서 await을 사용해야 합니다.
        return async () => {
            // auth.user가 없거나 토큰 검증이 실패한 경우, 로그인 페이지로 리다이렉션합니다.
            if (!authToken || !(await verifyToken(auth.authToken))) {
                navigate('/login', { state: { from: location.pathname } });
                return false;
            }
            return true;
        };
    };


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
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
        <AuthContext.Provider value={{ user, authToken, login, logout, axiosInstance, requireAuth: useRequireAuth() }}>
            {children}
        </AuthContext.Provider>
    );
};
