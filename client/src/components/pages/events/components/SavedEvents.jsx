import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SavedEventsCard from "./SavedEventsCard";

function SavedEvents() {
  const { currentUser } = useSelector((state) => state.user);

  const [savedPosts, setSavedPosts] = useState([]);

  const [unSavePost, setUnSavePost] = useState({
    unSaved: false,
  });

  const getSavedPosts = async () => {
    try {
      const res = await fetch(
        `/api/post/getUserSavedPosts?userId=${currentUser.user._id}`
      );
      const data = await res.json();
      console.log(data);
      setSavedPosts(data.savedPosts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSavedPosts();
  }, [currentUser]);

  const handleUnSave = (postId) => {
    setSavedPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  return (
    <div>
      {unSavePost.unSaved ? (
        <p className="p-3 text-red-500">post un saved</p>
      ) : (
        ""
      )}
      <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
        {savedPosts && savedPosts.length > 0
          ? savedPosts.map((post) => (
              <SavedEventsCard
                key={post._id}
                id={post._id}
                category={post.category}
                content={post.content}
                createdAt={new Date(post.createdAt).toLocaleDateString("en-US")}
                images={post.images}
                title={post.title}
                ended={post.ended}
                slug={post.slug}
                externalLink={post.externalLink}
                saveCount={post.saveCount}
                schedule={post.schedule}
                isLiked={
                  currentUser
                    ? post.likes.includes(currentUser.user._id)
                    : false
                }
                fetchedLikes={post.numberOfLikes}
                handleUnSave={handleUnSave}
                setUnSavePost={setUnSavePost}
              />
            ))
          : "you ain't got no saved posts"}
      </section>
    </div>
  );
}

export default SavedEvents;
