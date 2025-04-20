import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError("");

        if (!email || !password) {
            setError("Please enter all fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5001/api/admin/register", {
                email,
                password,
            });

            const data = response.data;

            if (data.error) {
                setError(data.error);
                return;
            }

            navigate("/admin-login"); // Redirect to login after registration
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6 text-green-400">Admin Registration</h1>
            <div className="w-80 space-y-4">
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
                    onClick={handleRegister}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    Register
                </button>
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
            </div>
            <div className="mt-4">
                <Link to="/admin-login" className="text-blue-400">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
};

export default AdminRegister;
