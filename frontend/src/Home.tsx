// src/Home.tsx
import React from 'react';

const Home = () => {
    const username = localStorage.getItem("username") || "User";

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <h1 className="text-4xl font-bold text-gray-800">Welcome, {username}!</h1>
        </div>
    );
};

export default Home;
