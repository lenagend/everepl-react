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

    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            handleUserToken(token);
        }
    }, []);

    const fetchUser = (userId) => {
        axios.get(`http://localhost:8080/api/auth/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    };

    const handleUserToken = (token) => {
        return verifyToken(token)
            .then(isValid => {
                if (isValid) {
                    setAuthToken(token);  // 상태 업데이트
                    localStorage.setItem("authToken", token);
                    const decoded = jwtDecode(token);
                    const userId = decoded.sub;
                    return fetchUser(userId);  // 이 반환값이 다음 then()에 연결됩니다.
                } else {
                    logout();
                }
            });
    };


    const useRequireAuth = (authToken) => {
        const navigate = useNavigate();
        const location = useLocation();

        return async () => {
            if (!authToken || !(await verifyToken(authToken))) {
                navigate('/login', { state: { from: location.pathname } });
                return false;
            }
            return true;
        };
    };

    const verifyToken = async (token) => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/verify-token', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.status === 200;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
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
        <AuthContext.Provider value={{ user, fetchUser, authToken, login, logout, axiosInstance, useRequireAuth  }}>
            {children}
        </AuthContext.Provider>
    );
};
