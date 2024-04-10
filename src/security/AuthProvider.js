import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const useRequireAuth = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return () => {
        if (!auth.user) {
            navigate('/login', { state: { from: location.pathname } });
            return false;
        }
        return true;
    };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setUser(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setUser(token);
        }
    }, []);

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
    });

    axiosInstance.interceptors.request.use(config => {
        if (user) {
            config.headers['Authorization'] = 'Bearer ' + user;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    return (
        <AuthContext.Provider value={{ user, login, logout, axiosInstance, requireAuth: useRequireAuth() }}>
            {children}
        </AuthContext.Provider>
    );
};
