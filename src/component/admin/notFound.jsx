import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 px-4 text-center">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">Oops! 😵</h1>
      <h2 className="text-5xl font-bold text-gray-800 mb-2 animate-pulse">
        404
      </h2>
      <p className="text-xl text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/admin/booking")}
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
