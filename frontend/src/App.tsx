// src/App.tsx (or main.jsx)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";
import Home from "./main/Home.tsx";
import Call from "./main/Call.tsx";
import Analytics from "./auth/Analytics.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/call" element={<Call />} />
            </Routes>
        </Router>
    );
}

export default App;
