import { Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

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

function MyFlicksCard({ videoUrl, id, onDeleteFlick }) {
  const embedUrl = getEmbedUrl(videoUrl);

  const { currentUser } = useSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/flick/deleteFlick/${id}/${currentUser.user._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        onDeleteFlick(data.deletedFlick._id);
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flick-slide relative">
      <Button className="absolute top-[46%]" color="red" onClick={handleDelete}>
        Delete
      </Button>
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

export default MyFlicksCard;
