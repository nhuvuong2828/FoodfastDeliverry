// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Khởi tạo từ localStorage để F5 không mất đăng nhập
    const [userInfo, setUserInfo] = useState(() => {
        const localData = localStorage.getItem('userInfo');
        return localData ? JSON.parse(localData) : null;
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