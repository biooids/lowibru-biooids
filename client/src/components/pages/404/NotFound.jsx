import React from "react";
import { Link } from "react-router-dom";
import fourOfour from "../../../assets/404.jpeg";

function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fourOfour})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
      {/* Optional dark overlay */}
      {/* Glassmorphism container */}
      <div className="relative z-10 backdrop-blur-md bg-white bg-opacity-10 p-10 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-6xl font-bold text-white text-center">404</h1>
        <h2 className="text-3xl text-white text-center mt-4">Page Not Found</h2>
        <p className="text-lg text-gray-200 text-center mt-4">
          Oops! It seems you’re lost. The page you’re looking for doesn't exist.
        </p>
        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
