import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [imageCaptured, setImageCaptured] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    //  Redirect to "/" if admin is not in localStorage
    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/");
        }
    }, [navigate]);

    const getBase64Data = (dataUrl) => dataUrl.split(",")[1];

    const captureImage = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            setError("Failed to capture image. Please try again.");
            return;
        }

        const base64Data = getBase64Data(imageSrc);
        setImage(base64Data);
        setImageCaptured(true);
        setError("");
        setStatus("Checking if user is already registered...");

        try {
            const response = await axios.post("http://localhost:5001/api/match", {
                image: base64Data,
            });

            if (response.data.matched) {
                setStatus(`User already registered as ${response.data.username}`);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setStatus("Please enter your name to register.");
                setIsNewUser(true);
            }
        } catch (err) {
            console.error(err);
            setError("Error while matching face. Please try again.");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const handleRegister = async () => {
        if (!username.trim()) {
            setError("Please enter a valid name.");
            return;
        }

        setStatus("Registering user...");
        setError("");

        try {
            await axios.post("http://localhost:5001/api/register", {
                image,
                username,
            });

            setStatus("Registration successful!");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.error(err);
            setError("Registration failed. Please try again.");

        }
    };



    return (
        <div className="flex flex-col items-center min-h-screen py-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <h1 className="text-4xl font-bold mb-10 text-green-400">Register New User</h1>

            {!imageCaptured ? (
                <div className="w-[600px] h-[450px] border-4 border-blue-500 rounded-lg overflow-hidden mb-4">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: "user", width: 640, height: 480 }}
                        className="w-full h-full"
                    />
                </div>
            ) : (
                <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt="Captured"
                    className="w-[600px] h-[450px] border-2 rounded-lg mb-4"
                />
            )}

            <div className="space-x-3">
                {!imageCaptured && (

                    <button
                        onClick={captureImage}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold transition-colors duration-300"
                    >
                        Capture
                    </button>
                )}


            </div>

            {isNewUser && (
                <div className="flex flex-col items-center space-y-4 mt-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your name"
                        className="w-80 px-4 py-2 text-white rounded-lg bg-gray-800 border border-gray-600"
                    />
                    <button
                        onClick={handleRegister}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold transition-colors duration-300"
                    >
                        Register
                    </button>
                </div>
            )}

            {status && <p className="text-yellow-300 text-2xl mt-4">{status}</p>}
            {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
    );
};

export default UserRegistration;
