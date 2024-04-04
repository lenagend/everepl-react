import React, { createContext, useContext, useState } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    // Axios 인스턴스 생성
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
    });

    // Axios 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(config => {
        if (user) {
            config.headers['Authorization'] = 'Bearer ' + user;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    return (
        <AuthContext.Provider value={{ user, login, logout, axiosInstance  }}>
            {children}
        </AuthContext.Provider>
    );
};
