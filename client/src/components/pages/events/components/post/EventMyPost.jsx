import React, { useEffect, useState } from "react";
import EventMyPostCard from "./EventMyPostCard";
import { useSelector } from "react-redux";

function EventMyPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [myPosts, setMyPosts] = useState(null);

  const getMyPosts = async () => {
    const res = await fetch(
      `/api/post/getPosts/?userId=${currentUser.user._id}`
    );
    const data = await res.json();
    setMyPosts(data.posts);
    console.log(data.posts);
  };

  useEffect(() => {
    getMyPosts();
  }, [currentUser]);

  // Function to handle post deletion
  const handleDeletePost = (deletedId) => {
    setMyPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedId)
    );
  };
  return (
    <section className=" flex flex-col gap-5 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      {myPosts && myPosts.length > 0
        ? myPosts.map((post) => {
            return (
              <EventMyPostCard
                key={post._id}
                id={post._id}
                handleDeletePost={handleDeletePost}
                category={post.category}
                content={post.content}
                createdAt={post.createdAt}
                images={post.images}
                title={post.title}
                ended={post.ended}
                slug={post.slug}
                externalLink={post.externalLink}
                saveCount={post.saveCount}
                schedule={post.schedule}
                onDeletePost={handleDeletePost}
                isLiked={
                  currentUser
                    ? post.likes.includes(currentUser.user._id)
                    : false
                }
                fetchedLikes={post.numberOfLikes}
                isSaved={
                  currentUser
                    ? post.saves.includes(currentUser.user._id)
                    : false
                }
                fetchedSaves={post.numberOfSaves}
              />
            );
          })
        : "not posts yet"}
    </section>
  );
}

export default EventMyPost;
