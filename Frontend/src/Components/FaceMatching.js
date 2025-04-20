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

    // Use useCallback to memoize the function so it doesn't change on every render
    const captureAndMatch = useCallback(async () => {
        if (webcamRef.current && !isProcessing && !isPaused && isActive) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (!imageSrc) {
                return;
            }

            setIsProcessing(true);
            setMatchResult("Processing...");
            const base64Data = getBase64Data(imageSrc);

            try {
                const res = await axios.post("http://localhost:5001/api/match", {
                    image: base64Data,
                });

                if (res.data.matched) {
                    setMatchResult(`✅ Hello, ${res.data.username}!`);
                    setIsPaused(true);

                    setTimeout(() => {
                        if (isActive) {
                            setIsPaused(false);
                        }
                    }, 3000);
                } else {
                    setMatchResult("User Not Registered");
                }
            } catch (err) {
                // Error handling kept empty as in original
            } finally {
                setIsProcessing(false);
            }
        }
    }, [isProcessing, isPaused, isActive]);

    // Effect to handle the continuous capturing
    useEffect(() => {
        if (isActive) {
            // Start the interval when isActive becomes true
            intervalRef.current = setInterval(() => {
                captureAndMatch();
            }, 500);
        } else {
            // Clear the interval when isActive becomes false
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }


        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isActive, captureAndMatch]);

    // Toggle button handler
    const toggleProcess = () => {
        if (isActive) {
            // Stop the process
            setIsActive(false);
            setIsPaused(false);
            setMatchResult("");
        } else {
            // Start the process
            setIsActive(true);
            setMatchResult("Starting...");
        }
    };

    const newUser = () => {
        navigate("/admin-login");
    };

    return (
        <div className="flex flex-col items-center pt-10 bg-gray-900 min-h-screen">
            <h1 className="text-4xl text-orange-500 font-semibold mb-10">Face Morphing Detection</h1>

            <div className="w-[600px] h-[450px] rounded-lg overflow-hidden border-4 border-blue-500 bg-blue-500">
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full"
                    videoConstraints={{ facingMode: "user" }}
                />
            </div>

            <p className="mt-4 text-3xl text-green-500">{matchResult}</p>
            <div className="space-x-5">
                <button
                    onClick={toggleProcess}
                    className={`mt-6 px-8 py-3 text-xl font-semibold rounded-lg transition-colors ${isActive
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                >
                    {isActive ? "Stop" : "Start"}
                </button>
                <button
                    onClick={newUser}
                    className="mt-6 px-8 py-3 text-xl font-semibold rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white">
                    Register
                </button>
            </div>
        </div>
    );
};

export default FaceMatching;