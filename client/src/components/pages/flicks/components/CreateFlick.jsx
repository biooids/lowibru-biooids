import React, { useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";

function CreateFlick() {
  const [flickData, setFlickData] = useState({
    videoUrl: "",
  });
  const [error, setError] = useState(null);

  // Function to validate if URL is secure (https) and in valid format
  const isValidUrl = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" + // protocol
        "([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})" + // domain name and extension
        "(\\/[a-zA-Z0-9$_.+!\\*\\(\\),;\\:@&=\\/\\-]*)?" + // path (optional)
        "(\\?[a-zA-Z0-9$_.+!\\*\\(\\),;\\:@&=\\/\\-]*)?$", // query string (optional)
      "i"
    );
    return pattern.test(url);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFlickData((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    const url = flickData.videoUrl;

    // Check if the URL is valid
    if (!isValidUrl(url)) {
      setError(
        "The URL format is invalid. Valid format: https://example.something"
      );
      return;
    }

    // Check if the URL is secure (https)
    if (!url.startsWith("https://")) {
      setError(
        "The URL is not secure. Please provide a URL that starts with 'https://'."
      );
      return;
    }

    // Submit the form if everything is valid
    try {
      fetch("/api/flick/createFlick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flickData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log(data);
          } else {
            setError(data.message);
          }
        });
    } catch (error) {
      setError("Something went wrong: " + error);
    }
  };

  return (
    <section className="flex flex-col gap-5 items-center min-h-screen">
      <h4>
        This input accepts video URLs from popular platforms such as{" "}
        <b>Facebook</b>, <b>YouTube</b>, and <b>TikTok</b>, before we build our
        own server for our videos. Follow the instructions below to obtain the
        video link:
        <ul className="list-disc pl-5 mt-2">
          <li>
            <b>Facebook:</b> Click the <b>Share</b> button beneath the video,
            then choose <i>Copy Link</i>.
          </li>
          <li>
            <b>YouTube:</b> Click the <b>Share</b> button below the video
            player, then select <i>Copy Link</i>.
          </li>
          <li>
            <b>TikTok:</b> Tap the <b>Share</b> icon on the video, then select{" "}
            <i>Copy Link</i>.
          </li>
        </ul>
        Once you have copied the video URL, paste it into the input field below.
      </h4>

      <form className="flex flex-col gap-3 w-[300px]" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="videoUrl" value="Your video URL" />
          </div>
          <TextInput
            id="videoUrl"
            type="text"
            placeholder="e.g, https://example.com"
            value={flickData.videoUrl}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
        {error && <Alert color="failure">{error}</Alert>}
      </form>
    </section>
  );
}

export default CreateFlick;
