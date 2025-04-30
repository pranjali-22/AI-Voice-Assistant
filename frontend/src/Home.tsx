import React, { useEffect, useState } from 'react';
import { getUserByEmail } from './Config.ts';

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userEmail = localStorage.getItem("userEmail");
            console.log(userEmail);
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <h1 className="text-4xl font-bold text-gray-800">
                Welcome, {user ? user.name : "Guest"}!
            </h1>
        </div>
    );
};

export default Home;
