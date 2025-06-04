import React from "react";
import { file } from "../file"; 
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="text-center p-8 rounded-2xl bg-white shadow-xl">
        <div className="flex justify-center">
                <img src={file.logo} alt="Logo" className="h-8 w-auto" />
              </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to Chat
        </h1>
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
