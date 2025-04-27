import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FaceMatching = () => {
    const webcamRef = useRef(null);
    const [matchResult, setMatchResult] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    const getBase64Data = (dataUrl) => dataUrl.split(",")[1];

    const captureAndMatch = useCallback(async () => {
        if (webcamRef.current && !isProcessing && !isPaused && isActive) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (!imageSrc) return;

            setIsProcessing(true);
            setMatchResult("Scanning...");
            const base64Data = getBase64Data(imageSrc);

            try {
                const res = await axios.post("http://localhost:5001/api/match", {
                    image: base64Data,
                });

                if (res.data.matched) {
                    const username = res.data.username;
                    const hour = new Date().getHours();
                    let greeting = "";

                    if (hour >= 5 && hour < 12) greeting = "Good Morning";
                    else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
                    else if (hour >= 17 && hour < 21) greeting = "Good Evening";
                    else greeting = "Good Night";

                    setMatchResult(`✅ Hello, ${username}! ${greeting}`);
                    setIsPaused(true);

                    setTimeout(() => {
                        if (isActive) {
                            setIsPaused(false);
                        }
                    }, 3000);
                } else {
                    setMatchResult("❌ User Not Registered or Morphed Face");
                }
            } catch (err) {
                // setMatchResult("❌ Error Occurred, Please Try Again");
            } finally {
                setIsProcessing(false);
            }
        }
    }, [isProcessing, isPaused, isActive]);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                captureAndMatch();
            }, 500);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, captureAndMatch]);

    const toggleProcess = () => {
        if (isActive) {
            setIsActive(false);
            setIsPaused(false);
            setMatchResult("");
        } else {
            setIsActive(true);
            setMatchResult("Starting...");
        }
    };

    const AdminController = () => {
        navigate("/admin-login");
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <h1 className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                Face Morphing Detection
            </h1>

            {/* Webcam Section */}
            <div className="w-[600px] h-[450px] rounded-xl overflow-hidden border-4 border-blue-500 shadow-2xl">
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    videoConstraints={{ facingMode: "user" }}
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-6 mt-8">
                <button
                    onClick={toggleProcess}
                    className={`px-6 py-3 rounded-lg text-xl font-semibold transition-colors duration-300 ${isActive
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {isActive ? "Stop Scanning" : "Start Scanning"}
                </button>
                <button
                    onClick={AdminController}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold transition-colors duration-300"
                >
                    Admin Panel
                </button>
            </div>

            {/* Match Result */}
            <div className="mt-2 text-center min-h-[100px] flex flex-col justify-center">
                {matchResult && (
                    matchResult.startsWith("✅ Hello") ? (
                        <>
                            <p className="text-3xl text-green-400 font-bold">
                                {matchResult.split("!")[0].replace("✅", "").trim()}!
                            </p>
                            <p className="text-2xl text-yellow-400 mt-2">
                                {matchResult.split("! ")[1]}
                            </p>
                        </>
                    ) : (
                        <p className="text-2xl text-red-400">{matchResult}</p>
                    )
                )}
            </div>
        </div>
    );
};

export default FaceMatching;
