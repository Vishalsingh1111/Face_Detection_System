// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const AdminLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isRegistering, setIsRegistering] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         if (!email || !password) {
//             toast.error("Please enter all fields");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:5001/api/admin/login", {
//                 email,
//                 password
//             });

//             const data = response.data;

//             if (data.error) {
//                 toast.error(data.error);
//                 return;
//             }

//             localStorage.setItem("admin", JSON.stringify(data));
//             toast.success("Login successful");
//             navigate("/register");
//         } catch (error) {
//             toast.error(error.response?.data?.error || "Login failed");
//         }
//     };

//     const handleRegister = async () => {
//         if (!email || !password) {
//             toast.error("Please enter all fields");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:5001/api/admin/register", {
//                 email,
//                 password
//             });

//             const data = response.data;

//             if (data.error) {
//                 toast.error(data.error);
//                 return;
//             }

//             toast.success("Registration successful. Please log in.");
//             setIsRegistering(false); // Switch to login after registration
//         } catch (error) {
//             toast.error(error.response?.data?.error || "Registration failed");
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//             <h1 className="text-3xl font-bold mb-6 text-green-400">
//                 {isRegistering ? "Admin Registration" : "Admin Login"}
//             </h1>
//             <div className="w-80 space-y-4">
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
//                 />
//                 <button
//                     onClick={isRegistering ? handleRegister : handleLogin}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//                 >
//                     {isRegistering ? "Register" : "Login"}
//                 </button>
//             </div>
//             <div className="mt-4">
//                 <span
//                     onClick={() => setIsRegistering(!isRegistering)}
//                     className="text-blue-400 cursor-pointer"
//                 >
//                     {isRegistering
//                         ? "Already have an account? Login"
//                         : "Don't have an account? Register"}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         setError("");

//         if (!email || !password) {
//             setError("Please enter all fields");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:5001/api/admin/login", {
//                 email,
//                 password,
//             });

//             const data = response.data;

//             if (data.error) {
//                 setError(data.error);
//                 return;
//             }

//             localStorage.setItem("admin", JSON.stringify(data));
//             navigate("/register");
//         } catch (error) {
//             setError(error.response?.data?.error || "Login failed");
//         }
//     };

//     const handleRegister = async () => {
//         setError("");

//         if (!email || !password) {
//             setError("Please enter all fields");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:5001/api/admin/register", {
//                 email,
//                 password,
//             });

//             const data = response.data;

//             if (data.error) {
//                 setError(data.error);
//                 return;
//             }

//             setIsRegistering(false);
//         } catch (error) {
//             setError(error.response?.data?.error || "Registration failed");
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//             <h1 className="text-3xl font-bold mb-6 text-green-400">
//                 {isRegistering ? "Admin Registration" : "Admin Login"}
//             </h1>
//             <div className="w-80 space-y-4">
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
//                 />
//                 <button
//                     onClick={isRegistering ? handleRegister : handleLogin}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//                 >
//                     {isRegistering ? "Register" : "Login"}
//                 </button>
//                 {error && (
//                     <p className="text-red-500 text-sm text-center">{error}</p>
//                 )}
//             </div>
//             <div className="mt-4">
//                 <span
//                     onClick={() => {
//                         setIsRegistering(!isRegistering);
//                         setError("");
//                     }}
//                     className="text-blue-400 cursor-pointer"
//                 >
//                     {isRegistering
//                         ? "Already have an account? Login"
//                         : "Don't have an account? Register"}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

            localStorage.setItem("admin", JSON.stringify(data));
            navigate("/register");
        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6 text-green-400">Admin Login</h1>
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
    );
};

export default AdminLogin;
