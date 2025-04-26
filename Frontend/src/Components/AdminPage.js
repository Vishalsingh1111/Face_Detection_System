
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, LogOut, ShieldPlus } from "lucide-react";

const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (admin) {
            navigate("/admin");
        }
    }, [navigate]);

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/");
        }
    }, [navigate]);

    const handleNewUser = () => navigate("/register");
    const LogoutAdmin = () => {
        localStorage.removeItem("admin");
        navigate("/");
    };
    const AddAdmin = () => navigate("/admin-register");

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
            <h1 className="text-5xl md:text-5xl font-bold mt-10 mb-32 text-green-400">
                Welcome To Admin Panel
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Add New User */}
                <div
                    onClick={handleNewUser}
                    className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 bg-gray-700 hover:bg-gray-800 rounded-2xl transition-all shadow-lg"
                >
                    <UserPlus size={40} className="mb-3" />
                    <span className="text-lg font-semibold">New User</span>
                </div>

                {/* Add Admin */}
                <div
                    onClick={AddAdmin}
                    className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all shadow-lg"
                >
                    <ShieldPlus size={40} className="mb-3" />
                    <span className="text-lg font-semibold">New Admin</span>
                </div>

                {/* Logout */}
                <div
                    onClick={LogoutAdmin}
                    className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 bg-red-600 hover:bg-red-700  rounded-2xl transition-all shadow-lg"
                >
                    <LogOut size={40} className="mb-3" />
                    <span className="text-lg font-semibold">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
