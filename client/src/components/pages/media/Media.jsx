import React from "react";
import media from "../../../assets/media.jpg"; // Ensure the path is correct
import { IoWarningSharp } from "react-icons/io5";

function Media() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${media})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
      {/* Dark overlay for contrast */}
      {/* Content Container */}
      <div className="relative z-10 p-8 sm:p-6 bg-white/30 backdrop-blur-lg rounded-xl shadow-lg border border-gray-300 text-center transition-all duration-300 ease-in-out hover:scale-105">
        <p className="text-2xl sm:text-3xl lg:text-4xl text-red-500 flex justify-center items-center gap-2 animate-bounce">
          <IoWarningSharp className="text-4xl sm:text-5xl lg:text-6xl" />
          <span>Under Construction</span>
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4">
          Stay Tuned!
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-200 mt-3">
          We're working hard to bring you amazing media content. Check back soon
          for updates!
        </p>
      </div>
    </div>
  );
}

export default Media;
