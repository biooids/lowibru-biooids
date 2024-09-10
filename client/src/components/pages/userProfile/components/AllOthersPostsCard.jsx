import React from "react";

function AllOthersPostsCard({ post, onClick, isSelected }) {
  return (
    <div
      className={`bg-slate-700 aspect-square overflow-hidden flex flex-col justify-between cursor-pointer ${
        isSelected ? "border-4 border-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <div className="aspect-square bg-black">
        <img
          src={post.images[0]} // Use the first image from the images array
          alt={post.title}
          className="w-[200px] h-[200px] object-cover"
        />
      </div>
      <div>
        <div className="flex justify-around">
          <span>Like</span>
          <span>Comment</span>
          <span>Share</span>
        </div>
        {isSelected && (
          <div className="mt-2 p-2 bg-gray-800 text-white">Comments here</div>
        )}
      </div>
    </div>
  );
}

export default AllOthersPostsCard;
