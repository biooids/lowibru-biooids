import React from "react";

// Function to determine the correct embed URL based on the video platform
function getEmbedUrl(videoUrl) {
  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    const videoId =
      videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/")[3];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (videoUrl.includes("tiktok.com")) {
    return `https://www.tiktok.com/embed/${videoUrl.split("/video/")[1]}`;
  } else if (videoUrl.includes("facebook.com")) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      videoUrl
    )}&show_text=0&width=560`;
  }
  // Add more platform checks here if needed
  return videoUrl; // Default to provided URL for other cases
}

function AllFlicksCard({ videoUrl }) {
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="flick-slide">
      <iframe
        className="w-full h-full"
        src={embedUrl}
        title="Video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default AllFlicksCard;
