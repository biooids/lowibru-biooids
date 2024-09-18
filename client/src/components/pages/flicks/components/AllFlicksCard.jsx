import React from "react";

function AllFlicksCard() {
  return (
    <div className="flick-slide">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/dEdd4qcSudI?si=D8caE2XVMpd0mnkL"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default AllFlicksCard;
