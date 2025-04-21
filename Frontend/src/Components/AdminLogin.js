import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if already logged in
        const admin = localStorage.getItem("admin");
        if (admin) {
            navigate("/register");
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
            navigate("/register");
        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="border-2 border-green-600 p-10 rounded">
                <h1 className="text-4xl text-center mx-auto font-bold mb-10 text-green-500">Admin Login</h1>
                <div className="w-80 space-y-4 ">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
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
