import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state nhập lại pass
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const { search } = useLocation();

    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        // 1. Validate Mật khẩu khớp nhau (Quan trọng cho Test Case TC01)
        if (password !== confirmPassword) {
            setError('Mật khẩu nhập lại không khớp!');
            return;
        }

        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

            // Gửi dữ liệu lên API
            await axios.post(`${API_URL}/api/users/register`, {
                name,
                email,
                password,
                phone
            });

            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate(`/login?redirect=${redirect}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Tạo tài khoản</h1>
                    <p className="mt-2 text-sm text-gray-600">Tham gia cùng FoodFast ngay hôm nay</p>
                </div>

                {/* Hiển thị lỗi (quan trọng để Selenium đọc text lỗi này) */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200 error-msg">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-5">
                    {/* Tên */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên của bạn</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Email - Thêm ID reg-email */}
                    <div>
                        <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">Địa chỉ Email</label>
                        <input
                            type="email"
                            id="reg-email" // <--- ID cho Selenium
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Mật khẩu - Thêm ID reg-pass */}
                    <div>
                        <label htmlFor="reg-pass" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            id="reg-pass" // <--- ID cho Selenium
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Nhập lại Mật khẩu - Thêm field này & ID reg-confirm-pass */}
                    <div>
                        <label htmlFor="reg-confirm-pass" className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            id="reg-confirm-pass" // <--- ID cho Selenium
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        id="register-btn" // <--- ID cho Selenium
                        disabled={loading}
                        className="w-full py-3 px-4 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-70"
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                    </button>
                </form>

                <div className="text-sm text-center text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link to={`/login?redirect=${redirect}`} className="font-bold text-indigo-600 hover:text-indigo-800">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;