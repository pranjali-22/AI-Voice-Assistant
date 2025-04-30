// src/auth/Login.tsx
import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleLogin, handleSubmit } from '../Config.ts';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setFormVisible(true), 100);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-12">
            <div className={`w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 transition-all duration-700 ease-out
          ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
          transform`}>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Login to access your dashboard</p>

                {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

                {/* Pass `navigate` into your handleSubmit call */}
                <form onSubmit={(e) => handleSubmit(e, setError, navigate)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
                        >
                            {passwordVisible
                                ? <AiOutlineEyeInvisible className="h-5 w-5" />
                                : <AiOutlineEye className="h-5 w-5" />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-md transition-all duration-200"
                    >
                        Login
                    </button>
                </form>

                <div className="my-5 text-center text-sm text-gray-400 relative">
                    <span className="bg-white px-2 z-10 relative">or</span>
                    <div className="absolute left-0 right-0 top-1/2 border-t border-gray-300 z-0"></div>
                </div>

                <button
                    onClick={() => handleGoogleLogin(setError, navigate)}
                    className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 text-sm font-semibold hover:bg-gray-50 shadow-sm transition"
                >
                    <FcGoogle className="h-5 w-5 mr-2" />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account? <a href="/signup" className="text-blue-600 font-medium hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
