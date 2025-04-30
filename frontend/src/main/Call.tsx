import React, { useState } from 'react';
import aiImage from '../assets/ai-image.png';
import userImage from '../assets/user-image.png';
import { useNavigate } from 'react-router-dom';

const Call = () => {
    const [aiSpeaking, setAiSpeaking] = useState(false);
    const [userSpeaking, setUserSpeaking] = useState(false);
    const navigate = useNavigate();

    const endCall = () => {
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-10">Live Call with AI Agent</h1>

            <div className="w-full max-w-7xl grid grid-cols-2 gap-6 bg-white shadow-2xl rounded-3xl overflow-hidden p-6">
                {/* AI Side */}
                <div className="relative bg-blue-50 flex flex-col items-center justify-center p-8">
                    <img
                        src={aiImage}
                        alt="AI"
                        className="w-[350px] h-[350px] object-cover rounded-full border-8 border-blue-400"
                    />
                    <p className="mt-6 text-2xl font-semibold text-blue-700">AI Agent</p>

                    {aiSpeaking && (
                        <div className="absolute bottom-6 left-6 flex items-end gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-10 bg-blue-500 rounded animate-speak"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                            <span className="ml-3 text-lg text-blue-700 font-medium">Speaking...</span>
                        </div>
                    )}
                </div>

                {/* User Side */}
                <div className="relative bg-green-50 flex flex-col items-center justify-center p-8">
                    <img
                        src={userImage}
                        alt="User"
                        className="w-[350px] h-[350px] object-cover rounded-full border-8 border-green-400"
                    />
                    <p className="mt-6 text-2xl font-semibold text-green-700">You</p>

                    {userSpeaking && (
                        <div className="absolute bottom-6 right-6 flex items-end gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-10 bg-green-500 rounded animate-speak"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                            <span className="ml-3 text-lg text-green-700 font-medium">Speaking...</span>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={endCall}
                className="mt-10 bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transition"
            >
                End Call
            </button>
        </div>
    );
};

export default Call;