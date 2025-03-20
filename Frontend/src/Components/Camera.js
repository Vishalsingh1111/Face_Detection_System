import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Camera = () => {
    const webcamRef = useRef(null);
    const [matchResult, setMatchResult] = useState("");
    const [username, setUsername] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [isCapturing, setIsCapturing] = useState(false);

    const getBase64Data = (dataUrl) => dataUrl.split(",")[1];

    useEffect(() => {
        if (isCapturing) {
            startCapture();
        }
    }, [isCapturing]);

    const startCapture = () => {
        setMatchResult("");
        setError("");
        setStatus("Capturing...");

        setTimeout(() => {
            if (webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                if (imageSrc) {
                    setStatus("Matching...");
                    checkMatch(imageSrc);
                } else {
                    setStatus("Look into the camera!");
                    setError("Face not detected properly. Retry");
                    setTimeout(startCapture, 2000);
                }
            }
        }, 2000);
    };

    const checkMatch = async (imageSrc) => {
        const base64Data = getBase64Data(imageSrc);
        try {
            const res = await axios.post("http://localhost:5001/api/match", { image: base64Data });

            if (res.data.matched) {
                setMatchResult(` Welcome, ${res.data.username}!`);
                setStatus("Matched Successfully!");
                setIsCapturing(false);
            } else {
                setMatchResult("");
                setStatus("User Not Found! Register.");
                setIsModalOpen(true);
                setIsCapturing(false);
            }
        } catch (err) {
            setStatus("Look into the camera!");
            setError("Face not detected properly. Retry");
            setTimeout(startCapture, 2000);
        }
    };

    const registerUser = async () => {
        if (!username.trim()) {
            setError("Enter your name!");
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            setError("Recapture Image!");
            return;
        }

        const base64Data = getBase64Data(imageSrc);
        setStatus("Registering...");

        try {
            await axios.post("http://localhost:5001/api/register", { image: base64Data, username });
            setIsModalOpen(false);
            setStatus("Registered Successfully! Now Recapture.");
        } catch (err) {
            setError("⚠️ Error in Registration");
            setStatus("Registration Failed!");
        }
    };

    return (
        <div className="flex flex-col items-center pt-5 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-semibold text-orange-500 mb-10">Automated Face Recognition</h1>

            {/* Camera Feed */}
            <div className="w-[600px] h-[450px] rounded-lg overflow-hidden border-4 border-blue-500 bg-blue-500">
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-full" />
            </div>

            {/* Status Message */}
            <p className="mt-4 text-lg text-yellow-400">{status}</p>

            {/* Match Result */}
            {matchResult && <p className="mt-6 text-4xl text-green-500">{matchResult}</p>}

            {/* Error Message */}
            {error && <p className="mt-4 text-red-500 text-lg">{error}</p>}

            {/* Start / Recapture Button */}
            {!isCapturing && (
                <button
                    onClick={() => setIsCapturing(true)}
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg text-lg"
                >
                    {"Capture"}
                </button>
            )}

            {/* Modal for User Registration */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
                    <div className="bg-white p-6 rounded-lg w-96 text-left">
                        <h2 className="text-xl font-semibold mb-4">New User Detected</h2>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 border rounded-lg w-full mb-2"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-between">
                            <button onClick={registerUser} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                                Register
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setError("");
                                }}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Camera;

