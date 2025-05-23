import React, { useEffect, useState } from 'react';
import { getUserByEmail } from '../Config.ts';
import { useNavigate } from 'react-router-dom';

interface User {
    name: string;
    email: string;
    role?: string;
}

const Home = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userEmail = localStorage.getItem("userEmail");
            if (userEmail) {
                try {
                    const fetchedUser = await getUserByEmail(userEmail);
                    setUser(fetchedUser);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const welcomeMessage = user?.role === 'admin'
        ? "Welcome back, Admin!"
        : `Welcome, ${user?.name || "Guest"}!`;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{welcomeMessage}</h1>
            <button
                onClick={() => navigate("/call")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Join a Call with Agent
            </button>
        </div>
    );
};

export default Home;
