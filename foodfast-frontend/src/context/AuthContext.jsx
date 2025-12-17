// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

// ⚠️ TUYỆT ĐỐI KHÔNG ĐƯỢC CÓ DÒNG NÀY: import App from '../App'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        const data = localStorage.getItem('userInfo');
        return data ? JSON.parse(data) : null;
    });

    const login = (data) => {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};