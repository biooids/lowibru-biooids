import React, { useState, useEffect } from "react";
import AllOthersPostsCard from "./AllOthersPostsCard";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Toast,
} from "flowbite-react";

function AllOthersPosts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch data from API
  useEffect(() => {
    fetch("https://dummyjson.com/products") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        // Sort posts by id in descending order to show newest first
        const sortedPosts = data.products.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const handleReturnToGrid = () => {
    setSelectedPost(null); // Reset selectedPost to null to return to grid view
  };

  return (
    <>
      <Button
        onClick={handleReturnToGrid}
        className="p-2 bg-blue-500 text-white rounded m-4"
      >
        Return to Grid
      </Button>
      <div className="flex">
        {selectedPost ? (
          <>
            {/* Button to return to grid view */}

            {/* Left side: Selected card */}
            <div className="w-2/3 p-4">
              <AllOthersPostsCard post={selectedPost} isSelected={true} />
            </div>

            {/* Right side: Other cards */}
            <div className="w-1/3 p-4 flex flex-col gap-2">
              {posts
                .filter((post) => post.id !== selectedPost.id)
                .map((post) => (
                  <AllOthersPostsCard
                    key={post.id}
                    post={post}
                    onClick={() => handleCardClick(post)}
                  />
                ))}
            </div>
          </>
        ) : (
          // Initially, display all posts in a grid layout when no post is selected
          <div className="grid grid-cols-3 gap-1 w-full">
            {posts.map((post) => (
              <AllOthersPostsCard
                key={post.id}
                post={post}
                onClick={() => handleCardClick(post)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllOthersPosts;
