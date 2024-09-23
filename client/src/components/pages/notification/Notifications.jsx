import React from "react";
import { IoWarningSharp } from "react-icons/io5";

function Notifications() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl sm:text-3xl lg:text-4xl text-red-500 flex justify-center items-center gap-2 animate-bounce">
        <IoWarningSharp className="text-4xl sm:text-5xl lg:text-6xl" />
        <span>Under Construction</span>
      </p>
    </div>
  );
}

export default Notifications;
