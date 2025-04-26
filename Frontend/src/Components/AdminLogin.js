

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (admin) {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogin = async () => {
        setError("");
        if (!email || !password) {
            setError("Please enter all fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5001/api/admin/login", {
                email,
                password,
            });

            const data = response.data;

            if (data.error) {
                setError(data.error);
                return;
            }

            localStorage.setItem("admin", JSON.stringify({ email: data.email }));
            navigate("/admin");
        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl p-10 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <ShieldCheck className="text-green-500 mr-2" size={32} />
                    <h1 className="text-3xl font-extrabold text-green-400">Admin Login</h1>
                </div>

                <div className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 transition-all rounded-xl font-semibold shadow-md"
                    >
                        Login
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

